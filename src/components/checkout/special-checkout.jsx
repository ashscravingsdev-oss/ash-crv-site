"use client"

import { useEffect, useRef, useState } from "react"
import Cookies from "js-cookie"
import { useSelector } from "react-redux"
import Link from "next/link"
import { Loader2, MapPin, Store, Truck, CheckCircle2, AlertTriangle } from "lucide-react"
import { toast } from "sonner"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { apiRequest } from "@/lib/apiRequest"
import MapPicker from "./map-picker"
import { useDayRoom } from "@/lib/use-day-room"
import PaymentMethod from "./payment-method"
import { Choice, PICKUP_ADDRESS } from "./fulfillment-choice"
import {
    christmasOpenDays,
    isChristmasItem,
    shortDate,
    DEPOSIT_RATE,
    cartHasChristmas,
    cartHasDeposit,
    cartDayUnits,
    dateFromToday,
    leadDaysFor,
    money,
    prettyDate,
    weekdayOf,
} from "@/lib/special-orders"

const TIME_WINDOWS = [
    { value: "9:00 AM - 12:00 PM", label: "Morning", hint: "9 AM – 12 PM" },
    { value: "12:00 PM - 4:00 PM", label: "Afternoon", hint: "12 – 4 PM" },
    { value: "4:00 PM - 7:00 PM", label: "Evening", hint: "4 – 7 PM" },
]

/**
 * Checkout for desserts, cakes and custom items. No account needed: guests give
 * their name, email and phone. 50% today, the rest charged on the date they pick.
 */
