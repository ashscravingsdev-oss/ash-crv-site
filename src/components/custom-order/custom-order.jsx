"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Loader2, CalendarDays, Clock, Store, Truck } from "lucide-react"
import { toast } from "sonner"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import PaymentMethod from "@/components/checkout/payment-method"
import WakingNote from "@/components/ui/waking-note"
import { money, prettyDate } from "@/lib/special-orders"

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL
const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/

// "12:00 PM - 4:00 PM" → "12:00 PM – 4:00 PM"
const prettySlot = (slot) => String(slot || "").replace(/\s+-\s+/g, " – ")

// Big, centered message for a link that can't be paid (not found, cancelled, paid...)
const Notice = ({ title, children }) => (
    <section className="container mx-auto px-4 py-20 md:py-28 text-center max-w-xl space-y-4">
        <h1 className="font-serif font-medium text-4xl sm:text-5xl leading-tight text-brand-heading">{title}</h1>
        {children}
    </section>
)

// Inside a sentence, the padding makes it easy to tap without changing the line height
const ContactLink = ({ children = "Contact me →", inline = false }) => (
    <Link
        href="/contact"
        className={`${inline ? "inline-block py-3 -my-3" : "inline-flex min-h-11 items-center"} underline underline-offset-4 text-brand-tobacco`}
    >
        {children}
    </Link>
)

/**
 * An order Ash set up for one customer (her items, prices, date, time and pickup
 * or delivery), opened from a private link. The customer only adds their
 * contact info, their address for a delivery, and pays. No account needed.
 */
