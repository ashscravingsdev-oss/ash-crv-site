import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import Map, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Input } from '@/components/ui/input';

const MapPicker = forwardRef(({
    mapboxAccessToken,
    initialAddress = null,
    onAddressSelect,
    mapHeight = 300,
    defaultZoom = 2,
    defaultCenter = [25.0, -95.5],
    mapStyle = "mapbox://styles/mapbox/streets-v11",
    placeholder = "Search for an address...",
}, ref) => {

    const [markerPosition, setMarkerPosition] = useState(
        initialAddress?.latitude && initialAddress?.longitude
            ? [parseFloat(initialAddress.latitude), parseFloat(initialAddress.longitude)]
            : [40.7128, -74.006]
    );

    const [addressInput, setAddressInput] = useState(
        initialAddress?.address || ''
    );

    const [viewport, setViewport] = useState({
        latitude: initialAddress?.latitude ? parseFloat(initialAddress.latitude) : defaultCenter[0],
        longitude: initialAddress?.longitude ? parseFloat(initialAddress.longitude) : defaultCenter[1],
        zoom: defaultZoom,
        pitch: 0,
        bearing: 0,
    });

    const mapRef = useRef(null);
    const searchTimeoutRef = useRef(null);

    // Expose methods to parent component via ref
    useImperativeHandle(ref, () => ({
        flyTo: (coords, zoom) => {
            if (mapRef.current) {
                mapRef.current.flyTo({ center: [coords[1], coords[0]], zoom });
            }
        },
        getCurrentLocation: () => ({
            address: addressInput,
            coordinates: markerPosition
        })
    }));

    // Cleanup timeout on unmount
    useEffect(() => {
        return () => {
            if (searchTimeoutRef.current) {
                clearTimeout(searchTimeoutRef.current);
            }
        };
    }, []);

    // Parse address components from Mapbox response
    const parseAddressComponents = (feature) => {
        const context = feature.context || [];
        const addressData = {
            address: feature.place_name,
            street: feature.text || '',
            city: '',
            state: '',
            zip_code: '',
            country: 'USA',
            latitude: feature.geometry.coordinates[1],
            longitude: feature.geometry.coordinates[0]
        };

        context.forEach(item => {
            if (item.id.includes('place')) {
                addressData.city = item.text;
            } else if (item.id.includes('region')) {
                addressData.state = item.text;
            } else if (item.id.includes('postcode')) {
                addressData.zip_code = item.text;
            } else if (item.id.includes('country')) {
                addressData.country = item.text;
            }
        });

        // If city not found in context, try to extract from place_name
        if (!addressData.city && feature.place_name) {
            const parts = feature.place_name.split(',').map(p => p.trim());
            if (parts.length > 1) {
                addressData.city = parts[parts.length - 2] || '';
            }
        }

        return addressData;
    };

    // Geocoding function (address to coordinates)
    const geocodeAddress = async (searchAddress) => {
        if (searchAddress.length < 4) return;

        try {
            const geocodingUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
                searchAddress
            )}.json?access_token=${mapboxAccessToken}&limit=1&types=address`;

            const response = await fetch(geocodingUrl);
            const data = await response.json();

            if (data.features.length > 0) {
                const feature = data.features[0];
                const [lng, lat] = feature.geometry.coordinates;

                // Parse all address components
                const addressData = parseAddressComponents(feature);

                setMarkerPosition([lat, lng]);
                setAddressInput(feature.place_name);

                setViewport(prev => ({
                    ...prev,
                    latitude: lat,
                    longitude: lng,
                    zoom: 14,
                }));

                if (mapRef.current) {
                    mapRef.current.flyTo({ center: [lng, lat], zoom: 14 });
                }

                // Notify parent component with full address object
                if (onAddressSelect) {
                    onAddressSelect(addressData);
                }
            }
        } catch (error) {
            console.error('Error fetching geocoding data:', error);
        }
    };

    // Reverse geocoding function (coordinates to address)
    const reverseGeocode = async (lat, lng) => {
        try {
            const geocodingUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${mapboxAccessToken}&limit=1&types=address`;

            const response = await fetch(geocodingUrl);
            const data = await response.json();

            if (data.features.length > 0) {
                const feature = data.features[0];

                // Parse all address components
                const addressData = parseAddressComponents(feature);

                setAddressInput(feature.place_name);

                if (onAddressSelect) {
                    onAddressSelect(addressData);
                }
            }
        } catch (error) {
            console.error('Error fetching reverse geocoding data:', error);
        }
    };

    // Handle map click
    const handleMapClick = async (e) => {
        const [lat, lng] = [e.lngLat.lat, e.lngLat.lng];
        setMarkerPosition([lat, lng]);
        await reverseGeocode(lat, lng);
    };

    // Handle address input change with debounce
    const handleAddressInput = (e) => {
        const value = e.target.value;
        setAddressInput(value);

        // Clear previous timeout
        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }

        // Set new timeout for debounced search
        searchTimeoutRef.current = setTimeout(() => {
            geocodeAddress(value);
        }, 1000);
    };

    return (
        <div style={{ width: '100%' }}>
            {/* Search Input */}
            <div style={{ marginBottom: '10px' }}>
                <Input
                    type="text"
                    value={addressInput}
                    onChange={handleAddressInput}
                    placeholder={placeholder}
                    style={{
                        width: '100%',
                        padding: '8px',
                        borderRadius: '4px',
                        border: '1px solid #ccc',
                        fontSize: '14px'
                    }}
                />
            </div>

            {/* Map */}
            <Map
                ref={mapRef}
                {...viewport}
                onMove={(evt) => setViewport(evt.viewState)}
                style={{ width: '100%', height: mapHeight }}
                mapboxAccessToken={mapboxAccessToken}
                mapStyle={mapStyle}
                onDblClick={handleMapClick}
                doubleClickZoom={false}
            >
                <Marker
                    latitude={markerPosition[0]}
                    longitude={markerPosition[1]}
                    draggable
                    onDragEnd={async (e) => {
                        const [lng, lat] = [e.lngLat.lng, e.lngLat.lat];
                        setMarkerPosition([lat, lng]);
                        await reverseGeocode(lat, lng);
                    }}
                />
            </Map>
        </div>
    );
});

MapPicker.displayName = 'MapPicker';

export default MapPicker;