const SpecialCheckout = ({ cart, items, subtotal, taxTotal, couponDiscount, currentUser }) => {
    const isLoggedIn = !!currentUser
    const mapRef = useRef(null)
    const mapboxAccessToken = process.env.NEXT_PUBLIC_MAP_BOX_ACCESS_TOKEN

    // Christmas mini cakes only go out on Ash's December days, each with its own
    // order-by date; anything else in the cart still needs its usual notice
    const christmas = cartHasChristmas(items)
    const others = items.filter((i) => !isChristmasItem(i))
    const lead = Math.max(1, leadDaysFor(christmas ? others : items))
    const earliest = dateFromToday(lead)
    const openDays = christmas ? christmasOpenDays() : []
    const christmasDays = openDays.filter((d) => !others.length || d.date >= earliest)
    const christmasClosed = christmas && christmasDays.length === 0
    const minDate = earliest
    const maxDate = undefined

    // How much I can still make each day (the order server checks again when the order is placed)
    const { room } = useDayRoom()
    const need = cartDayUnits(items)
    const christmasFull = (day) => {
        const r = room(day)
        return !!r && need.christmas > r.christmas
    }

    const [guest, setGuest] = useState({ name: "", email: "", phone: "" })
    const [method, setMethod] = useState("delivery")
    const [addressData, setAddressData] = useState({ address: "", latitude: null, longitude: null })
    const [quote, setQuote] = useState(null) // { deliverable, fee } | null (no miles, on purpose)
    const [checking, setChecking] = useState(false)
    const [date, setDate] = useState("")
    const [timeSlot, setTimeSlot] = useState(TIME_WINDOWS[1].value)
    const [notes, setNotes] = useState("")
    const [agree, setAgree] = useState(false)
    const [square, setSquare] = useState(null)
    const [submitting, setSubmitting] = useState(false)

    // A friendly note when the picked day can't fit this order
    const dayRoom = room(date)
    const dayFull = !dayRoom
        ? null
        : need.christmas > dayRoom.christmas
          ? dayRoom.christmas === 0
              ? "My Christmas mini cakes for that day are all spoken for. Please pick my other day."
              : `I only have ${dayRoom.christmas} mini ${dayRoom.christmas === 1 ? "cake" : "cakes"} left that day.`
          : need.desserts > dayRoom.desserts
            ? dayRoom.desserts === 0
                ? "I'm fully booked for desserts that day. Please pick another day."
                : `That day is almost full: I only have room for ${dayRoom.desserts} more dozen. Please pick another day, or take ${need.desserts - dayRoom.desserts} out of your cart.`
            : null

    // Delivery uses Ash's delivery zones (the order server works out the real fee again when the order is placed)
    const freeDeliveryCoupon = useSelector((state) => state.cart.coupon)?.type === "free_delivery"
    const deliveryFee = method === "delivery" && quote?.deliverable && !freeDeliveryCoupon ? Number(quote.fee) || 0 : 0
    const total = Math.max(0, subtotal + taxTotal - (couponDiscount || 0) + deliveryFee)
    const deposit = cartHasDeposit(items)
    const dueToday = deposit ? Math.round(total * DEPOSIT_RATE * 100) / 100 : total
    const dueLater = Math.round((total - dueToday) * 100) / 100

    // As soon as an address is picked, ask if I deliver there and what the fee is
    useEffect(() => {
        setQuote(null)
        if (method !== "delivery" || !addressData.latitude || !addressData.longitude) {
            setChecking(false)
            return
        }
        let alive = true
        setChecking(true)
        apiRequest("/delivery/special-check", {
            method: "POST",
            body: JSON.stringify({ latitude: addressData.latitude, longitude: addressData.longitude, cart_total: subtotal }),
        })
            .then((d) => alive && setQuote(d))
            .catch(() => alive && setQuote(null))
            .finally(() => alive && setChecking(false))
        return () => {
            alive = false
        }
    }, [method, addressData.latitude, addressData.longitude, subtotal])

    const missing = () => {
        if (!isLoggedIn) {
            if (!guest.name.trim()) return "Please add your name"
            if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(guest.email.trim())) return "Please add a valid email"
            if (guest.phone.replace(/\D/g, "").length < 10) return "Please add your phone number"
        }
        if (christmasClosed) {
            return openDays.length
                ? "Some items in your cart need more notice than my Christmas days allow. Please order them separately."
                : "Christmas mini cake orders are closed. Thank you so much!"
        }
        if (!date) return "Please pick your date"
        if (christmas) {
            if (!christmasDays.some((d) => d.date === date)) return "Please pick one of my Christmas days"
        } else if (date < minDate) return `Please pick ${prettyDate(minDate)} or later`
        if (dayFull) return dayFull
        if (method === "delivery") {
            if (!addressData.address || !addressData.latitude) return "Please choose your delivery address on the map"
            // The fee is part of the total, so wait for it before taking payment
            if (!quote) return checking ? "One moment, I'm checking your address" : "I couldn't check that address. Please pick it again, or choose pickup."
            if (!quote.deliverable) return "That address is outside my delivery area. Please choose pickup."
        }
        if (!square) return "The card form is still loading"
        if (deposit && !agree) return "Please check the box about your remaining balance"
        return null
    }

    // Places the order with a card or wallet token; throws if it fails
    const placeOrder = async (cardToken) => {
        const pickup = method === "pickup"
        const body = {
            cart_id: cart.id,
            session_id: isLoggedIn ? undefined : Cookies.get("session_id"),
            guest: isLoggedIn ? undefined : { name: guest.name.trim(), email: guest.email.trim(), phone: guest.phone.trim() },
            fulfillment_method: method,
            address: pickup ? PICKUP_ADDRESS : addressData.address,
            latitude: pickup ? undefined : addressData.latitude,
            longitude: pickup ? undefined : addressData.longitude,
            delivery_date: date,
            delivery_day: weekdayOf(date),
            delivery_time_slot: timeSlot,
            order_notes: notes.trim() || undefined,
            frequency: "one-time",
            cardToken,
            totals: { subtotal, tax: taxTotal, discount: couponDiscount || 0, tipAmount: 0, deliveryFee, total },
        }
        const result = await apiRequest("/checkout/create-order", { method: "POST", body: JSON.stringify(body) })
        const key = result.order?.viewKey ? `&key=${encodeURIComponent(result.order.viewKey)}` : ""
        window.location.href = `/order-confirmation?orderId=${result.order.id}${key}`
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const problem = missing()
        if (problem) {
            toast.error(problem)
            return
        }
        setSubmitting(true)
        try {
            const card = await square.tokenize()
            await placeOrder(card.token)
        } catch (err) {
            console.error("Order submission error:", err)
            toast.error(err?.message || "Something went wrong placing your order. Please try again.")
            setSubmitting(false)
        }
    }

    // Apple Pay / Google Pay: check the form first (must stay synchronous)
    const walletCheck = () => {
        const problem = missing()
        if (problem) {
            toast.error(problem)
            return false
        }
        return true
    }

    const payWithWallet = async ({ token }) => {
        setSubmitting(true)
        try {
            await placeOrder(token)
        } catch (err) {
            setSubmitting(false)
            throw err
        }
    }

    return (
        <div className="container mx-auto px-4 pt-8 pb-16">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-brand-heading">
                <span className="text-brand-matcha">■</span> Checkout
            </p>
            <h1 className="font-serif font-medium text-4xl md:text-5xl text-brand-heading mt-2 mb-8">
                Almost <em className="italic text-brand-tobacco">yours</em>
            </h1>

            <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    {/* 1. You */}
                    <Card>
                        <CardHeader>
                            <CardTitle>1. Your details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {isLoggedIn ? (
                                <p className="text-sm text-muted-foreground">
                                    Ordering as <span className="font-medium text-foreground">{currentUser.email}</span>
                                </p>
                            ) : (
                                <>
                                    <p className="text-sm text-muted-foreground">
                                        No account needed. I&apos;ll email your receipt and text you if I have any questions.{" "}
                                        <Link href="/login?redirect=/checkout" className="underline">Have an account? Sign in</Link>
                                    </p>
                                    <div className="grid sm:grid-cols-3 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="g-name">Name</Label>
                                            <Input id="g-name" autoComplete="name" value={guest.name} onChange={(e) => setGuest({ ...guest, name: e.target.value })} required />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="g-email">Email</Label>
                                            <Input id="g-email" type="email" autoComplete="email" value={guest.email} onChange={(e) => setGuest({ ...guest, email: e.target.value })} required />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="g-phone">Phone</Label>
                                            <Input id="g-phone" type="tel" autoComplete="tel" value={guest.phone} onChange={(e) => setGuest({ ...guest, phone: e.target.value })} required />
                                        </div>
                                    </div>
                                </>
                            )}
                        </CardContent>
                    </Card>

                    {/* 2. When and how */}
                    <Card>
                        <CardHeader>
                            <CardTitle>2. Your date</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="s-date">Date</Label>
                                    {christmas ? (
                                        christmasClosed ? (
                                            <p className="rounded-lg border border-dashed border-border px-3 py-3 text-sm text-muted-foreground">
                                                {openDays.length
                                                    ? "Some items in your cart need more notice than my Christmas days allow. Please order them separately."
                                                    : "Christmas mini cake orders are closed. Thank you so much!"}
                                            </p>
                                        ) : (
                                            <div className="flex flex-col gap-2" role="group" aria-label="Christmas days">
                                                {christmasDays.map((d) => (
                                                    <button
                                                        key={d.date}
                                                        type="button"
                                                        onClick={() => setDate(d.date)}
                                                        disabled={christmasFull(d.date)}
                                                        aria-pressed={date === d.date}
                                                        className={`rounded-lg border px-3 py-2.5 text-left disabled:opacity-50 disabled:cursor-not-allowed ${
                                                            date === d.date ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-brand-tobacco"
                                                        }`}
                                                    >
                                                        <span className="block text-sm font-medium">{prettyDate(d.date)}</span>
                                                        <span className={`block text-xs ${date === d.date ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                                                            {room(d.date)?.christmas === 0
                                                                ? "All spoken for"
                                                                : christmasFull(d.date)
                                                                  ? `Only ${room(d.date).christmas} left`
                                                                  : `Orders close ${shortDate(d.closes)}`}
                                                        </span>
                                                    </button>
                                                ))}
                                            </div>
                                        )
                                    ) : (
                                        <Input id="s-date" type="date" min={minDate} max={maxDate} value={date} onChange={(e) => setDate(e.target.value)} required />
                                    )}
                                    {dayFull && (
                                        <p role="alert" className="text-sm text-[#9A3B31]">{dayFull}</p>
                                    )}
                                    {!christmasClosed && (
                                        <p className="text-xs text-muted-foreground">
                                            {christmas
                                                ? "My Christmas mini cakes are ready on these days. Pick the one you'd like."
                                                : <>{lead} days&apos; notice, so {prettyDate(earliest)} or later. Need it sooner? Message me!</>}
                                        </p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label>Time</Label>
                                    <div className="flex gap-2">
                                        {TIME_WINDOWS.map((w) => (
                                            <button
                                                key={w.value}
                                                type="button"
                                                onClick={() => setTimeSlot(w.value)}
                                                aria-pressed={timeSlot === w.value}
                                                className={`flex-1 rounded-lg border px-2 py-2 text-sm leading-tight ${
                                                    timeSlot === w.value ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-brand-tobacco"
                                                }`}
                                            >
                                                {w.label}
                                                <span className="block text-[11px] opacity-80">{w.hint}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3">
                                <Choice
                                    selected={method === "delivery"}
                                    onClick={() => setMethod("delivery")}
                                    icon={Truck}
                                    title="Delivery"
                                    text="To your door, in and around Eastvale"
                                />
                                <Choice
                                    selected={method === "pickup"}
                                    onClick={() => setMethod("pickup")}
                                    icon={Store}
                                    title="Pickup"
                                    text="Free, in Eastvale. I'll text you the address"
                                />
                            </div>

                            {method === "delivery" && (
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <MapPin className="w-4 h-4 text-primary" />
                                        <h3 className="text-sm font-semibold">Delivery address</h3>
                                    </div>
                                    <MapPicker
                                        ref={mapRef}
                                        mapboxAccessToken={mapboxAccessToken}
                                        initialAddress={addressData}
                                        onAddressSelect={setAddressData}
                                        mapHeight={320}
                                        placeholder="Search for your address..."
                                    />
                                    {checking && <p className="text-sm text-muted-foreground flex items-center gap-2"><Loader2 className="h-3.5 w-3.5 animate-spin" /> Checking your address…</p>}
                                    {!checking && quote?.deliverable && (
                                        <p className="text-sm text-green-700 flex items-center gap-2">
                                            <CheckCircle2 className="h-4 w-4 shrink-0" /> You&apos;re in my delivery area.{" "}
                                            {deliveryFee > 0 ? `Delivery is ${money(deliveryFee)}.` : "Delivery is free!"}
                                        </p>
                                    )}
                                    {!checking && quote && !quote.deliverable && (
                                        <p className="text-sm text-destructive flex items-center gap-2">
                                            <AlertTriangle className="h-4 w-4 shrink-0" /> That&apos;s outside my delivery area, so please choose pickup or message me.
                                        </p>
                                    )}
                                </div>
                            )}

                            <div className="space-y-2">
                                <Label htmlFor="s-notes">Anything I should know? (optional)</Label>
                                <Textarea
                                    id="s-notes"
                                    rows={3}
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    placeholder="Event, colors or theme, a name to write, allergies, gate code..."
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* 3. Pay */}
                    <div className="space-y-3">
                        <PaymentMethod
                            onSquareReady={setSquare}
                            onPaymentError={(m) => toast.error(m || "Payment system error")}
                            amount={total}
                            walletsEnabled={!deposit}
                            walletNote={deposit ? "Apple Pay and Google Pay work for orders paid in full. With a deposit, the rest is charged to your card on your date." : undefined}
                            beforeWallet={walletCheck}
                            onWalletToken={payWithWallet}
                        />
                        {deposit && (
                            <label className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 text-sm cursor-pointer">
                                <input type="checkbox" className="mt-1 h-4 w-4 accent-[hsl(var(--primary))]" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
                                <span>
                                    I&apos;m paying a 50% deposit today ({money(dueToday)}). I agree the remaining {money(dueLater)} will be
                                    charged to this card on {date ? prettyDate(date) : "my date"}. If anything changes, Ash will refund the difference.
                                </span>
                            </label>
                        )}
                    </div>
                </div>

                {/* Summary */}
                <div>
                    <Card className="lg:sticky lg:top-24">
                        <CardHeader>
                            <CardTitle>Your order</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <ul className="space-y-2 text-sm">
                                {items.map((i) => (
                                    <li key={i.id} className="flex justify-between gap-3">
                                        <span>
                                            {i.product?.name || i.bundle?.name}
                                            <span className="text-muted-foreground">
                                                {" "}× {i.quantity}{i.product?.min_quantity > 1 ? " dozen" : ""}
                                            </span>
                                        </span>
                                        <span className="font-medium">{money(Number(i.product?.price || i.bundle?.price || 0) * i.quantity)}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="border-t border-dashed border-border pt-3 space-y-1.5 text-sm">
                                <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>{money(subtotal)}</span></div>
                                {couponDiscount > 0 && (
                                    <div className="flex justify-between text-green-700"><span>Discount</span><span>-{money(couponDiscount)}</span></div>
                                )}
                                <div className="flex justify-between"><span className="text-muted-foreground">Tax</span><span>{money(taxTotal)}</span></div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">{method === "pickup" ? "Pickup" : "Delivery"}</span>
                                    {method === "pickup" || quote?.deliverable ? (
                                        <span>{deliveryFee > 0 ? money(deliveryFee) : "Free"}</span>
                                    ) : (
                                        <span className="text-muted-foreground">{quote ? "Not available" : "Add your address"}</span>
                                    )}
                                </div>
                                <div className="flex justify-between font-semibold text-base pt-1"><span>Total</span><span>{money(total)}</span></div>
                            </div>
                            {deposit && (
                                <div className="rounded-xl bg-muted p-4 space-y-1.5 text-sm">
                                    <div className="flex justify-between font-semibold text-brand-espresso"><span>Due today (50%)</span><span>{money(dueToday)}</span></div>
                                    <div className="flex justify-between text-muted-foreground">
                                        <span>On {date ? prettyDate(date) : "your date"}</span>
                                        <span>{money(dueLater)}</span>
                                    </div>
                                </div>
                            )}
                            <Button type="submit" size="lg" className="w-full" disabled={submitting}>
                                {submitting ? (
                                    <span className="flex items-center gap-2"><Loader2 className="h-4 w-4 animate-spin" /> Placing order…</span>
                                ) : deposit ? (
                                    `Pay ${money(dueToday)} deposit`
                                ) : (
                                    `Pay ${money(dueToday)}`
                                )}
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </form>
        </div>
    )
}

export default SpecialCheckout