const CustomOrder = ({ token }) => {
    const [order, setOrder] = useState(null)
    const [view, setView] = useState("loading") // loading | open | paid | cancelled | missing | closed | error
    const [closedMessage, setClosedMessage] = useState("")
    const [changed, setChanged] = useState(false)

    const [guest, setGuest] = useState({ name: "", email: "", phone: "" })
    const [address, setAddress] = useState("")
    const [notes, setNotes] = useState("")
    const [agree, setAgree] = useState(false)
    const [square, setSquare] = useState(null)
    const [submitting, setSubmitting] = useState(false)
    const busy = useRef(false)

    const load = useCallback(async () => {
        try {
            const r = await fetch(`${BACKEND}/custom-orders/${encodeURIComponent(token)}`, { cache: "no-store" })
            if (r.status === 404) {
                setView("missing")
                return null
            }
            if (!r.ok) throw new Error(`HTTP ${r.status}`)
            const data = await r.json()
            setOrder(data)
            setView(data.status === "open" ? "open" : data.status === "paid" ? "paid" : "cancelled")
            // Fill in what Ash already knows, without wiping anything they typed
            setGuest((g) => (g.name ? g : { ...g, name: data.customer_name || "" }))
            setAddress((a) => a || data.delivery_address || "")
            return data
        } catch (err) {
            console.error("Couldn't load this order:", err)
            setView((v) => (v === "loading" ? "error" : v))
            return null
        }
    }, [token])

    useEffect(() => {
        load()
    }, [load])

    if (view === "loading") {
        return (
            <div className="flex flex-col items-center gap-4 py-32">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <WakingNote />
            </div>
        )
    }

    if (view === "missing") {
        return (
            <Notice title={<>This link isn&apos;t <em className="italic text-brand-tobacco">working</em></>}>
                <p className="text-muted-foreground">Please message me and I&apos;ll send it again.</p>
                <ContactLink />
            </Notice>
        )
    }

    if (view === "error") {
        return (
            <Notice title={<>I couldn&apos;t load your <em className="italic text-brand-tobacco">order</em></>}>
                <p className="text-muted-foreground">Please check your connection and try again.</p>
                <Button
                    type="button"
                    size="lg"
                    className="h-11"
                    onClick={() => {
                        setView("loading")
                        load()
                    }}
                >
                    Try again
                </Button>
            </Notice>
        )
    }

    if (view === "cancelled" || view === "closed") {
        return (
            <Notice title={<>This order isn&apos;t available <em className="italic text-brand-tobacco">anymore</em></>}>
                <p className="text-muted-foreground">{closedMessage || "Please message me."}</p>
                <ContactLink />
            </Notice>
        )
    }

    if (view === "paid") {
        return (
            <Notice title={<>This order is paid. <em className="italic text-brand-tobacco">Thank you!</em></>}>
                {order?.order_number && (
                    <p className="text-muted-foreground">
                        Order number <span className="font-medium text-foreground">{order.order_number}</span>
                    </p>
                )}
                <p className="text-muted-foreground">Your receipt is in your email. Questions about it?</p>
                <ContactLink>Message me →</ContactLink>
            </Notice>
        )
    }

    // ---------- Open: review and pay ----------
    const delivery = order.fulfillment_method === "delivery"
    const deposit = order.payment_plan === "deposit"
    const dueToday = Number(order.due_today) || 0
    const firstName = String(order.customer_name || "").trim().split(/\s+/)[0]
    const date = prettyDate(order.delivery_date)

    // What's still missing, and which field to jump to
    const problem = () => {
        if (!guest.name.trim()) return ["Please add your name", "co-name"]
        if (!EMAIL.test(guest.email.trim())) return ["Please add a valid email", "co-email"]
        if (guest.phone.replace(/\D/g, "").length < 10) return ["Please add your phone number", "co-phone"]
        if (delivery && address.trim().length < 6) return ["Please add your delivery address", "co-address"]
        if (!square) return ["The card form is still loading", null]
        if (deposit && !agree) return ["Please check the box about your remaining balance", "co-agree"]
        return null
    }

    const checkForm = () => {
        const p = problem()
        if (!p) return true
        toast.error(p[0])
        if (p[1]) document.getElementById(p[1])?.focus()
        return false
    }

    // Pays with a card or wallet token, then opens the receipt; throws if it fails
    const pay = async (cardToken) => {
        const body = {
            guest: { name: guest.name.trim(), email: guest.email.trim(), phone: guest.phone.trim() },
            address: delivery ? address.trim() : undefined,
            order_notes: notes.trim() || undefined,
            cardToken,
            // The amount on screen: if I changed the order since it loaded, nothing is charged
            due_today: dueToday,
        }
        const r = await fetch(`${BACKEND}/custom-orders/${encodeURIComponent(token)}/pay`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        })
        const data = await r.json().catch(() => ({}))
        if (!r.ok) throw Object.assign(new Error(data.message || ""), { status: r.status, code: data.code })
        window.location.href = `/order-confirmation?orderId=${data.order.id}&key=${encodeURIComponent(data.order.viewKey)}`
    }

    const failed = async (err) => {
        console.error("Payment error:", err)
        busy.current = false
        setSubmitting(false)
        const { status, code } = err || {}
        if (status === 409 && code === "ORDER_CHANGED") {
            // I edited the order after they opened it: show the new one
            toast.error("I just updated your order. Please look it over again before you pay.")
            setAgree(false)
            setChanged(true)
            await load()
            window.scrollTo({ top: 0, behavior: "smooth" })
        } else if (status === 410) {
            setClosedMessage(err.message || "Please message me.")
            setView("closed")
            window.scrollTo({ top: 0 })
        } else if (status === 404 || status === 409) {
            // Already paid, cancelled, or something changed: the fresh order shows which
            toast.error(err.message || "This order changed. Please message me.")
            await load()
            window.scrollTo({ top: 0 })
        } else if (!status) {
            toast.error("I couldn't reach my kitchen. Please check your connection and try again.")
        } else if (status >= 500) {
            toast.error("Something went wrong on my end, so nothing was charged. Please try again in a minute.")
        } else {
            toast.error(err.message || "Your payment didn't go through. Please try again.")
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (busy.current || !checkForm()) return
        busy.current = true
        setSubmitting(true)
        try {
            const card = await square.tokenize()
            await pay(card.token)
        } catch (err) {
            await failed(err)
        }
    }

    // Apple Pay / Google Pay (paid in full only): the form check must stay synchronous
    const walletCheck = () => !busy.current && checkForm()
    const payWithWallet = async ({ token: walletToken }) => {
        busy.current = true
        setSubmitting(true)
        try {
            await pay(walletToken)
        } catch (err) {
            await failed(err)
        }
    }

    return (
        <section className="container mx-auto px-4 pt-8 pb-16 md:pt-12 max-w-2xl lg:max-w-5xl">
            <h1 className="font-serif font-medium text-4xl md:text-5xl leading-tight text-brand-heading">
                {firstName ? <>Hi {firstName}! Here&apos;s your </> : <>Your </>}
                <em className="italic text-brand-tobacco">order</em>
            </h1>
            {order.note && (
                <p className="mt-4 max-w-2xl border-l-2 border-brand-latte pl-4 font-serif italic text-xl leading-snug text-brand-espresso/85 whitespace-pre-line break-words">
                    {order.note}
                </p>
            )}
            {changed && (
                <p role="status" className="mt-6 rounded-xl border border-brand-tobacco/40 bg-brand-latte/40 p-4 text-sm">
                    I just updated your order. Please look it over again before you pay.
                </p>
            )}

            <form onSubmit={handleSubmit} noValidate className="mt-8 grid gap-6 lg:grid-cols-2 lg:gap-10 items-start">
                {/* The order, as I set it up */}
                <Card className="lg:sticky lg:top-24">
                    <CardHeader>
                        <CardTitle className="font-serif text-2xl font-medium">Order summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-5">
                        <ul className="space-y-2.5 text-sm">
                            <li className="flex items-center gap-3">
                                <CalendarDays className="h-4 w-4 shrink-0 text-brand-tobacco" aria-hidden="true" />
                                <span className="font-medium">{date}</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Clock className="h-4 w-4 shrink-0 text-brand-tobacco" aria-hidden="true" />
                                <span>{prettySlot(order.delivery_time_slot)}</span>
                            </li>
                            <li className="flex items-start gap-3">
                                {delivery ? (
                                    <>
                                        <Truck className="h-4 w-4 mt-0.5 shrink-0 text-brand-tobacco" aria-hidden="true" />
                                        <span>Delivery to your door</span>
                                    </>
                                ) : (
                                    <>
                                        <Store className="h-4 w-4 mt-0.5 shrink-0 text-brand-tobacco" aria-hidden="true" />
                                        <span>
                                            Pickup in Eastvale
                                            <span className="block text-muted-foreground">I&apos;ll text you the address</span>
                                        </span>
                                    </>
                                )}
                            </li>
                        </ul>

                        <ul className="divide-y divide-dashed divide-border border-y border-dashed border-border">
                            {order.items.map((item, i) => (
                                <li key={`${item.name}-${i}`} className="flex gap-3 py-4">
                                    {item.image_url && (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img
                                            src={item.image_url}
                                            alt=""
                                            loading="lazy"
                                            className="h-16 w-16 shrink-0 rounded-xl object-cover bg-brand-latte"
                                        />
                                    )}
                                    <div className="min-w-0 flex-1">
                                        <div className="flex justify-between gap-3">
                                            <p className="font-medium text-brand-espresso break-words min-w-0">{item.name}</p>
                                            <p className="font-medium shrink-0">
                                                {Number(item.line_total) > 0 ? money(item.line_total) : "Free"}
                                            </p>
                                        </div>
                                        <p className="text-sm text-muted-foreground">
                                            {item.quantity} × {money(item.unit_price)}
                                        </p>
                                        {item.description && (
                                            <p className="mt-1 text-xs leading-relaxed text-muted-foreground whitespace-pre-line break-words">
                                                {item.description}
                                            </p>
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ul>

                        <dl className="space-y-1.5 text-sm">
                            <div className="flex justify-between gap-4">
                                <dt className="text-muted-foreground">Subtotal</dt>
                                <dd>{money(order.subtotal)}</dd>
                            </div>
                            {delivery && (
                                <div className="flex justify-between gap-4">
                                    <dt className="text-muted-foreground">Delivery</dt>
                                    <dd>{Number(order.delivery_fee) > 0 ? money(order.delivery_fee) : "Free"}</dd>
                                </div>
                            )}
                            {Number(order.tax_total) > 0 && (
                                <div className="flex justify-between gap-4">
                                    <dt className="text-muted-foreground">Tax</dt>
                                    <dd>{money(order.tax_total)}</dd>
                                </div>
                            )}
                            <div className="flex justify-between gap-4 pt-1 text-base font-semibold">
                                <dt>Total</dt>
                                <dd>{money(order.total)}</dd>
                            </div>
                        </dl>

                        {deposit && (
                            <div className="rounded-xl bg-muted p-4 space-y-1.5 text-sm">
                                <div className="flex justify-between gap-4 font-semibold text-brand-espresso">
                                    <span>Due today (50%)</span>
                                    <span>{money(dueToday)}</span>
                                </div>
                                <div className="flex justify-between gap-4">
                                    <span>Charged on {date}</span>
                                    <span>{money(order.balance_later)}</span>
                                </div>
                                <p className="pt-1 text-xs text-muted-foreground">
                                    The rest is charged to the same card on your date, so there&apos;s nothing else to do.
                                </p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                <div className="space-y-6 min-w-0">
                    {/* Their details */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="font-serif text-2xl font-medium">Your details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-sm text-muted-foreground">
                                No account needed. I&apos;ll email your receipt and text you if I have any questions.
                            </p>
                            <div className="space-y-2">
                                <Label htmlFor="co-name">Name</Label>
                                <Input
                                    id="co-name"
                                    className="h-11"
                                    autoComplete="name"
                                    maxLength={120}
                                    value={guest.name}
                                    onChange={(e) => setGuest({ ...guest, name: e.target.value })}
                                />
                            </div>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="co-email">Email</Label>
                                    <Input
                                        id="co-email"
                                        type="email"
                                        inputMode="email"
                                        className="h-11"
                                        autoComplete="email"
                                        value={guest.email}
                                        onChange={(e) => setGuest({ ...guest, email: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="co-phone">Phone</Label>
                                    <Input
                                        id="co-phone"
                                        type="tel"
                                        inputMode="tel"
                                        className="h-11"
                                        autoComplete="tel"
                                        value={guest.phone}
                                        onChange={(e) => setGuest({ ...guest, phone: e.target.value })}
                                    />
                                </div>
                            </div>
                            {delivery && (
                                <div className="space-y-2">
                                    <Label htmlFor="co-address">Delivery address</Label>
                                    <Textarea
                                        id="co-address"
                                        rows={3}
                                        maxLength={300}
                                        autoComplete="street-address"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        placeholder="Street, apartment or unit, city"
                                    />
                                </div>
                            )}
                            <div className="space-y-2">
                                <Label htmlFor="co-notes">Anything I should know? (optional)</Label>
                                <Textarea
                                    id="co-notes"
                                    rows={3}
                                    maxLength={2000}
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    placeholder={delivery ? "Gate code, allergies, anything else..." : "Allergies, or anything else..."}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Pay */}
                    <PaymentMethod
                        onSquareReady={setSquare}
                        onPaymentError={(m) => toast.error(m || "Payment system error")}
                        amount={dueToday}
                        walletsEnabled={!deposit}
                        walletNote={deposit ? "Apple Pay and Google Pay work for orders paid in full. With a deposit, the rest is charged to your card on your date." : undefined}
                        beforeWallet={walletCheck}
                        onWalletToken={payWithWallet}
                    />
                    {deposit && (
                        <label className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 text-sm cursor-pointer">
                            <input
                                id="co-agree"
                                type="checkbox"
                                className="mt-0.5 h-5 w-5 shrink-0 accent-[hsl(var(--primary))]"
                                checked={agree}
                                onChange={(e) => setAgree(e.target.checked)}
                            />
                            <span>
                                I&apos;m paying a 50% deposit today ({money(dueToday)}). I agree the remaining{" "}
                                {money(order.balance_later)} will be charged to this card on {date}. If anything changes, Ash
                                will refund the difference.
                            </span>
                        </label>
                    )}
                    <Button type="submit" size="lg" className="w-full h-12 text-base" disabled={submitting}>
                        {submitting ? (
                            <span className="flex items-center gap-2">
                                <Loader2 className="h-4 w-4 animate-spin" /> Placing your order…
                            </span>
                        ) : deposit ? (
                            `Pay ${money(dueToday)} deposit`
                        ) : (
                            `Pay ${money(dueToday)}`
                        )}
                    </Button>
                    <p className="text-center text-sm text-muted-foreground">
                        Something not quite right? <ContactLink inline>Message me</ContactLink> before you pay and I&apos;ll fix it.
                    </p>
                </div>
            </form>
        </section>
    )
}

export default CustomOrder
