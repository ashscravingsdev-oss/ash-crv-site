"use client"

import { useEffect, useRef, useState } from "react"
import Cookies from "js-cookie"
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
import PaymentMethod from "./payment-method"
import {
    CHRISTMAS_DAYS,
    CHRISTMAS_WINDOW,
    DEPOSIT_RATE,
    FREE_DELIVERY_MILES,
    cartHasChristmas,
    cartHasDeposit,
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

const PICKUP_ADDRESS = "Pickup in Eastvale, CA (I'll text you the address)"

const Choice = ({ selected, onClick, icon: Icon, title, text }) => (
    <button
        type="button"
        onClick={onClick}
        aria-pressed={selected}
        className={`flex-1 text-left rounded-xl border p-4 transition-colors ${
            selected ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-border hover:border-brand-tobacco"
        }`}
    >
        <span className="flex items-center gap-2 font-semibold text-brand-espresso">
            <Icon className="h-4 w-4 text-primary" /> {title}
        </span>
        <span className="block text-sm text-muted-foreground mt-1">{text}</span>
    </button>
)

/**
 * Checkout for desserts, cakes and custom items. No account needed: guests give
 * their name, email and phone. 50% today, the rest charged on the date they pick.
 */
const SpecialCheckout = ({ cart, items, subtotal, taxTotal, couponDiscount, currentUser }) => {
    const isLoggedIn = !!currentUser
    const mapRef = useRef(null)
    const mapboxAccessToken = process.env.NEXT_PUBLIC_MAP_BOX_ACCESS_TOKEN

    const lead = Math.max(1, leadDaysFor(items))
    const earliest = dateFromToday(lead)

    // Christmas mini cakes only go out on Ash's December days
    const christmas = cartHasChristmas(items)
    const christmasDays = christmas ? CHRISTMAS_DAYS.filter((d) => d >= earliest) : []
    const minDate = christmas && CHRISTMAS_WINDOW.from > earliest ? CHRISTMAS_WINDOW.from : earliest
    const maxDate = christmas ? CHRISTMAS_WINDOW.to : undefined

    const [guest, setGuest] = useState({ name: "", email: "", phone: "" })
    const [method, setMethod] = useState("delivery")
    const [addressData, setAddressData] = useState({ address: "", latitude: null, longitude: null })
    const [distance, setDistance] = useState(null) // { miles, deliverable } | null
    const [checking, setChecking] = useState(false)
    const [date, setDate] = useState("")
    const [timeSlot, setTimeSlot] = useState(TIME_WINDOWS[1].value)
    const [notes, setNotes] = useState("")
    const [agree, setAgree] = useState(false)
    const [square, setSquare] = useState(null)
    const [submitting, setSubmitting] = useState(false)

    const total = Math.max(0, subtotal + taxTotal - (couponDiscount || 0))
    const deposit = cartHasDeposit(items)
    const dueToday = deposit ? Math.round(total * DEPOSIT_RATE * 100) / 100 : total
    const dueLater = Math.round((total - dueToday) * 100) / 100

    // Check the free-delivery radius as soon as an address is picked
    useEffect(() => {
        if (method !== "delivery" || !addressData.latitude || !addressData.longitude) {
            setDistance(null)
            return
        }
        let alive = true
        setChecking(true)
        apiRequest("/delivery/special-check", {
            method: "POST",
            body: JSON.stringify({ latitude: addressData.latitude, longitude: addressData.longitude }),
        })
            .then((d) => alive && setDistance(d))
            .catch(() => alive && setDistance(null))
            .finally(() => alive && setChecking(false))
        return () => {
            alive = false
        }
    }, [method, addressData.latitude, addressData.longitude])

    const missing = () => {
        if (!isLoggedIn) {
            if (!guest.name.trim()) return "Please add your name"
            if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(guest.email.trim())) return "Please add a valid email"
            if (guest.phone.replace(/\D/g, "").length < 10) return "Please add your phone number"
        }
        if (!date) return "Please pick your date"
        if (christmasDays.length && !christmasDays.includes(date)) return "Please pick one of my Christmas pickup days"
        if (date < minDate) return `Please pick ${prettyDate(minDate)} or later`
        if (maxDate && date > maxDate) return `Please pick a day by ${prettyDate(maxDate)}`
        if (method === "delivery") {
            if (!addressData.address || !addressData.latitude) return "Please choose your delivery address on the map"
            if (distance && !distance.deliverable) return `Free delivery is within ${FREE_DELIVERY_MILES} miles. Please choose pickup.`
        }
        if (!square) return "The card form is still loading"
        if (deposit && !agree) return "Please check the box about your remaining balance"
        return null
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
                cardToken: card.token,
                totals: { subtotal, tax: taxTotal, discount: couponDiscount || 0, tipAmount: 0, total },
            }
            const result = await apiRequest("/checkout/create-order", { method: "POST", body: JSON.stringify(body) })
            const key = result.order?.viewKey ? `&key=${encodeURIComponent(result.order.viewKey)}` : ""
            window.location.href = `/order-confirmation?orderId=${result.order.id}${key}`
        } catch (err) {
            console.error("Order submission error:", err)
            toast.error(err?.message || "Something went wrong placing your order. Please try again.")
            setSubmitting(false)
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
                                    {christmasDays.length ? (
                                        <div className="flex flex-col gap-2">
                                            {christmasDays.map((d) => (
                                                <button
                                                    key={d}
                                                    type="button"
                                                    onClick={() => setDate(d)}
                                                    aria-pressed={date === d}
                                                    className={`rounded-lg border px-3 py-2 text-sm text-left ${
                                                        date === d ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-brand-tobacco"
                                                    }`}
                                                >
                                                    {prettyDate(d)}
                                                </button>
                                            ))}
                                        </div>
                                    ) : (
                                        <Input id="s-date" type="date" min={minDate} max={maxDate} value={date} onChange={(e) => setDate(e.target.value)} required />
                                    )}
                                    <p className="text-xs text-muted-foreground">
                                        {christmas
                                            ? christmasDays.length
                                                ? "Christmas cakes are ready on these two days. Pick the one you'd like."
                                                : "Christmas cakes are ready on two days in December. Pick the day you'd like and I'll text you to confirm."
                                            : <>{lead} days&apos; notice, so {prettyDate(earliest)} or later. Need it sooner? Message me!</>}
                                    </p>
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
                                    text={`Free within ${FREE_DELIVERY_MILES} miles of Eastvale`}
                                />
                                <Choice
                                    selected={method === "pickup"}
                                    onClick={() => setMethod("pickup")}
                                    icon={Store}
                                    title="Pickup"
                                    text="In Eastvale. I'll text you the address"
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
                                    {checking && <p className="text-sm text-muted-foreground flex items-center gap-2"><Loader2 className="h-3.5 w-3.5 animate-spin" /> Checking distance…</p>}
                                    {!checking && distance && distance.deliverable && (
                                        <p className="text-sm text-green-700 flex items-center gap-2">
                                            <CheckCircle2 className="h-4 w-4" /> About {distance.miles} miles away. Delivery is free!
                                        </p>
                                    )}
                                    {!checking && distance && !distance.deliverable && (
                                        <p className="text-sm text-destructive flex items-center gap-2">
                                            <AlertTriangle className="h-4 w-4" /> That&apos;s about {Math.round(distance.miles)} miles away. Free delivery is
                                            within {FREE_DELIVERY_MILES} miles, so please choose pickup or message me.
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
                        <PaymentMethod onSquareReady={setSquare} onPaymentError={(m) => toast.error(m || "Payment system error")} />
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
                                <div className="flex justify-between"><span className="text-muted-foreground">{method === "pickup" ? "Pickup" : "Delivery"}</span><span>Free</span></div>
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
