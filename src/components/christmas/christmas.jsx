"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import { motion } from "framer-motion"
import { Loader2, Minus, Plus, Check } from "lucide-react"
import { toast } from "sonner"
import { addToCart, fetchCart } from "@/store/cartSlice"
import { CHRISTMAS_DAYS, christmasOpenDays, money, shortDate } from "@/lib/special-orders"
import { useDayRoom } from "@/lib/use-day-room"
import FactStrip from "@/components/ui/fact-strip"
import WakingNote from "@/components/ui/waking-note"

const facts = [
    { value: "2 days", label: "Dec 19 & Dec 23" },
    { value: "Gift box", label: "for every cake" },
    { value: "Paid", label: "at checkout" },
]

// The two mini cake products in the admin (by slug), in the order they show
const OPTIONS = [
    { slug: "christmas-mini-cake", title: "One mini cake", note: "A sweet little gift" },
    { slug: "christmas-mini-cakes-set-of-2", title: "Two mini cakes", note: "Two designs · save $5" },
]

const Option = ({ option, product }) => {
    const dispatch = useDispatch()
    const router = useRouter()
    const { cart } = useSelector((state) => state.cart)
    const [qty, setQty] = useState(1)
    const [adding, setAdding] = useState(false)
    const [added, setAdded] = useState(false)

    const add = async () => {
        setAdding(true)
        try {
            let cartId = cart?.id
            if (!cartId) cartId = (await dispatch(fetchCart()).unwrap())?.id
            await dispatch(addToCart({ cart_id: cartId, product_id: product.id, quantity: qty })).unwrap()
            await dispatch(fetchCart())
            setAdded(true)
            setTimeout(() => setAdded(false), 2500)
            toast.success(`${option.title} added`, {
                action: { label: "View cart", onClick: () => router.push("/cart") },
            })
        } catch (err) {
            toast.error(typeof err === "string" ? err : err?.message || "Couldn't add that. Please try again.")
        } finally {
            setAdding(false)
        }
    }

    return (
        <div className="rounded-2xl border border-border bg-card p-5 md:p-6 flex flex-col">
            <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-serif text-2xl md:text-[1.7rem] leading-tight text-brand-espresso">{option.title}</h3>
                <p className="font-serif text-2xl text-brand-espresso">{money(product.price)}</p>
            </div>
            <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-brand-heading">{option.note}</p>
            <div className="mt-5 flex items-center gap-3">
                <div className="inline-flex items-center rounded-lg border border-border bg-background">
                    <button
                        type="button"
                        aria-label="One less"
                        onClick={() => setQty((q) => Math.max(1, q - 1))}
                        disabled={qty <= 1}
                        className="h-11 w-10 grid place-items-center disabled:opacity-40"
                    >
                        <Minus className="h-4 w-4" />
                    </button>
                    <span className="min-w-[2.5rem] text-center text-sm font-medium" aria-live="polite">{qty}</span>
                    <button
                        type="button"
                        aria-label="One more"
                        onClick={() => setQty((q) => Math.min(20, q + 1))}
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
                    ) : (
                        `Add · ${money(qty * Number(product.price))}`
                    )}
                </button>
            </div>
        </div>
    )
}

const weekday = (d) =>
    new Date(`${d}T12:00:00Z`).toLocaleDateString("en-US", { weekday: "long", timeZone: "UTC" })

// Each Christmas day as a little gift tag on baker's twine, like the tags on the cake boxes
const CARD = "#FFFEFA"
const LINE = "#E4D5BE"
const PAGE = "#FBF6EC"
const TWINE_BACK = "M12 56 C 8 44, 3 36, -1 24 S -3 4, -4 -8"
const TWINE_FRONT = "M12 56 C 4 47, -4 40, -9 27 S -7 6, -4 -8"
// left: mini cakes still open that day (null while loading)
const DayTag = ({ day, tilt, left }) => (
    <li className="relative" style={{ transform: `rotate(${tilt}deg)` }}>
        <div className="flex h-[112px]">
            <svg aria-hidden="true" viewBox="0 0 30 112" width="30" height="112" className="shrink-0 overflow-visible">
                <path d="M30 0.5 H21 L0.5 28 V84 L21 111.5 H30" fill={CARD} stroke={LINE} />
                <circle cx="12" cy="56" r="4.5" fill={PAGE} stroke={LINE} />
                {/* the twine, looped through the hole: a thin outline, white, then red stripes */}
                {[TWINE_BACK, TWINE_FRONT].map((d) => (
                    <g key={d} fill="none" strokeLinecap="round">
                        <path d={d} stroke="#9C7A54" strokeOpacity="0.35" strokeWidth="3.4" />
                        <path d={d} stroke="#FFFDF8" strokeWidth="2.4" />
                        <path d={d} stroke="#B0473B" strokeWidth="2.4" strokeDasharray="3 3.2" strokeLinecap="butt" />
                    </g>
                ))}
            </svg>
            <div className="-ml-px flex flex-1 flex-col justify-center rounded-r-xl border border-l-0 border-brand-latte bg-card pl-2 pr-4">
                <span className="text-sm text-brand-heading">{weekday(day.date)}</span>
                <span className="font-serif text-[2rem] leading-tight text-brand-espresso">{shortDate(day.date)}</span>
                <span className="font-serif italic text-[15px] text-brand-tobacco">
                    {left === 0 ? "all spoken for" : left != null && left <= 5 ? `only ${left} left!` : `order by ${shortDate(day.closes)}`}
                </span>
            </div>
        </div>
    </li>
)

