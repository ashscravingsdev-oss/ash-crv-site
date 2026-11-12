"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import { Loader2, Minus, Plus, Check } from "lucide-react"
import { toast } from "sonner"
import { addToCart, fetchCart } from "@/store/cartSlice"
import {
    DESSERT_MIN_DOZENS,
    FREE_DELIVERY_MILES,
    flavorLabel,
    groupDesserts,
    money,
    priceRange,
} from "@/lib/special-orders"

const facts = [
    `${DESSERT_MIN_DOZENS} dozen minimum per flavor`,
    "Order at least 10 days ahead",
    "50% deposit today, the rest on your date",
    `Free delivery within ${FREE_DELIVERY_MILES} miles, or pick up`,
]

/**
 * Desserts by the dozen: pick a dessert, one flavor, how many dozen, add to cart.
 * Each flavor is its own product in the admin (category = the dessert).
 */
const DessertShop = ({ requestHref = "#request" }) => {
    const dispatch = useDispatch()
    const router = useRouter()
    const { cart } = useSelector((state) => state.cart)

    const [products, setProducts] = useState(null) // null = loading
    const [activeType, setActiveType] = useState(null)
    const [flavorByType, setFlavorByType] = useState({})
    const [dozens, setDozens] = useState(DESSERT_MIN_DOZENS)
    const [adding, setAdding] = useState(false)
    const [justAdded, setJustAdded] = useState(null)

    useEffect(() => {
        let alive = true
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products?order_type=special_order&limit=100`)
            .then((r) => (r.ok ? r.json() : { products: [] }))
            .then((data) => {
                if (!alive) return
                setProducts(data.products || data.data || data.rows || [])
            })
            .catch(() => alive && setProducts([]))
        return () => {
            alive = false
        }
    }, [])

    const groups = useMemo(() => groupDesserts(products || []), [products])
    const group = groups.find((g) => g.name === activeType) || groups[0]
    const flavor = group ? group.items.find((p) => p.id === flavorByType[group.name]) || null : null
    const minDozens = Math.max(DESSERT_MIN_DOZENS, flavor?.min_quantity || 0)

    useEffect(() => {
        if (dozens < minDozens) setDozens(minDozens)
    }, [minDozens, dozens])

    const dessertLines = (cart?.items || []).filter((i) => i.product?.order_type === "special_order")

    const pickFlavor = (id) => {
        setFlavorByType((prev) => ({ ...prev, [group.name]: id }))
        setJustAdded(null)
    }

    const handleAdd = async () => {
        if (!flavor) {
            toast.error("Pick a flavor first")
            return
        }
        setAdding(true)
        try {
            let cartId = cart?.id
            if (!cartId) {
                const fresh = await dispatch(fetchCart()).unwrap()
                cartId = fresh?.id
            }
            await dispatch(addToCart({ cart_id: cartId, product_id: flavor.id, quantity: dozens })).unwrap()
            await dispatch(fetchCart())
            setJustAdded(flavor.id)
            toast.success(`${dozens} dozen ${flavor.name} added`, {
                action: { label: "View cart", onClick: () => router.push("/cart") },
            })
        } catch (err) {
            toast.error(typeof err === "string" ? err : err?.message || "Couldn't add that. Please try again.")
        } finally {
            setAdding(false)
        }
    }

    return (
        <div className="space-y-6">
            <ul className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.14em] text-brand-heading">
                {facts.map((f) => (
                    <li key={f} className="flex items-center gap-2">
                        <span className="text-brand-tobacco" aria-hidden="true">♡</span>
                        {f}
                    </li>
                ))}
            </ul>

            {products === null ? (
                <div className="flex justify-center py-16">
                    <Loader2 className="h-7 w-7 animate-spin text-primary" />
                </div>
            ) : groups.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-border bg-card p-8 text-center space-y-3">
                    <p className="font-serif text-2xl text-brand-espresso">My dessert menu is almost ready!</p>
                    <p className="text-muted-foreground">
                        In the meantime, tell me what you&apos;d like and I&apos;ll send you a quote.
                    </p>
                    <Link href={requestHref} className="inline-block underline font-medium text-brand-tobacco">
                        Request desserts →
                    </Link>
                </div>
            ) : (
                <div className="rounded-[22px] border border-border bg-card overflow-hidden">
                    {/* Dessert types */}
                    {/* Phone: all six at a glance */}
                    <div className="sm:hidden grid grid-cols-2 gap-2 p-3 border-b border-dashed border-border">
                        {groups.map((g) => {
                            const active = g.name === group.name
                            return (
                                <button
                                    key={g.name}
                                    type="button"
                                    aria-pressed={active}
                                    onClick={() => {
                                        setActiveType(g.name)
                                        setJustAdded(null)
                                    }}
                                    className={`rounded-xl px-3 py-2.5 font-serif text-lg leading-tight transition-colors ${
                                        active ? "bg-primary text-primary-foreground" : "bg-muted text-brand-espresso"
                                    }`}
                                >
                                    {g.name}
                                </button>
                            )
                        })}
                    </div>
                    <div className="hidden sm:block border-b border-dashed border-border px-3 sm:px-5 pt-4">
                        <div role="tablist" aria-label="Desserts" className="flex gap-1 overflow-x-auto -mb-px">
                            {groups.map((g) => {
                                const active = g.name === group.name
                                return (
                                    <button
                                        key={g.name}
                                        role="tab"
                                        type="button"
                                        aria-selected={active}
                                        onClick={() => {
                                            setActiveType(g.name)
                                            setJustAdded(null)
                                        }}
                                        className={`shrink-0 px-3 sm:px-4 pb-3 pt-1 border-b-2 font-serif text-lg sm:text-xl transition-colors ${
                                            active
                                                ? "border-brand-tobacco text-brand-espresso"
                                                : "border-transparent text-muted-foreground hover:text-brand-espresso"
                                        }`}
                                    >
                                        {g.name}
                                    </button>
                                )
                            })}
                        </div>
                    </div>

                    <div className="p-5 sm:p-8 space-y-7">
                        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                            <h3 className="font-serif text-3xl sm:text-4xl font-medium text-brand-heading">
                                <em className="italic text-brand-tobacco">{group.name}</em>
                            </h3>
                            <p className="font-serif text-2xl text-brand-espresso">
                                {priceRange(group.items)}{" "}
                                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">a dozen</span>
                            </p>
                        </div>

                        {/* Flavors: one per selection */}
                        <fieldset>
                            <legend className="font-mono text-[11px] uppercase tracking-[0.14em] text-brand-heading mb-3">
                                Pick a flavor
                            </legend>
                            <div className="flex flex-wrap gap-2">
                                {group.items.map((p) => {
                                    const selected = flavor?.id === p.id
                                    const showPrice = priceRange(group.items).includes("–")
                                    return (
                                        <button
                                            key={p.id}
                                            type="button"
                                            aria-pressed={selected}
                                            onClick={() => pickFlavor(p.id)}
                                            className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors ${
                                                selected
                                                    ? "border-primary bg-primary text-primary-foreground"
                                                    : "border-border bg-background text-foreground hover:border-brand-tobacco"
                                            }`}
                                        >
                                            {selected && <Check className="h-3.5 w-3.5" />}
                                            <span>{flavorLabel(p)}</span>
                                            {showPrice && (
                                                <span className={selected ? "opacity-80" : "text-muted-foreground"}>{money(p.price)}</span>
                                            )}
                                        </button>
                                    )
                                })}
                            </div>
                        </fieldset>

                        {/* How many dozen + add */}
                        <div className="flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-6 border-t border-dashed border-border pt-6">
                            <div>
                                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-brand-heading mb-2">How many dozen?</p>
                                <div className="inline-flex items-center rounded-full border border-border bg-background">
                                    <button
                                        type="button"
                                        aria-label="One less dozen"
                                        onClick={() => setDozens((d) => Math.max(minDozens, d - 1))}
                                        disabled={dozens <= minDozens}
                                        className="h-11 w-11 grid place-items-center rounded-full disabled:opacity-40"
                                    >
                                        <Minus className="h-4 w-4" />
                                    </button>
                                    <span className="min-w-[4.5rem] text-center font-serif text-xl text-brand-espresso" aria-live="polite">
                                        {dozens} dozen
                                    </span>
                                    <button
                                        type="button"
                                        aria-label="One more dozen"
                                        onClick={() => setDozens((d) => Math.min(20, d + 1))}
                                        className="h-11 w-11 grid place-items-center rounded-full"
                                    >
                                        <Plus className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>

                            <div className="flex-1 sm:text-right">
                                {flavor ? (
                                    <p className="text-sm text-muted-foreground mb-2">
                                        {dozens} dozen {flavor.name} ·{" "}
                                        <span className="font-semibold text-brand-espresso">{money(dozens * Number(flavor.price))}</span>
                                    </p>
                                ) : (
                                    <p className="text-sm text-muted-foreground mb-2">Pick a flavor to see your total</p>
                                )}
                                <button
                                    type="button"
                                    onClick={handleAdd}
                                    disabled={adding || !flavor}
                                    className="inline-flex w-full sm:w-auto items-center justify-center gap-3 h-12 px-6 rounded-lg bg-primary text-primary-foreground font-mono text-xs uppercase tracking-[0.18em] hover:bg-primary/90 transition-colors disabled:opacity-50"
                                >
                                    {adding ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : justAdded === flavor?.id ? (
                                        <>
                                            Added <Check className="h-4 w-4" />
                                        </>
                                    ) : (
                                        <>
                                            Add to cart <span aria-hidden="true">→</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    {dessertLines.length > 0 && (
                        <div className="bg-muted/60 border-t border-dashed border-border px-5 sm:px-8 py-4 flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
                            <p className="text-sm text-foreground/85">
                                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-brand-heading mr-2">In your cart</span>
                                {dessertLines.map((l) => `${l.quantity} dozen ${l.product?.name}`).join(" · ")}
                            </p>
                            <Link
                                href="/cart"
                                className="shrink-0 font-mono text-xs uppercase tracking-[0.16em] text-brand-tobacco underline underline-offset-4"
                            >
                                Checkout →
                            </Link>
                        </div>
                    )}
                </div>
            )}

            <p className="text-sm text-muted-foreground">
                Want more than one flavor? Add each one separately, 2 dozen each. Planning a whole dessert table?{" "}
                <Link href={requestHref} className="underline">Send me a request</Link>.
            </p>
        </div>
    )
}

export default DessertShop
