"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import { Loader2, Check } from "lucide-react"
import { toast } from "sonner"
import { addToCart, fetchCart } from "@/store/cartSlice"
import { DEPOSIT_RATE, FREE_DELIVERY_MILES, money } from "@/lib/special-orders"
import WakingNote from "@/components/ui/waking-note"

const explore = [
    { href: "/menu", eyebrow: "Every week", title: "Meal prep", text: "Homemade meals and juices, delivered Monday and Tuesday." },
    { href: "/menu?tab=desserts", eyebrow: "By the dozen", title: "Desserts", text: "Cookies, cupcakes, cheesecakes, strawberries and more." },
    { href: "/subscriptions", eyebrow: "Set it and forget it", title: "Subscriptions", text: "Your favorites every week or every 2 weeks." },
    { href: "/about", eyebrow: "Hi, I'm Ash!", title: "My story", text: "Why I cook everything from scratch." },
]

/**
 * A one-of-a-kind item Ash made for one customer (usually a custom cake), opened
 * from a private link. No account needed. Once it's ordered, the link closes.
 */
const CustomItem = ({ token }) => {
    const dispatch = useDispatch()
    const router = useRouter()
    const { cart } = useSelector((state) => state.cart)

    const [item, setItem] = useState(null)
    const [status, setStatus] = useState("loading") // loading | ready | missing
    const [photo, setPhoto] = useState(0)
    const [adding, setAdding] = useState(false)
    const [mixed, setMixed] = useState(false)

    useEffect(() => {
        let alive = true
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/custom/${encodeURIComponent(token)}`)
            .then(async (r) => {
                if (!alive) return
                if (!r.ok) return setStatus("missing")
                setItem(await r.json())
                setStatus("ready")
            })
            .catch(() => alive && setStatus("missing"))
        return () => {
            alive = false
        }
    }, [token])

    const photos = item ? [item.image_url, ...(item.gallery_images || [])].filter(Boolean) : []
    const inCart = !!cart?.items?.some((i) => i.product_id === item?.id)
    const price = Number(item?.price || 0)
    const deposit = item?.payment_plan === "deposit"
    // A custom meal plan rides along with weekly meal prep (and can repeat)
    const mealPlan = item?.order_type === "meal_prep"

    const handleOrder = async () => {
        if (inCart) {
            router.push("/checkout")
            return
        }
        setAdding(true)
        setMixed(false)
        try {
            let cartId = cart?.id
            if (!cartId) cartId = (await dispatch(fetchCart()).unwrap())?.id
            await dispatch(addToCart({ cart_id: cartId, product_id: item.id, quantity: 1 })).unwrap()
            await dispatch(fetchCart())
            router.push("/checkout")
        } catch (err) {
            const message = typeof err === "string" ? err : err?.message
            if (/separately/i.test(message || "")) setMixed(true)
            else toast.error(message || "Couldn't add it to your cart. Please try again.")
        } finally {
            setAdding(false)
        }
    }

    if (status === "loading") {
        return (
            <div className="flex flex-col items-center gap-4 py-32">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <WakingNote />
            </div>
        )
    }

    if (status === "missing") {
        return (
            <section className="container mx-auto px-4 py-24 text-center max-w-xl space-y-4">
                <h1 className="font-serif font-medium text-5xl text-brand-heading">
                    Hmm, I can&apos;t find <em className="italic text-brand-tobacco">that one</em>
                </h1>
                <p className="text-muted-foreground">
                    This link may have been mistyped. Message me and I&apos;ll send it again!
                </p>
                <Link href="/contact" className="inline-block underline text-brand-tobacco">Contact me →</Link>
            </section>
        )
    }

    return (
        <>
            <section className="container mx-auto px-4 pt-10 pb-14 md:pt-14 md:pb-20">
                <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-start">
                    {/* Photos: inspiration or the finished design */}
                    <div className="space-y-3">
                        <div className="aspect-square rounded-[22px] overflow-hidden bg-brand-latte">
                            {photos.length > 0 ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={photos[photo]} alt={`${item.name}, photo ${photo + 1}`} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full grid place-items-center font-serif italic text-3xl text-brand-tobacco">
                                    Made just for you ♡
                                </div>
                            )}
                        </div>
                        {photos.length > 1 && (
                            <div className="grid grid-cols-5 gap-2">
                                {photos.map((src, i) => (
                                    <button
                                        key={src + i}
                                        type="button"
                                        onClick={() => setPhoto(i)}
                                        aria-label={`Show photo ${i + 1}`}
                                        className={`aspect-square rounded-xl overflow-hidden border-2 ${i === photo ? "border-brand-tobacco" : "border-transparent"}`}
                                    >
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={src} alt="" className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Details */}
                    <div className="space-y-6">
                        <div className="space-y-3">
                            <p className="font-mono text-xs uppercase tracking-[0.18em] text-brand-heading">
                                <span className="text-brand-matcha">■</span> Made just for you
                            </p>
                            <h1 className="font-serif font-medium text-[2.75rem] leading-[1.02] sm:text-6xl text-brand-heading">
                                {item.name}
                            </h1>
                            <p className="font-serif text-3xl text-brand-espresso">{money(price)}</p>
                        </div>

                        {item.description && (
                            <div className="rounded-2xl border border-border bg-card p-5">
                                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-brand-heading mb-2">The details</p>
                                <p className="text-foreground/85 leading-relaxed whitespace-pre-line">{item.description}</p>
                            </div>
                        )}

                        {item.available ? (
                            <>
                                <dl className="divide-y divide-dashed divide-border border-y border-dashed border-border text-sm">
                                    {deposit && (
                                        <div className="flex justify-between gap-6 py-3">
                                            <dt className="text-muted-foreground">Due today (50% deposit)</dt>
                                            <dd className="font-semibold text-brand-espresso">{money(price * DEPOSIT_RATE)}</dd>
                                        </div>
                                    )}
                                    {deposit && (
                                        <div className="flex justify-between gap-6 py-3">
                                            <dt className="text-muted-foreground">Charged on your date</dt>
                                            <dd>{money(price - price * DEPOSIT_RATE)}</dd>
                                        </div>
                                    )}
                                    {mealPlan ? (
                                        <>
                                            <div className="flex justify-between gap-6 py-3">
                                                <dt className="text-muted-foreground">Delivery</dt>
                                                <dd>Monday or Tuesday, or pick up</dd>
                                            </div>
                                            {item.allow_subscription && (
                                                <div className="flex justify-between gap-6 py-3">
                                                    <dt className="text-muted-foreground">How often</dt>
                                                    <dd>One time, every week or every 2 weeks</dd>
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                    <div className="flex justify-between gap-6 py-3">
                                        <dt className="text-muted-foreground">Delivery</dt>
                                        <dd>Free within {FREE_DELIVERY_MILES} miles, or pick up</dd>
                                    </div>
                                    )}
                                    {!mealPlan && item.lead_time_days > 0 && (
                                        <div className="flex justify-between gap-6 py-3">
                                            <dt className="text-muted-foreground">Your date</dt>
                                            <dd>Pick it at checkout ({item.lead_time_days}+ days out)</dd>
                                        </div>
                                    )}
                                </dl>

                                {mixed ? (
                                    <div className="rounded-xl border border-border bg-muted p-4 text-sm space-y-2">
                                        <p>
                                            Your cart has meal prep in it. Custom orders check out on their own, so finish that order
                                            first or remove it from your cart.
                                        </p>
                                        <Link href="/cart" className="underline font-medium">Go to my cart →</Link>
                                    </div>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={handleOrder}
                                        disabled={adding}
                                        className="inline-flex w-full items-center justify-center gap-3 h-12 px-6 rounded-lg bg-primary text-primary-foreground font-mono text-xs uppercase tracking-[0.18em] hover:bg-primary/90 transition-colors disabled:opacity-50"
                                    >
                                        {adding ? <Loader2 className="h-4 w-4 animate-spin" /> : inCart ? <>In your cart <Check className="h-4 w-4" /> Check out →</> : <>Order mine <span aria-hidden="true">→</span></>}
                                    </button>
                                )}
                                <p className="text-sm text-muted-foreground">
                                    {mealPlan
                                        ? "You'll sign in or make a quick account at checkout, so you can skip or pause anytime. Something not quite right? Message me before you order and I'll fix it."
                                        : "No account needed. Something not quite right? Message me before you order and I'll fix it."}
                                </p>
                            </>
                        ) : (
                            <div className="rounded-2xl bg-muted p-5 space-y-1">
                                <p className="font-serif text-2xl text-brand-espresso">This one&apos;s been ordered ♡</p>
                                <p className="text-sm text-muted-foreground">
                                    If it was yours, your receipt is in your email. Thank you!
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Explore: the link is a way in to the rest of the site */}
            <section className="bg-muted">
                <div className="container mx-auto px-4 py-16 md:py-20">
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-brand-heading text-center mb-3">
                        <span className="text-brand-matcha">■</span> While you&apos;re here
                    </p>
                    <h2 className="font-serif font-medium text-4xl md:text-5xl text-brand-heading text-center mb-10">
                        What else are you <em className="italic text-brand-tobacco">craving?</em>
                    </h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {explore.map((e) => (
                            <Link
                                key={e.href}
                                href={e.href}
                                className="group bg-background rounded-2xl p-6 border border-transparent hover:border-brand-tobacco transition-colors"
                            >
                                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-brand-heading">{e.eyebrow}</p>
                                <p className="font-serif text-2xl font-semibold text-brand-espresso mt-1">{e.title}</p>
                                <p className="text-sm text-muted-foreground mt-2">{e.text}</p>
                                <p className="font-mono text-xs uppercase tracking-[0.16em] text-brand-tobacco mt-4 group-hover:underline underline-offset-4">
                                    Take a look →
                                </p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}

export default CustomItem
