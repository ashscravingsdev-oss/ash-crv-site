"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useDispatch, useSelector } from "react-redux"
import { Minus, Plus, Loader2, Check } from "lucide-react"
import { toast } from "sonner"
import { fadeUp } from "@/lib/animations"
import { fetchActiveBundles } from "@/store/bundleSlice"
import { fetchBundleTemplate, fetchCategoryProducts } from "@/store/subscriptionSelectionSlice"
import { addToCart } from "@/store/cartSlice"

const money = (n) => {
    const v = Number(n || 0)
    return `$${v % 1 === 0 ? v : v.toFixed(2)}`
}

/**
 * Build-your-own bundles: the customer picks a size (a bundle from the admin),
 * then fills it with any mix of meals from the bundle's categories - all one
 * flavor or a little of everything. The bundle's own template in the admin
 * decides how many come from each category (e.g. "5 Meals" = any 5 from Meals),
 * and the back end checks the exact same rule when it's added to the cart.
 */
const Bundles = () => {
    const dispatch = useDispatch()
    const { bundles, loading } = useSelector((state) => state.bundles)
    const { bundleTemplates, categoryProducts } = useSelector((state) => state.subscriptionSelection)
    const { cart, itemLoading } = useSelector((state) => state.cart)

    const [selectedId, setSelectedId] = useState(null)
    const [picks, setPicks] = useState({})
    const [adding, setAdding] = useState(false)
    const [justAdded, setJustAdded] = useState(false)

    useEffect(() => {
        dispatch(fetchActiveBundles())
    }, [dispatch])

    const sortedBundles = useMemo(
        () => [...(bundles || [])].sort((a, b) => Number(a.price) - Number(b.price)),
        [bundles]
    )

    // Load every bundle's template so each size card can say "Pick any 5"
    useEffect(() => {
        sortedBundles.forEach((b) => {
            if (!bundleTemplates[b.id]) dispatch(fetchBundleTemplate(b.id))
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, sortedBundles.map((b) => b.id).join(",")])

    // Group bundles by what they're mostly made of (e.g. "Meals", "Juices"),
    // using the category that fills the most spots in each bundle.
    const groups = useMemo(() => {
        const byName = new Map()
        sortedBundles.forEach((b) => {
            const slots = bundleTemplates[b.id]?.slots || []
            const main = [...slots].sort((x, y) => y.required - x.required)[0]
            const name = main?.categoryName || "Bundles"
            if (!byName.has(name)) byName.set(name, [])
            byName.get(name).push(b)
        })
        // Meal prep first, then everything else
        return [...byName.entries()].sort(([a], [b]) => (/meal/i.test(b) ? 1 : 0) - (/meal/i.test(a) ? 1 : 0))
    }, [sortedBundles, bundleTemplates])

    // Default to the first meal bundle (or the first bundle) once every template is in
    const templatesReady = sortedBundles.length > 0 && sortedBundles.every((b) => {
        const t = bundleTemplates[b.id]
        return t && !t.loading
    })
    useEffect(() => {
        if (!selectedId && templatesReady && groups.length > 0 && groups[0][1].length > 0) setSelectedId(groups[0][1][0].id)
    }, [selectedId, templatesReady, groups])

    const selectedBundle = sortedBundles.find((b) => b.id === selectedId)
    const template = selectedId ? bundleTemplates[selectedId] : null
    const slots = useMemo(() => template?.slots || [], [template])

    // Load the meals for each category in the chosen bundle
    useEffect(() => {
        slots.forEach((slot) => {
            if (!categoryProducts[slot.categoryId]) dispatch(fetchCategoryProducts(slot.categoryId))
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, slots.map((s) => s.categoryId).join(",")])

    const requiredFor = (bundleId) =>
        (bundleTemplates[bundleId]?.slots || []).reduce((sum, s) => sum + s.required, 0)

    const productsFor = (categoryId) =>
        (categoryProducts[categoryId]?.products || []).filter((p) => p.is_active !== false)

    const countIn = (map, categoryId) =>
        productsFor(categoryId).reduce((sum, p) => sum + (map[p.id] || 0), 0)
    const pickedIn = (categoryId) => countIn(picks, categoryId)

    const totalRequired = slots.reduce((sum, s) => sum + s.required, 0)
    const totalPicked = slots.reduce((sum, s) => sum + pickedIn(s.categoryId), 0)
    const complete = slots.length > 0 && slots.every((s) => pickedIn(s.categoryId) === s.required)

    const chooseBundle = (id) => {
        if (id === selectedId) return
        setSelectedId(id)
        setPicks({})
        setJustAdded(false)
    }

    const change = (productId, categoryId, required, delta) => {
        setJustAdded(false)
        setPicks((prev) => {
            const current = prev[productId] || 0
            if (delta > 0 && countIn(prev, categoryId) >= required) return prev
            const next = Math.max(0, current + delta)
            const copy = { ...prev }
            if (next === 0) delete copy[productId]
            else copy[productId] = next
            return copy
        })
    }

    const handleAdd = async () => {
        if (!complete || !selectedBundle) return
        if (!cart?.id) {
            toast.error("Your cart is still loading. Try again in a second.")
            return
        }
        setAdding(true)
        try {
            await dispatch(
                addToCart({
                    cart_id: cart.id,
                    bundle_id: selectedBundle.id,
                    quantity: 1,
                    selected_products: Object.entries(picks).map(([product_id, quantity]) => ({ product_id, quantity })),
                })
            ).unwrap()
            toast.success(`${selectedBundle.name} added to your cart!`)
            setPicks({})
            setJustAdded(true)
        } catch (error) {
            toast.error(error?.message || error || "Couldn't add your bundle. Please try again.")
        } finally {
            setAdding(false)
        }
    }

    return (
        <div className="pt-10 md:pt-14">
            {/* Header */}
            <motion.div initial="initial" animate="animate" variants={fadeUp} className="container mx-auto px-4 text-center mb-10 md:mb-14">
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-brand-heading mb-3">
                    <span className="text-brand-matcha">■</span> Meal prep bundles
                </p>
                <h1 className="font-serif font-medium text-5xl md:text-7xl leading-[0.98] text-brand-heading mb-4">
                    Build your <em className="italic text-brand-tobacco">bundle</em>
                </h1>
                <p className="text-lg md:text-xl text-foreground/85 max-w-2xl mx-auto leading-relaxed">
                    Pick a bundle, then mix and match your favorites from this week&apos;s menu. All one flavor or a little
                    of everything, it&apos;s up to you.
                </p>
            </motion.div>

            <div className="container mx-auto px-4 max-w-5xl">
                {loading && sortedBundles.length === 0 ? (
                    <div className="flex justify-center py-16">
                        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                    </div>
                ) : sortedBundles.length === 0 ? (
                    <p className="text-center text-muted-foreground py-16">Bundles are coming soon!</p>
                ) : (
                    <>
                        {/* Step 1: bundle */}
                        <p className="font-mono text-xs uppercase tracking-[0.18em] text-brand-heading mb-3">01 · Pick your bundle</p>
                        <div className="space-y-6 mb-12">
                            {groups.map(([groupName, list]) => (
                                <div key={groupName}>
                                    {groups.length > 1 && (
                                        <h2 className="font-serif text-2xl md:text-3xl font-medium text-brand-heading mb-3">{groupName}</h2>
                                    )}
                                    <div className="grid grid-cols-2 gap-3 md:gap-4">
                                        {list.map((b) => {
                                            const slotsFor = bundleTemplates[b.id]?.slots || []
                                            const req = requiredFor(b.id)
                                            const active = b.id === selectedId
                                            return (
                                                <button
                                                    key={b.id}
                                                    type="button"
                                                    onClick={() => chooseBundle(b.id)}
                                                    className={`flex flex-col justify-start text-left rounded-2xl border-2 p-4 md:p-6 transition-colors ${active ? "border-primary bg-card" : "border-border bg-card/60 hover:border-brand-tobacco"}`}
                                                    aria-pressed={active}
                                                >
                                                    <div className="flex items-start justify-between gap-2">
                                                        <span className="font-serif text-2xl md:text-3xl font-semibold text-brand-espresso leading-tight">
                                                            {b.name}
                                                        </span>
                                                        <span className={`h-5 w-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-1 ${active ? "border-primary bg-primary" : "border-brand-tobacco"}`}>
                                                            {active && <Check className="h-3 w-3 text-primary-foreground" />}
                                                        </span>
                                                    </div>
                                                    {b.description && (
                                                        <p className="text-sm text-muted-foreground mt-1 leading-snug">{b.description}</p>
                                                    )}
                                                    <p className="font-serif text-3xl md:text-4xl font-semibold text-brand-espresso mt-2">{money(b.price)}</p>
                                                    {slotsFor.length === 1 && req > 0 && (
                                                        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground mt-1">
                                                            {money(Number(b.price) / req)} each
                                                        </p>
                                                    )}
                                                </button>
                                            )
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Step 2: meals */}
                        <p className="font-mono text-xs uppercase tracking-[0.18em] text-brand-heading mb-3">02 · Pick your favorites</p>
                        {!template || template.loading ? (
                            <div className="flex justify-center py-12">
                                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                            </div>
                        ) : template.error ? (
                            <p className="text-destructive py-6">{template.error}</p>
                        ) : (
                            <div className="space-y-8 mb-6">
                                {slots.map((slot) => {
                                    const items = productsFor(slot.categoryId)
                                    const picked = pickedIn(slot.categoryId)
                                    const full = picked >= slot.required
                                    return (
                                        <section key={slot.categoryId}>
                                            <div className="flex items-baseline justify-between mb-3">
                                                <h2 className="font-serif text-3xl font-medium text-brand-heading">{slot.categoryName}</h2>
                                                <span className="font-mono text-xs uppercase tracking-[0.14em] text-brand-espresso">
                                                    {picked} of {slot.required}
                                                </span>
                                            </div>
                                            {categoryProducts[slot.categoryId]?.loading ? (
                                                <div className="flex justify-center py-8">
                                                    <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                                                </div>
                                            ) : items.length === 0 ? (
                                                <p className="text-muted-foreground">This week&apos;s menu is coming soon.</p>
                                            ) : (
                                                <div className="grid sm:grid-cols-2 gap-3">
                                                    {items.map((p) => {
                                                        const qty = picks[p.id] || 0
                                                        const soldOut = p.inventory?.stock_quantity === 0
                                                        return (
                                                            <div
                                                                key={p.id}
                                                                className={`flex items-center gap-3 p-3 rounded-2xl border bg-card transition-colors ${qty > 0 ? "border-primary" : "border-border"} ${soldOut ? "opacity-50" : ""}`}
                                                            >
                                                                <div className="w-16 h-16 rounded-xl overflow-hidden bg-muted shrink-0">
                                                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                                                    <img src={p.image_url || "/placeholder.svg"} alt={p.name} className="w-full h-full object-cover" />
                                                                </div>
                                                                <div className="flex-1 min-w-0">
                                                                    <p className="font-serif text-xl font-semibold leading-tight text-brand-espresso">{p.name}</p>
                                                                    {soldOut ? (
                                                                        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground mt-1">Sold out</p>
                                                                    ) : p.description ? (
                                                                        <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">{p.description}</p>
                                                                    ) : null}
                                                                </div>
                                                                <div className="flex items-center rounded-full border border-border bg-background shrink-0">
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => change(p.id, slot.categoryId, slot.required, -1)}
                                                                        disabled={qty === 0}
                                                                        className="h-9 w-9 flex items-center justify-center rounded-full disabled:opacity-30"
                                                                        aria-label={`Remove one ${p.name}`}
                                                                    >
                                                                        <Minus className="h-4 w-4" />
                                                                    </button>
                                                                    <span className="w-6 text-center font-mono text-sm">{qty}</span>
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => change(p.id, slot.categoryId, slot.required, 1)}
                                                                        disabled={soldOut || full}
                                                                        className="h-9 w-9 flex items-center justify-center rounded-full disabled:opacity-30"
                                                                        aria-label={`Add one ${p.name}`}
                                                                    >
                                                                        <Plus className="h-4 w-4" />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            )}
                                        </section>
                                    )
                                })}
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Sticky summary */}
            {selectedBundle && totalRequired > 0 && (
                <div className="sticky bottom-0 z-20 bg-background/95 backdrop-blur border-t border-border mt-6">
                    <div className="container mx-auto px-4 max-w-5xl py-3 md:py-4 flex items-center gap-4">
                        <div className="flex-1 min-w-0">
                            <p className="font-serif text-xl md:text-2xl font-semibold text-brand-espresso leading-tight">
                                {totalPicked} of {totalRequired} picked
                                <span className="text-muted-foreground font-normal"> · {money(selectedBundle.price)}</span>
                            </p>
                            <div className="h-1.5 rounded-full bg-muted mt-2 overflow-hidden">
                                <div
                                    className="h-full bg-primary transition-all duration-300"
                                    style={{ width: `${Math.min(100, (totalPicked / totalRequired) * 100)}%` }}
                                />
                            </div>
                        </div>
                        {justAdded && !complete ? (
                            <Link
                                href="/cart"
                                className="inline-flex items-center justify-center gap-2 h-12 px-5 rounded-lg border border-primary text-primary font-mono text-xs uppercase tracking-[0.14em] shrink-0"
                            >
                                View cart →
                            </Link>
                        ) : (
                            <button
                                type="button"
                                onClick={handleAdd}
                                disabled={!complete || adding || itemLoading}
                                className="inline-flex items-center justify-center gap-2 h-12 px-5 rounded-lg bg-primary text-primary-foreground font-mono text-xs uppercase tracking-[0.14em] disabled:opacity-40 shrink-0"
                            >
                                {adding ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                                {complete ? "Add to cart" : `Pick ${totalRequired - totalPicked} more`}
                            </button>
                        )}
                    </div>
                </div>
            )}

            {/* Custom */}
            <section className="bg-muted mt-16">
                <div className="container mx-auto px-4 py-14 text-center space-y-4">
                    <h2 className="font-serif font-medium text-4xl text-brand-heading">
                        Want something <em className="italic text-brand-tobacco">custom?</em>
                    </h2>
                    <p className="text-lg text-foreground/85 max-w-xl mx-auto">
                        Bigger orders, special requests or a plan made just for you. Just message me and we&apos;ll figure it out.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center justify-center gap-3 h-12 px-6 rounded-lg bg-primary text-primary-foreground font-mono text-xs uppercase tracking-[0.18em]"
                    >
                        Message me <span aria-hidden="true">→</span>
                    </Link>
                </div>
            </section>
        </div>
    )
}

export default Bundles
