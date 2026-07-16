"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, Loader2, RefreshCw } from "lucide-react"
import { toast } from "sonner"

// Helper: format time "HH:MM:SS" to "h:MM AM/PM"
const formatTime = (timeString) => {
    if (!timeString) return ""
    const [hours, minutes] = timeString.split(":")
    const h = parseInt(hours, 10)
    const ampm = h >= 12 ? "PM" : "AM"
    const displayHour = h % 12 || 12
    return `${displayHour}:${minutes} ${ampm}`
}

// Helper: get the next occurrence of a day of week after a given date
const getNextDayOfWeek = (dayName, afterDate = new Date()) => {
    const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]
    const targetDay = days.indexOf(dayName.toLowerCase())
    const today = new Date(afterDate)
    const currentDay = today.getDay() // 0-6
    let daysUntilTarget = targetDay - currentDay
    if (daysUntilTarget <= 0) daysUntilTarget += 7 // next week if today or past
    const resultDate = new Date(today)
    resultDate.setDate(today.getDate() + daysUntilTarget)
    return resultDate
}

// Format date like "Dec 23, 2024"
const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    })
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
    const [availableDays, setAvailableDays] = useState([])
    const [timeSlots, setTimeSlots] = useState([]) // array of slot strings

    const tipOptions = [
        { value: "0", label: "No Tip" },
        { value: "2", label: "$2" },
        { value: "5", label: "$5" },
        { value: "10", label: "$10" },
        { value: "15", label: "$15" }
    ]

    useEffect(() => {
        const fetchRules = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/delivery/time-rules`)
                const data = await res.json()
                if (!data.rules || data.rules.length === 0) {
                    toast.error("No delivery slots available")
                    return
                }

                // Extract unique days
                const uniqueDays = [...new Set(data.rules.map(r => r.delivery_day))]

                // Build one-hour slots from the first rule (time is same for all days)
                const firstRule = data.rules[0]
                const startHour = parseInt(firstRule.time_start.split(':')[0], 10)
                const endHour = parseInt(firstRule.time_end.split(':')[0], 10)

                const slots = []
                for (let hour = startHour; hour < endHour; hour++) {
                    const start = formatTime(`${hour.toString().padStart(2, '0')}:00:00`)
                    const end = formatTime(`${(hour + 1).toString().padStart(2, '0')}:00:00`)
                    slots.push(`${start} - ${end}`)
                }
                setTimeSlots(slots)

                // Build available delivery dates (skip today, next occurrences)
                const today = new Date()
                const upcoming = uniqueDays.map(day => {
                    const date = getNextDayOfWeek(day, today)
                    return {
                        value: day,
                        label: day.charAt(0).toUpperCase() + day.slice(1),
                        date: formatDate(date),
                        fullDate: date,
                    }
                }).sort((a, b) => a.fullDate - b.fullDate)

                // Keep only the first 3 upcoming dates for clarity
                setAvailableDays(upcoming.slice(0, 3))
            } catch (err) {
                console.error("Failed to load delivery rules", err)
                toast.error("Could not load delivery schedule")
            } finally {
                setLoading(false)
            }
        }

        fetchRules()
    }, [])

    // When available days change, reset day selection if current day is no longer valid
    useEffect(() => {
        if (availableDays.length > 0) {
            const exists = availableDays.some(d => d.value === deliveryDay)
            if (!exists) {
                setDeliveryDay(availableDays[0]?.value || "")
            }
        }
    }, [availableDays, deliveryDay, setDeliveryDay])

    // When time slots load, set the default selection if none exists or current is invalid
    useEffect(() => {
        if (timeSlots.length > 0) {
            const exists = timeSlots.includes(deliveryTime)
            if (!exists) {
                setDeliveryTime(timeSlots[0]) // default to first slot
            }
        }
    }, [timeSlots, deliveryTime, setDeliveryTime])

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

    return (
        <Card>
            <CardHeader>
                <CardTitle>Delivery Schedule</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
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
                </div>

                {/* Delivery Time – one-hour slots */}
                <div className="space-y-3">
                    <Label className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        Delivery Time *
                    </Label>
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
                        Choose a one-hour window for your delivery.
                    </p>
                </div>

                {/* ── Frequency Selector (NEW) ── */}
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