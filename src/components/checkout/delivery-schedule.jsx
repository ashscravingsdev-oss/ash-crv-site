"use client"

import { useEffect, useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, Loader2, RefreshCw, AlertTriangle, Info } from "lucide-react"
import { toast } from "sonner"

// ---------- Helpers ----------

const formatTime = (timeString) => {
    if (!timeString) return ""
    const [hours, minutes] = timeString.split(":")
    const h = parseInt(hours, 10)
    const ampm = h >= 12 ? "PM" : "AM"
    const displayHour = h % 12 || 12
    return `${displayHour}:${minutes} ${ampm}`
}

const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    })
}

// Next occurrence of a weekday (0-6) after a given date, without time
const getNextDayOfWeek = (dayName, afterDate = new Date()) => {
    const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]
    const targetDay = days.indexOf(dayName.toLowerCase())
    const from = new Date(afterDate)
    // Start from the next day to avoid today if already passed
    from.setDate(from.getDate() + 1)
    from.setHours(0, 0, 0, 0)
    const currentDay = from.getDay()
    let daysUntilTarget = targetDay - currentDay
    if (daysUntilTarget < 0) daysUntilTarget += 7
    const result = new Date(from)
    result.setDate(from.getDate() + daysUntilTarget)
    return result
}

// Get this week's cutoff date (the upcoming occurrence)
const getThisWeekCutoff = (cutoffDay, cutoffTime) => {
    const now = new Date()
    const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]
    const targetDay = days.indexOf(cutoffDay.toLowerCase())
    const todayDay = now.getDay()
    let daysUntilTarget = targetDay - todayDay
    if (daysUntilTarget < 0) daysUntilTarget += 7
    const cutoffDate = new Date(now)
    cutoffDate.setDate(now.getDate() + daysUntilTarget)
    const [hours, minutes, seconds] = cutoffTime.split(":").map(Number)
    cutoffDate.setHours(hours, minutes, seconds, 0)
    return cutoffDate
}

