"use client"

import Link from "next/link"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FREQUENCIES, frequencyLabel } from "@/lib/order-frequency"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, Loader2, RefreshCw, AlertTriangle, Info, Zap, ShieldCheck, Truck } from "lucide-react"
import { toast } from "sonner"
import { apiRequest } from "@/lib/apiRequest"
import { nextMealPrepDate, rolledToNextWeek, prettyMealDate } from "@/lib/meal-prep-dates"

// ---------- Helpers ----------

const formatTime = (timeString) => {
    if (!timeString) return ""
    const [hours, minutes] = timeString.split(":")
    const h = parseInt(hours, 10)
    const ampm = h >= 12 ? "PM" : "AM"
    const displayHour = h % 12 || 12
    return `${displayHour}:${minutes} ${ampm}`
}

const capitalize = (word) => word.charAt(0).toUpperCase() + word.slice(1)

const DeliverySchedule = ({
    deliveryDay,
    setDeliveryDay,
    deliveryTime,
    setDeliveryTime,
    tip,
    setTip,
    frequency,
    setFrequency,
    canSubscribe = true,
    deliveryFee,
    rushFee,
    requiresAdminApproval,
    freeDeliveryThreshold,
    isRush,
    setIsRush,
    feeLoading,
    pickup = false,
    onDateChange,
}) => {
    // Pickup uses the same days and time windows as delivery; only the words change
    const how = pickup ? "pickup" : "delivery"
    const How = pickup ? "Pickup" : "Delivery"

    const [loading, setLoading] = useState(true)
    const [timeRules, setTimeRules] = useState([])
    const [cutoffRule, setCutoffRule] = useState(null)
    const [availableDays, setAvailableDays] = useState([])
    const [timeSlots, setTimeSlots] = useState([])

    const tipOptions = [
        { value: "0", label: "No Tip" },
        { value: "2", label: "$2" },
        { value: "5", label: "$5" },
        { value: "10", label: "$10" },
        { value: "15", label: "$15" }
    ]

    // ---------- Fetch rules ----------
    useEffect(() => {
        const fetchRules = async () => {
            try {
                const data = await apiRequest('/delivery/time-rules');
                if (!data.rules || data.rules.length === 0) {
                    toast.error(`No ${how} slots available`)
                    setLoading(false)
                    return
                }
                const activeRules = data.rules.filter(r => r.is_active)
                if (activeRules.length === 0) {
                    toast.error(`No active ${how} time rules found`)
                    setLoading(false)
                    return
                }
                setTimeRules(activeRules)
                const cutoff = data.cutoff_rule
                if (cutoff && cutoff.is_active) {
                    setCutoffRule(cutoff)
                } else {
                    setCutoffRule(null)
                }
            } catch (err) {
                console.error("Failed to load delivery rules", err)
                toast.error(`Could not load ${how} schedule`)
            } finally {
                setLoading(false)
            }
        }
        fetchRules()
    }, [how])
    // ---------- The date each delivery day goes out next ----------
    // nextMealPrepDate is the one place that knows (weekly cutoff, never today,
    // Pacific time). The order server checks the date against the same rule.
    useEffect(() => {
        if (timeRules.length === 0) return
        const upcoming = timeRules
            .map((rule) => ({
                value: rule.delivery_day,
                label: capitalize(rule.delivery_day),
                date: nextMealPrepDate(rule.delivery_day, cutoffRule), // 'YYYY-MM-DD'
                rolled: rolledToNextWeek(rule.delivery_day, cutoffRule),
                time_start: rule.time_start,
                time_end: rule.time_end,
                ruleId: rule.id,
            }))
            .filter((day) => day.date)
            .sort((a, b) => a.date.localeCompare(b.date))
        setAvailableDays(upcoming.slice(0, 4))
    }, [timeRules, cutoffRule])

    const selectedDay = availableDays.find((d) => d.value === deliveryDay)
    const selectedDate = selectedDay?.date || ""

    // Tell the checkout which date goes with the chosen day
    useEffect(() => {
        onDateChange?.(selectedDate)
    }, [selectedDate, onDateChange])

    // ---------- When selected day changes, regenerate time slots ----------
    useEffect(() => {
        if (!deliveryDay || availableDays.length === 0) {
            setTimeSlots([])
            return
        }
        const selected = availableDays.find(d => d.value === deliveryDay)
        if (!selected) {
            setTimeSlots([])
            return
        }

        const startHour = parseInt(selected.time_start.split(':')[0], 10)
        const endHour = parseInt(selected.time_end.split(':')[0], 10)

        const slots = []
        for (let hour = startHour; hour < endHour; hour++) {
            const start = formatTime(`${hour.toString().padStart(2, '0')}:00:00`)
            const end = formatTime(`${(hour + 1).toString().padStart(2, '0')}:00:00`)
            slots.push(`${start} - ${end}`)
        }
        setTimeSlots(slots)
    }, [deliveryDay, availableDays])

    // ---------- Ensure default selection when data loads ----------
    useEffect(() => {
        if (availableDays.length > 0) {
            const exists = availableDays.some(d => d.value === deliveryDay)
            if (!exists) {
                setDeliveryDay(availableDays[0].value)
            }
        }
    }, [availableDays, deliveryDay, setDeliveryDay])

    useEffect(() => {
        if (timeSlots.length > 0) {
            const exists = timeSlots.includes(deliveryTime)
            if (!exists) {
                setDeliveryTime(timeSlots[0])
            }
        }
    }, [timeSlots, deliveryTime, setDeliveryTime])

    // ---------- Loading state ----------
    if (loading) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>{How} Schedule</CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </CardContent>
            </Card>
        )
    }

    // ---------- No active rules ----------
    if (timeRules.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>{How} Schedule</CardTitle>
                </CardHeader>
                <CardContent className="py-8 text-center">
                    <AlertTriangle className="mx-auto h-8 w-8 text-yellow-500 mb-2" />
                    <p className="text-muted-foreground">{How} is currently unavailable.</p>
                </CardContent>
            </Card>
        )
    }

    // ---------- Cutoff note ----------
    const cutoffWhen = cutoffRule ? `${capitalize(cutoffRule.cutoff_day)} at ${formatTime(cutoffRule.cutoff_time)}` : ""
    const cutoffDisplay = cutoffRule && selectedDay ? (
        <div className={`p-4 rounded-lg flex items-start gap-3 ${selectedDay.rolled ? "bg-amber-50 border border-amber-200" : "bg-green-50 border border-green-200"}`}>
            {selectedDay.rolled ? (
                <Info className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
            ) : (
                <Clock className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
            )}
            <p className={`text-sm ${selectedDay.rolled ? "text-amber-800" : "text-green-800"}`}>
                {selectedDay.rolled
                    ? `This week's orders closed ${cutoffWhen}, so your meals will ${pickup ? "be ready" : "come"} ${prettyMealDate(selectedDate)}.`
                    : `Order by ${cutoffWhen} for ${how} on ${prettyMealDate(selectedDate)}.`}
            </p>
        </div>
    ) : null

    return (
        <Card>
            <CardHeader>
                <CardTitle>{How} Schedule</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                {cutoffDisplay}

                {/* Delivery Fees & Details (delivery only: pickup is free, with no rush option) */}
                {!pickup && deliveryFee !== null && !feeLoading && (
                    <div className="space-y-3 border rounded-lg p-4 bg-muted/30">
                        <Label className="flex items-center gap-2 text-base font-semibold">
                            <Truck className="w-4 h-4" />
                            Delivery Fee Details
                        </Label>

                        <div className="flex justify-between text-sm">
                            <span>Base Delivery Fee</span>
                            <span className="font-medium">${deliveryFee.toFixed(2)}</span>
                        </div>

                        {/* Rush delivery option */}
                        {rushFee > 0 && (
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        id="rush-delivery"
                                        checked={isRush}
                                        onChange={(e) => setIsRush(e.target.checked)}
                                        className="accent-primary w-5 h-5"
                                    />
                                    <Label htmlFor="rush-delivery" className="cursor-pointer">
                                        <span className="flex items-center gap-2">
                                            <Zap className="w-4 h-4 text-amber-500" />
                                            Rush Delivery
                                        </span>
                                        <p className="text-xs text-muted-foreground">
                                            Priority handling, delivered faster
                                        </p>
                                    </Label>
                                </div>
                                <span className="font-medium text-amber-600">+${rushFee.toFixed(2)}</span>
                            </div>
                        )}

                        {/* Free delivery threshold info */}
                        {freeDeliveryThreshold && (
                            <div className="flex items-center gap-2 text-sm text-green-600">
                                <ShieldCheck className="w-4 h-4" />
                                <span>
                                    Free delivery on orders over ${freeDeliveryThreshold.toFixed(2)} in your area.
                                </span>
                            </div>
                        )}

                        {/* Admin approval notice */}
                        {requiresAdminApproval && (
                            <div className="flex items-center gap-2 text-sm text-yellow-600 bg-yellow-50 p-2 rounded-md">
                                <AlertTriangle className="w-4 h-4" />
                                <span>
                                    This delivery zone requires admin approval. Your order will be reviewed before confirmation.
                                </span>
                            </div>
                        )}
                    </div>
                )}

                {/* Delivery Day – compact Select */}
                <div className="space-y-3">
                    <Label className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {How} Day *
                    </Label>
                    <Select value={deliveryDay} onValueChange={setDeliveryDay} required>
                        <SelectTrigger>
                            <SelectValue placeholder={`Select a ${how} day`} />
                        </SelectTrigger>
                        <SelectContent>
                            {availableDays.map(option => (
                                <SelectItem key={option.value} value={option.value}>
                                    {prettyMealDate(option.date)}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {availableDays.length === 0 && (
                        <p className="text-sm text-muted-foreground">No {how} days available.</p>
                    )}
                </div>

                {/* Delivery Time – one-hour slots for the selected day */}
                {/* Delivery Time – one-hour slots for the selected day */}
                <div className="space-y-3">
                    <Label className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {How} Time *
                    </Label>

                    {timeSlots.length > 0 ? (
                        <>
                            <Select value={deliveryTime} onValueChange={setDeliveryTime} required>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a time slot" />
                                </SelectTrigger>
                                <SelectContent>
                                    {timeSlots.map((slot) => (
                                        <SelectItem key={slot} value={slot}>
                                            {slot}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <p className="text-xs text-muted-foreground">
                                Choose a one-hour window for your {how}.
                            </p>
                        </>
                    ) : deliveryDay ? (
                        <p className="text-sm text-amber-600 bg-amber-50 border border-amber-200 p-3 rounded-lg">
                            No available time slots for this day. Please choose another {how} day.
                        </p>
                    ) : (
                        <p className="text-sm text-muted-foreground">
                            Select a {how} day to see available time slots.
                        </p>
                    )}
                </div>

                {/* How often (subscriptions are for bundles only) */}
                <div className="space-y-3">
                    <Label className="flex items-center gap-2">
                        <RefreshCw className="w-4 h-4" />
                        How often? *
                    </Label>
                    <RadioGroup value={frequency} onValueChange={setFrequency}>
                        <div className="grid grid-cols-3 gap-2">
                            {FREQUENCIES.map((option) => {
                                const disabled = option.value !== "one-time" && !canSubscribe
                                return (
                                    <Label
                                        key={option.value}
                                        htmlFor={`freq-${option.value}`}
                                        className={`border border-border rounded-lg p-3 text-center transition-all ${disabled
                                            ? "opacity-40 cursor-not-allowed"
                                            : "cursor-pointer"} ${frequency === option.value
                                            ? "bg-primary text-primary-foreground border-primary"
                                            : disabled ? "" : "hover:border-primary/50"
                                            }`}
                                    >
                                        <RadioGroupItem
                                            value={option.value}
                                            id={`freq-${option.value}`}
                                            disabled={disabled}
                                            className="sr-only"
                                        />
                                        <div className="font-semibold text-sm">{option.label}</div>
                                    </Label>
                                )
                            })}
                        </div>
                    </RadioGroup>
                    {!canSubscribe ? (
                        <p className="text-sm text-muted-foreground">
                            Subscriptions are for <Link href="/bundles" className="underline">bundles</Link>, so you can pick new
                            meals from my menu each week. Single items can be ordered one time.
                        </p>
                    ) : frequency !== "one-time" ? (
                        <p className="text-sm text-muted-foreground">
                            Your bundle repeats {frequencyLabel(frequency)}. Pick new meals from your account before the Sunday
                            cutoff, or I&apos;ll repeat your last picks (with a chef&apos;s choice for anything off the menu).
                            Skip or pause anytime.
                        </p>
                    ) : null}
                </div>

                {/* Tip */}
                <div className="space-y-3">
                    <Label>{pickup ? "Add a Tip" : "Add a Tip for Your Driver"}</Label>
                    <RadioGroup value={tip} onValueChange={setTip}>
                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                            {tipOptions.map((option) => (
                                <Label
                                    key={option.value}
                                    htmlFor={`tip-${option.value}`}
                                    className={`border border-border rounded-lg p-3 text-center cursor-pointer transition-all ${tip === option.value
                                        ? "bg-primary text-primary-foreground border-primary"
                                        : "hover:border-primary/50"
                                        }`}
                                >
                                    <RadioGroupItem
                                        value={option.value}
                                        id={`tip-${option.value}`}
                                        className="sr-only"
                                    />
                                    <div className="font-semibold text-sm">{option.label}</div>
                                </Label>
                            ))}
                        </div>
                    </RadioGroup>
                </div>
            </CardContent>
        </Card>
    )
}

export default DeliverySchedule