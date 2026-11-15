import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import Map, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Loader2, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';

// The middle of Eastvale, CA (the city's public map point): address searches
// look around here first. Nothing on this map ever shows the kitchen.
const EASTVALE = { latitude: 33.9636, longitude: -117.5642 };
const EMPTY_ADDRESS = { address: '', latitude: null, longitude: null };

// Looks enough like a street address to pick the top match on its own
const looksLikeAddress = (q) => q.trim().length >= 8 && /\d/.test(q) && /[a-z]/i.test(q);

/**
 * Address search with a short list to tap, plus a small map to check the pin.
 * Built for phones: 16px text (no iPhone zoom), "Go" on the keyboard picks the
 * top match instead of submitting the form, and one finger scrolls the page
 * instead of dragging the map.
 */
const MapPicker = forwardRef(({
    mapboxAccessToken,
    initialAddress = null,
    onAddressSelect,
    mapHeight = 300,
    defaultZoom = 14,
    mapStyle = "mapbox://styles/mapbox/streets-v11",
    placeholder = "Search for an address...",
}, ref) => {
    const hasInitial = !!(initialAddress?.latitude && initialAddress?.longitude && initialAddress?.address);

    const [query, setQuery] = useState(initialAddress?.address || '');
    const [selected, setSelected] = useState(hasInitial ? initialAddress : null);
    const [suggestions, setSuggestions] = useState([]);
    const [open, setOpen] = useState(false);
    const [searching, setSearching] = useState(false);
    const [notFound, setNotFound] = useState(false);
    const [focused, setFocused] = useState(false);
    const [viewport, setViewport] = useState({
        latitude: hasInitial ? parseFloat(initialAddress.latitude) : EASTVALE.latitude,
        longitude: hasInitial ? parseFloat(initialAddress.longitude) : EASTVALE.longitude,
        zoom: hasInitial ? defaultZoom : 10,
        pitch: 0,
        bearing: 0,
    });

    const mapRef = useRef(null);
    const inputRef = useRef(null);
    const timerRef = useRef(null);
    const blurTimerRef = useRef(null);
    const requestRef = useRef(0);
    // Latest values for the blur/Enter handlers, which can run between renders
    const latest = useRef({ query, selected, suggestions });
    latest.current = { query, selected, suggestions };

    useImperativeHandle(ref, () => ({
        flyTo: (coords, zoom) => {
            mapRef.current?.flyTo({ center: [coords[1], coords[0]], zoom });
        },
        getCurrentLocation: () => ({
            address: selected?.address || '',
            coordinates: selected ? [selected.latitude, selected.longitude] : null,
        }),
    }));

    useEffect(() => () => {
        clearTimeout(timerRef.current);
        clearTimeout(blurTimerRef.current);
    }, []);

    // Turn a Mapbox result into the address object the checkout expects
    const toAddress = (feature) => {
        const data = {
            address: feature.place_name,
            street: [feature.address, feature.text].filter(Boolean).join(' '),
            city: '',
            state: '',
            zip_code: '',
            country: 'USA',
            latitude: feature.geometry.coordinates[1],
            longitude: feature.geometry.coordinates[0],
        };
        for (const item of feature.context || []) {
            if (item.id.startsWith('place')) data.city = item.text;
            else if (item.id.startsWith('region')) data.state = item.text;
            else if (item.id.startsWith('postcode')) data.zip_code = item.text;
            else if (item.id.startsWith('country')) data.country = item.text;
        }
        return data;
    };

    const search = async (text) => {
        const q = text.trim();
        if (q.length < 3 || !mapboxAccessToken) return [];
        const id = ++requestRef.current;
        setSearching(true);
        try {
            const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(q)}.json` +
                `?access_token=${mapboxAccessToken}&autocomplete=true&country=us&types=address&limit=5` +
                `&proximity=${EASTVALE.longitude},${EASTVALE.latitude}`;
            const res = await fetch(url);
            const data = await res.json();
            const features = Array.isArray(data?.features) ? data.features : [];
            // Ignore answers to older searches that come back late
            if (id === requestRef.current) {
                setSuggestions(features);
                setNotFound(features.length === 0);
            }
            return features;
        } catch (error) {
            console.error('Address search failed:', error);
            return [];
        } finally {
            if (id === requestRef.current) setSearching(false);
        }
    };

    const choose = (feature) => {
        const data = toAddress(feature);
        clearTimeout(timerRef.current);
        requestRef.current++; // drop any search still on its way
        setSearching(false);
        setQuery(data.address);
        setSelected(data);
        setSuggestions([]);
        setOpen(false);
        setNotFound(false);
        setViewport((v) => ({ ...v, latitude: data.latitude, longitude: data.longitude, zoom: defaultZoom }));
        mapRef.current?.flyTo({ center: [data.longitude, data.latitude], zoom: defaultZoom });
        onAddressSelect?.(data);
        inputRef.current?.blur(); // put the phone keyboard away
    };

    const handleChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        setNotFound(false);
        setOpen(true);
        // Typing something new means the old pick no longer counts
        if (latest.current.selected) {
            setSelected(null);
            onAddressSelect?.({ ...EMPTY_ADDRESS });
        }
        clearTimeout(timerRef.current);
        if (value.trim().length < 3) {
            requestRef.current++;
            setSuggestions([]);
            setSearching(false);
            return;
        }
        timerRef.current = setTimeout(() => search(value), 250);
    };

    // "Go"/Enter picks the top match instead of submitting the whole form
    const handleKeyDown = async (e) => {
        if (e.key !== 'Enter') return;
        e.preventDefault();
        const { query: q, suggestions: list, selected: picked } = latest.current;
        if (picked && picked.address === q) return;
        clearTimeout(timerRef.current);
        const results = list.length ? list : await search(q);
        if (results.length) choose(results[0]);
    };

    const handleFocus = () => {
        clearTimeout(blurTimerRef.current);
        setFocused(true);
        if (latest.current.suggestions.length) setOpen(true);
    };

    // Leaving the box with a full address typed (or autofilled) still counts
    const handleBlur = () => {
        setFocused(false);
        clearTimeout(blurTimerRef.current);
        blurTimerRef.current = setTimeout(async () => {
            setOpen(false);
            const { query: q, suggestions: list, selected: picked } = latest.current;
            if (picked || !looksLikeAddress(q)) return;
            clearTimeout(timerRef.current);
            const results = list.length ? list : await search(q);
            if (results.length && !latest.current.selected && latest.current.query === q) choose(results[0]);
        }, 200);
    };

    // Moving the pin looks up the address at that spot
    const pinTo = async (lat, lng) => {
        setViewport((v) => ({ ...v, latitude: lat, longitude: lng }));
        try {
            const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${mapboxAccessToken}&limit=1&types=address`;
            const data = await (await fetch(url)).json();
            const feature = data?.features?.[0];
            if (feature) {
                const found = toAddress(feature);
                // Keep the exact spot they chose, with the nearest street address
                const picked = { ...found, latitude: lat, longitude: lng };
                setQuery(found.address);
                setSelected(picked);
                onAddressSelect?.(picked);
            }
        } catch (error) {
            console.error('Error looking up that spot:', error);
        }
    };

    const showList = open && focused && suggestions.length > 0;
    const showHint = !selected && !focused && query.trim().length > 0;

    return (
        <div className="w-full space-y-2">
            <div className="relative">
                <Input
                    ref={inputRef}
                    type="text"
                    inputMode="search"
                    enterKeyHint="search"
                    autoComplete="street-address"
                    autoCorrect="off"
                    spellCheck={false}
                    value={query}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    placeholder={placeholder}
                    aria-label="Delivery address"
                    aria-autocomplete="list"
                    aria-expanded={showList}
                    aria-controls="address-suggestions"
                    className="h-11 pr-9"
                />
                {searching && (
                    <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-muted-foreground" aria-hidden="true" />
                )}
                {showList && (
                    <ul
                        id="address-suggestions"
                        role="listbox"
                        className="absolute left-0 right-0 top-full z-30 mt-1 max-h-72 overflow-auto rounded-md border border-border bg-popover py-1 text-popover-foreground shadow-lg"
                    >
                        {suggestions.map((f) => {
                            const [first, ...rest] = f.place_name.split(', ');
                            return (
                                <li key={f.id} role="option" aria-selected="false">
                                    <button
                                        type="button"
                                        // Keep the box focused so the tap lands on this button
                                        onMouseDown={(e) => e.preventDefault()}
                                        onClick={() => choose(f)}
                                        className="flex w-full items-start gap-2 px-3 py-2.5 text-left hover:bg-muted focus:bg-muted focus:outline-none"
                                    >
                                        <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                                        <span className="min-w-0">
                                            <span className="block text-[15px] leading-snug text-foreground">{first}</span>
                                            <span className="block truncate text-xs text-muted-foreground">{rest.filter((p) => p !== 'United States').join(', ')}</span>
                                        </span>
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>

            {notFound && !searching && query.trim().length >= 3 && (
                <p className="text-sm text-amber-700">I couldn&apos;t find that address. Try adding your city.</p>
            )}
            {showHint && !notFound && (
                <p className="text-sm text-amber-700">Tap your address from the list so I know where to go.</p>
            )}

            {selected && (
                <>
                    <div
                        className="h-[200px] overflow-hidden rounded-md border border-border sm:h-[var(--map-h)]"
                        style={{ '--map-h': `${mapHeight}px` }}
                    >
                        <Map
                            ref={mapRef}
                            {...viewport}
                            onMove={(evt) => setViewport(evt.viewState)}
                            style={{ width: '100%', height: '100%' }}
                            mapboxAccessToken={mapboxAccessToken}
                            mapStyle={mapStyle}
                            cooperativeGestures
                            onClick={(e) => pinTo(e.lngLat.lat, e.lngLat.lng)}
                        >
                            <Marker
                                latitude={selected.latitude}
                                longitude={selected.longitude}
                                draggable
                                onDragEnd={(e) => pinTo(e.lngLat.lat, e.lngLat.lng)}
                            />
                        </Map>
                    </div>
                    <p className="text-xs text-muted-foreground">Pin in the wrong spot? Tap the map or drag the pin.</p>
                </>
            )}
        </div>
    );
});

MapPicker.displayName = 'MapPicker';

export default MapPicker;