const DeliverySchedule = ({
    deliveryDay,
    setDeliveryDay,
    deliveryTime,
    setDeliveryTime,
    tip,
    setTip,
    frequency,
    setFrequency
}) => {
    const [loading, setLoading] = useState(true)
    const [timeRules, setTimeRules] = useState([])        // active delivery day rules
    const [cutoffRule, setCutoffRule] = useState(null)    // active cutoff rule
    const [availableDays, setAvailableDays] = useState([]) // upcoming delivery days
    const [timeSlots, setTimeSlots] = useState([])        // slots for selected day
    const [isWeekOpen, setIsWeekOpen] = useState(true)    // true if current week still open

    const tipOptions = [
        { value: "0", label: "No Tip" },
        { value: "2", label: "$2" },
        { value: "5", label: "$5" },
        { value: "10", label: "$10" },
        { value: "15", label: "$15" }
    ]

    // ---------- Fetch rules & cutoff ----------
    useEffect(() => {
        const fetchRules = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/delivery/time-rules`)
                const data = await res.json()
                if (!data.rules || data.rules.length === 0) {
                    toast.error("No delivery slots available")
                    setLoading(false)
                    return
                }
                // active time rules
                const activeRules = data.rules.filter(r => r.is_active)
                if (activeRules.length === 0) {
                    toast.error("No active delivery time rules found")
                    setLoading(false)
                    return
                }
                setTimeRules(activeRules)
                // active cutoff rule
                const cutoff = data.cutoff_rule
                if (cutoff && cutoff.is_active) {
                    setCutoffRule(cutoff)
                } else {
                    // If no active cutoff, treat as always open
                    setCutoffRule(null)
                }
            } catch (err) {
                console.error("Failed to load delivery rules", err)
                toast.error("Could not load delivery schedule")
            } finally {
                setLoading(false)
            }
        }
        fetchRules()
    }, [])

    // ---------- Compute available delivery days ----------
    useEffect(() => {
        if (timeRules.length === 0) return

        const now = new Date()
        let startAfter = now
        let weekOpen = true

        if (cutoffRule) {
            const thisWeekCutoff = getThisWeekCutoff(cutoffRule.cutoff_day, cutoffRule.cutoff_time)
            weekOpen = now < thisWeekCutoff
            setIsWeekOpen(weekOpen)
            if (!weekOpen) {
                // Week closed: start from the day after the cutoff
                const dayAfter = new Date(thisWeekCutoff)
                dayAfter.setDate(dayAfter.getDate() + 1)
                dayAfter.setHours(0, 0, 0, 0)
                startAfter = dayAfter
            }
        } else {
            setIsWeekOpen(true)
        }

        // Build upcoming delivery days
        const upcoming = timeRules.map(rule => {
            const nextDate = getNextDayOfWeek(rule.delivery_day, startAfter)
            return {
                value: rule.delivery_day,         // e.g., "monday"
                label: rule.delivery_day.charAt(0).toUpperCase() + rule.delivery_day.slice(1),
                date: formatDate(nextDate),
                fullDate: nextDate,
                time_start: rule.time_start,
                time_end: rule.time_end,
                ruleId: rule.id,
            }
        }).sort((a, b) => a.fullDate - b.fullDate)

        // Limit to first 4 upcoming days for clarity
        setAvailableDays(upcoming.slice(0, 4))
    }, [timeRules, cutoffRule])

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
                    <CardTitle>Delivery Schedule</CardTitle>
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
                    <CardTitle>Delivery Schedule</CardTitle>
                </CardHeader>
                <CardContent className="py-8 text-center">
                    <AlertTriangle className="mx-auto h-8 w-8 text-yellow-500 mb-2" />
                    <p className="text-muted-foreground">Delivery is currently unavailable.</p>
                </CardContent>
            </Card>
        )
    }

    // ---------- Cutoff display ----------
    const cutoffDisplay = cutoffRule ? (
        <div className={`p-4 rounded-lg flex items-start gap-3 ${isWeekOpen ? "bg-green-50 border border-green-200" : "bg-amber-50 border border-amber-200"
            }`}>
            {isWeekOpen ? (
                <Clock className="w-5 h-5 text-green-600 mt-0.5" />
            ) : (
                <Info className="w-5 h-5 text-amber-600 mt-0.5" />
            )}
            <div>
                <p className={`text-sm font-semibold ${isWeekOpen ? "text-green-800" : "text-amber-800"}`}>
                    {isWeekOpen ? "Order now for this week's delivery" : "Next week delivery window"}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                    Orders placed after {cutoffRule.cutoff_day.charAt(0).toUpperCase() + cutoffRule.cutoff_day.slice(1)} at {formatTime(cutoffRule.cutoff_time)} will be delivered the following week.
                </p>
            </div>
        </div>
    ) : null

    return (
        <Card>
            <CardHeader>
                <CardTitle>Delivery Schedule</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Cutoff notice */}
                {cutoffDisplay}

                {/* Delivery Day */}
                <div className="space-y-3">
                    <Label className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Delivery Day *
                    </Label>
                    <RadioGroup value={deliveryDay} onValueChange={setDeliveryDay} required>
                        <div className="grid gap-3">
                            {availableDays.map((day) => (
                                <div
                                    key={day.value}
                                    className="flex items-center space-x-2 border border-border rounded-lg p-4 hover:border-primary transition-colors"
                                >
                                    <RadioGroupItem value={day.value} id={day.value} />
                                    <Label htmlFor={day.value} className="flex-1 cursor-pointer">
                                        <div className="font-semibold">{day.label}</div>
                                        <div className="text-sm text-muted-foreground">
                                            {day.date}
                                        </div>
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </RadioGroup>
                    {availableDays.length === 0 && (
                        <p className="text-sm text-muted-foreground">No delivery days available at the moment.</p>
                    )}
                </div>

                {/* Delivery Time – one-hour slots for the selected day */}
                <div className="space-y-3">
                    <Label className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        Delivery Time *
                    </Label>
                    {timeSlots.length > 0 ? (
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
                    ) : (
                        <p className="text-sm text-muted-foreground">
                            Select a delivery day to see available time slots.
                        </p>
                    )}
                    <p className="text-xs text-muted-foreground">
                        Choose a one-hour window for your delivery.
                    </p>
                </div>

                {/* Delivery Frequency */}
                <div className="space-y-3">
                    <Label className="flex items-center gap-2">
                        <RefreshCw className="w-4 h-4" />
                        Delivery Frequency *
                    </Label>
                    <RadioGroup value={frequency} onValueChange={setFrequency}>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                            {[
                                { value: "one-time", label: "One-time" },
                                { value: "weekly", label: "Weekly" },
                                { value: "biweekly", label: "Bi-Weekly" },
                                { value: "monthly", label: "Monthly" }
                            ].map((option) => (
                                <Label
                                    key={option.value}
                                    htmlFor={`freq-${option.value}`}
                                    className={`border border-border rounded-lg p-3 text-center cursor-pointer transition-all ${frequency === option.value
                                            ? "bg-primary text-primary-foreground border-primary"
                                            : "hover:border-primary/50"
                                        }`}
                                >
                                    <RadioGroupItem
                                        value={option.value}
                                        id={`freq-${option.value}`}
                                        className="sr-only"
                                    />
                                    <div className="font-semibold text-sm">{option.label}</div>
                                </Label>
                            ))}
                        </div>
                    </RadioGroup>
                </div>

                {/* Tip */}
                <div className="space-y-3">
                    <Label>Add a Tip for Your Driver</Label>
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