const Christmas = () => {
    const [products, setProducts] = useState(null)
    // Worked out in the browser, so the page never shows a day that has closed
    const [openDays, setOpenDays] = useState(CHRISTMAS_DAYS)
    useEffect(() => setOpenDays(christmasOpenDays()), [])
    const { room } = useDayRoom()
    const closed = openDays.length === 0

    useEffect(() => {
        let alive = true
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products?order_type=special_order&limit=100`)
            .then((r) => (r.ok ? r.json() : { products: [] }))
            .then((data) => alive && setProducts(data.products || []))
            .catch(() => alive && setProducts([]))
        return () => {
            alive = false
        }
    }, [])

    const options = OPTIONS.map((o) => ({
        option: o,
        product: (products || []).find((p) => p.slug === o.slug && p.is_active),
    })).filter((o) => o.product)

    return (
        <section className="container mx-auto px-4 pt-10 pb-16 md:pt-14 md:pb-20">
            <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
                <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-5"
                >
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-brand-heading">
                        <span className="text-brand-matcha">■</span> This season only
                    </p>
                    <h1 className="font-serif font-medium text-[3.25rem] leading-[0.98] sm:text-6xl lg:text-7xl text-brand-heading">
                        Christmas <em className="italic text-brand-tobacco">mini cakes</em>
                    </h1>
                    <p className="text-lg md:text-xl text-foreground/85 leading-relaxed max-w-xl">
                        4&quot; mini cakes, each in its own gift box, and every design is different. Pick the design you
                        love, or let me surprise you.
                    </p>

                    {products === null ? (
                        <div className="flex flex-col items-start gap-3 py-4">
                            <Loader2 className="h-6 w-6 animate-spin text-primary" />
                            <WakingNote className="text-left" />
                        </div>
                    ) : closed ? (
                        <div className="rounded-2xl border border-dashed border-border bg-card p-6 space-y-2">
                            <p className="font-serif text-2xl text-brand-espresso">Christmas orders are closed</p>
                            <p className="text-muted-foreground">
                                Thank you for all the love this season! Craving something sweet?{" "}
                                <Link href="/custom-cakes" className="underline font-medium text-brand-tobacco">
                                    See my cakes &amp; desserts
                                </Link>
                                .
                            </p>
                        </div>
                    ) : options.length ? (
                        <div className="space-y-3 pt-2">
                            <ul aria-label="Christmas cake days" className="grid grid-cols-2 gap-x-5 gap-y-4 pl-4 pt-4 pb-3 max-w-md">
                                {openDays.map((d, i) => (
                                    <DayTag key={d.date} day={d} tilt={i % 2 ? 1.5 : -2} left={room(d.date)?.christmas ?? null} />
                                ))}
                            </ul>
                            {options.map(({ option, product }) => (
                                <Option key={option.slug} option={option} product={product} />
                            ))}
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Choose your day at checkout and add your design pick (or &quot;surprise me&quot;) in the
                                notes.
                            </p>
                        </div>
                    ) : (
                        <div className="rounded-2xl border border-dashed border-border bg-card p-6 space-y-2">
                            <p className="font-serif text-2xl text-brand-espresso">Booking opens very soon!</p>
                            <p className="text-muted-foreground">
                                Want to save yours now?{" "}
                                <Link href="/custom-cakes#request" className="underline font-medium text-brand-tobacco">
                                    Send me a request
                                </Link>
                                .
                            </p>
                        </div>
                    )}
                </motion.div>

                <motion.figure
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="aspect-[4/5] rounded-[18px] overflow-hidden bg-brand-latte"
                >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src="/gallery/cakes/cake-22.jpg"
                        alt="Red and green Christmas mini cakes"
                        className="w-full h-full object-cover"
                    />
                </motion.figure>
            </div>

            <FactStrip facts={facts} className="mt-12" />
        </section>
    )
}

export default Christmas
