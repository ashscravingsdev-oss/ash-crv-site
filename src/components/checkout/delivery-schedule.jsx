"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock } from "lucide-react"

const DeliverySchedule = ({
    deliveryDay,
    setDeliveryDay,
    deliveryTime,
    setDeliveryTime,
    tip,
    setTip
}) => {
    // These would come from API in real app
    const availableDays = [
        { value: "monday", label: "Monday", date: "Dec 23, 2024" },
        { value: "tuesday", label: "Tuesday", date: "Dec 24, 2024" },
        { value: "wednesday", label: "Wednesday", date: "Dec 25, 2024" }
    ];

    const timeSlots = [
        { value: "10-12", label: "10:00 AM - 12:00 PM" },
        { value: "12-2", label: "12:00 PM - 2:00 PM" },
        { value: "2-4", label: "2:00 PM - 4:00 PM" },
        { value: "4-7", label: "4:00 PM - 7:00 PM" }
    ];

    const tipOptions = [
        { value: "0", label: "No Tip" },
        { value: "2", label: "$2" },
        { value: "5", label: "$5" },
        { value: "10", label: "$10" },
        { value: "15", label: "$15" }
    ];

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
                                <div key={day.value} className="flex items-center space-x-2 border border-border rounded-lg p-4 hover:border-primary transition-colors">
                                    <RadioGroupItem value={day.value} id={day.value} />
                                    <Label htmlFor={day.value} className="flex-1 cursor-pointer">
                                        <div className="font-semibold">{day.label}</div>
                                        <div className="text-sm text-muted-foreground">
                                            Next available: {day.date}
                                        </div>
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </RadioGroup>
                </div>

                {/* Delivery Time */}
                <div className="space-y-3">
                    <Label className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        Delivery Time *
                    </Label>
                    <Select value={deliveryTime} onValueChange={setDeliveryTime} required>
                        <SelectTrigger>
                            <SelectValue placeholder="Select time window" />
                        </SelectTrigger>
                        <SelectContent>
                            {timeSlots.map((slot) => (
                                <SelectItem key={slot.value} value={slot.value}>
                                    {slot.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Tip */}
                <div className="space-y-3">
                    <Label>Add a Tip for Your Driver</Label>
                    <RadioGroup value={tip} onValueChange={setTip}>
                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                            {tipOptions.map((option) => (
                                <div
                                    key={option.value}
                                    className={`border border-border rounded-lg p-3 text-center cursor-pointer transition-all ${tip === option.value
                                            ? "bg-primary text-primary-foreground border-primary"
                                            : "hover:border-primary/50"
                                        }`}
                                    onClick={() => setTip(option.value)}
                                >
                                    <RadioGroupItem value={option.value} id={`tip-${option.value}`} className="sr-only" />
                                    <div className="font-semibold text-sm">{option.label}</div>
                                </div>
                            ))}
                        </div>
                    </RadioGroup>
                </div>
            </CardContent>
        </Card>
    );
};

export default DeliverySchedule;