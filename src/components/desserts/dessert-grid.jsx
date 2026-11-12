"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import { Loader2, Minus, Plus, Check } from "lucide-react"
import { toast } from "sonner"
import { addToCart, fetchCart } from "@/store/cartSlice"
import { useDesserts } from "@/lib/use-desserts"
import { DESSERT_MIN_DOZENS, dessertSlug, flavorLabel, money, priceRange } from "@/lib/special-orders"
import WakingNote from "@/components/ui/waking-note"

/** One dessert: pick a flavor, how many dozen, add. */
const DessertCard = ({ group, highlight }) => {
    const dispatch = useDispatch()
    const router = useRouter()
    const { cart } = useSelector((state) => state.cart)
    const [flavorId, setFlavorId] = useState("")
    const [dozens, setDozens] = useState(DESSERT_MIN_DOZENS)
    const [adding, setAdding] = useState(false)
    const [added, setAdded] = useState(false)

    const flavor = group.items.find((p) => p.id === flavorId) || null
    const min = Math.max(DESSERT_MIN_DOZENS, flavor?.min_quantity || 0)
    const mixedPrices = priceRange(group.items).includes("–")

    useEffect(() => {
        if (dozens < min) setDozens(min)
    }, [min, dozens])

    const add = async () => {
        if (!flavor) {
            toast.error("Pick a flavor first")
            return
        }
        setAdding(true)
        try {
            let cartId = cart?.id
            if (!cartId) cartId = (await dispatch(fetchCart()).unwrap())?.id
            await dispatch(addToCart({ cart_id: cartId, product_id: flavor.id, quantity: dozens })).unwrap()
            await dispatch(fetchCart())
            setAdded(true)
            setTimeout(() => setAdded(false), 2500)
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
        <div
            id={`dessert-${dessertSlug(group.name)}`}
            className={`scroll-mt-28 h-full flex flex-col rounded-2xl border bg-card p-5 md:p-6 transition-shadow ${
                highlight ? "border-brand-tobacco ring-2 ring-brand-tobacco/30" : "border-border"
            }`}
        >
            <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-serif text-2xl md:text-[1.7rem] leading-tight text-brand-espresso">{group.name}</h3>
                <p className="text-right shrink-0">
                    <span className="font-serif text-xl text-brand-espresso">{priceRange(group.items)}</span>
                    <span className="block font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">a dozen</span>
                </p>
            </div>
            <p className="mt-2 text-sm italic leading-relaxed text-foreground/70 flex-1">
                {group.items.map((p) => flavorLabel(p)).join(" · ")}
            </p>

            <div className="mt-5 space-y-3">
                <label className="block">
                    <span className="sr-only">Flavor</span>
                    <select
                        value={flavorId}
                        onChange={(e) => setFlavorId(e.target.value)}
                        className="w-full h-11 rounded-lg border border-border bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                    >
                        <option value="">Pick a flavor</option>
                        {group.items.map((p) => (
                            <option key={p.id} value={p.id}>
                                {flavorLabel(p)}
                                {mixedPrices ? ` · ${money(p.price)}` : ""}
                            </option>
                        ))}
                    </select>
                </label>
                <div className="flex items-center gap-3">
                    <div className="inline-flex items-center rounded-lg border border-border bg-background">
                        <button
                            type="button"
                            aria-label="One less dozen"
                            onClick={() => setDozens((d) => Math.max(min, d - 1))}
                            disabled={dozens <= min}
                            className="h-11 w-10 grid place-items-center disabled:opacity-40"
                        >
                            <Minus className="h-4 w-4" />
                        </button>
                        <span className="min-w-[4.25rem] text-center text-sm font-medium" aria-live="polite">
                            {dozens} dozen
                        </span>
                        <button
                            type="button"
                            aria-label="One more dozen"
                            onClick={() => setDozens((d) => Math.min(20, d + 1))}
                            className="h-11 w-10 grid place-items-center"
                        >
                            <Plus className="h-4 w-4" />
                        </button>
                    </div>
                    <button
                        type="button"
                        onClick={add}
                        disabled={adding}
                        className="flex-1 inline-flex items-center justify-center gap-2 h-11 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-60"
                    >
                        {adding ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : added ? (
                            <>
                                Added <Check className="h-4 w-4" />
                            </>
                        ) : flavor ? (
                            `Add · ${money(dozens * Number(flavor.price))}`
                        ) : (
                            "Add to cart"
                        )}
                    </button>
                </div>
            </div>
        </div>
    )
}

/** The Desserts tab on the Menu: all six desserts together. */
const DessertGrid = () => {
    const { loading, groups, live } = useDesserts()
    const { cart } = useSelector((state) => state.cart)
    const [highlight, setHighlight] = useState(null)

    // Links like /menu?tab=desserts&d=cookies jump to that dessert
    useEffect(() => {
        if (!live) return
        const d = new URLSearchParams(window.location.search).get("d")
        if (!d) return
        const el = document.getElementById(`dessert-${d}`)
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" })
            setHighlight(d)
            const t = setTimeout(() => setHighlight(null), 2500)
            return () => clearTimeout(t)
        }
    }, [live])

    const lines = (cart?.items || []).filter((i) => i.product?.order_type === "special_order")

    if (loading) {
        return (
            <div className="flex flex-col items-center gap-4 py-16">
                <Loader2 className="h-7 w-7 animate-spin text-primary" />
                <WakingNote />
            </div>
        )
    }

    if (!live) {
        return (
            <div className="rounded-2xl border border-dashed border-border bg-card p-8 text-center space-y-3">
                <p className="font-serif text-2xl text-brand-espresso">My dessert menu is almost ready!</p>
                <p className="text-muted-foreground">In the meantime, tell me what you&apos;d like and I&apos;ll send you a quote.</p>
                <Link href="/custom-cakes#request" className="inline-block underline font-medium text-brand-tobacco">
                    Request desserts →
                </Link>
            </div>
        )
    }

    return (
        <div className="space-y-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-brand-heading leading-relaxed">
                One flavor per dozen · 2 dozen minimum per flavor · 10 days&apos; notice · 50% deposit · free delivery within 15 miles
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {groups.map((g) => (
                    <DessertCard key={g.name} group={g} highlight={highlight === dessertSlug(g.name)} />
                ))}
            </div>
            {lines.length > 0 && (
                <div className="rounded-2xl bg-muted px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <p className="text-sm text-foreground/85">
                        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-brand-heading mr-2">In your cart</span>
                        {lines.map((l) => `${l.quantity} dozen ${l.product?.name}`).join(" · ")}
                    </p>
                    <Link href="/cart" className="shrink-0 font-mono text-xs uppercase tracking-[0.16em] text-brand-tobacco underline underline-offset-4">
                        Checkout →
                    </Link>
                </div>
            )}
        </div>
    )
}

export default DessertGrid
