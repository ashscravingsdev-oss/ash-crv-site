"use client"


import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { CreditCard, Lock } from "lucide-react"
import { useState } from "react"
const Checkout = () => {
    const [step, setStep] = useState(1)
    const [deliveryDay, setDeliveryDay] = useState("")
    const [deliveryTime, setDeliveryTime] = useState("")
    const [paymentMethod, setPaymentMethod] = useState("card")
    const [tip, setTip] = useState("0")

    const subtotal = 49.96
    const deliveryFee = 0
    const tax = 3.99
    const tipAmount = Number.parseFloat(tip)
    const total = subtotal + deliveryFee + tax + tipAmount

    const handleSubmit = (e) => {
        e.preventDefault()
        if (step < 3) {
            setStep(step + 1)
        } else {
            // Submit order
            window.location.href = "/order-confirmation"
        }
    }
    return (
        <div className="container mx-auto px-4 pt-8">
            <h1 className="text-4xl font-bold mb-8">Checkout</h1>

            {/* Progress Indicator */}
            <div className="flex items-center justify-center mb-8">
                <div className="flex items-center gap-2">
                    <div
                        className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
                    >
                        1
                    </div>
                    <div className={`w-16 h-1 ${step >= 2 ? "bg-primary" : "bg-muted"}`} />
                    <div
                        className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
                    >
                        2
                    </div>
                    <div className={`w-16 h-1 ${step >= 3 ? "bg-primary" : "bg-muted"}`} />
                    <div
                        className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 3 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
                    >
                        3
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Checkout Form */}
                <div className="lg:col-span-2">
                    <form onSubmit={handleSubmit}>
                        {step === 1 && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Delivery Information</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="firstName">First Name</Label>
                                            <Input id="firstName" placeholder="John" required />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="lastName">Last Name</Label>
                                            <Input id="lastName" placeholder="Doe" required />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input id="email" type="email" placeholder="john@example.com" required />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Phone Number</Label>
                                        <Input id="phone" type="tel" placeholder="(555) 123-4567" required />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="address">Street Address</Label>
                                        <Input id="address" placeholder="123 Main St" required />
                                    </div>
                                    <div className="grid md:grid-cols-3 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="city">City</Label>
                                            <Input id="city" placeholder="San Francisco" required />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="state">State</Label>
                                            <Select required>
                                                <SelectTrigger id="state">
                                                    <SelectValue placeholder="Select" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="ca">California</SelectItem>
                                                    <SelectItem value="ny">New York</SelectItem>
                                                    <SelectItem value="tx">Texas</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="zip">ZIP Code</Label>
                                            <Input id="zip" placeholder="94102" required />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="instructions">Delivery Instructions (Optional)</Label>
                                        <Input id="instructions" placeholder="Leave at front door" />
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {step === 2 && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Delivery Schedule</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="space-y-2">
                                        <Label>Delivery Day</Label>
                                        <RadioGroup value={deliveryDay} onValueChange={setDeliveryDay} required>
                                            <div className="flex items-center space-x-2 border border-border rounded-lg p-4">
                                                <RadioGroupItem value="monday" id="monday" />
                                                <Label htmlFor="monday" className="flex-1 cursor-pointer">
                                                    <div className="font-semibold">Monday</div>
                                                    <div className="text-sm text-muted-foreground">Next available: Dec 23, 2024</div>
                                                </Label>
                                            </div>
                                            <div className="flex items-center space-x-2 border border-border rounded-lg p-4">
                                                <RadioGroupItem value="tuesday" id="tuesday" />
                                                <Label htmlFor="tuesday" className="flex-1 cursor-pointer">
                                                    <div className="font-semibold">Tuesday</div>
                                                    <div className="text-sm text-muted-foreground">Next available: Dec 24, 2024</div>
                                                </Label>
                                            </div>
                                        </RadioGroup>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="deliveryTime">Delivery Time</Label>
                                        <Select value={deliveryTime} onValueChange={setDeliveryTime} required>
                                            <SelectTrigger id="deliveryTime">
                                                <SelectValue placeholder="Select time window" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="10-12">10:00 AM - 12:00 PM</SelectItem>
                                                <SelectItem value="12-2">12:00 PM - 2:00 PM</SelectItem>
                                                <SelectItem value="2-4">2:00 PM - 4:00 PM</SelectItem>
                                                <SelectItem value="4-7">4:00 PM - 7:00 PM</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Add a Tip for Your Driver</Label>
                                        <RadioGroup value={tip} onValueChange={setTip}>
                                            <div className="grid grid-cols-4 gap-2">
                                                <div
                                                    className={`border border-border rounded-lg p-3 text-center cursor-pointer ${tip === "0" ? "bg-primary text-primary-foreground" : ""}`}
                                                    onClick={() => setTip("0")}
                                                >
                                                    <RadioGroupItem value="0" id="tip-0" className="sr-only" />
                                                    <div className="font-semibold">No Tip</div>
                                                </div>
                                                <div
                                                    className={`border border-border rounded-lg p-3 text-center cursor-pointer ${tip === "2" ? "bg-primary text-primary-foreground" : ""}`}
                                                    onClick={() => setTip("2")}
                                                >
                                                    <RadioGroupItem value="2" id="tip-2" className="sr-only" />
                                                    <div className="font-semibold">$2</div>
                                                </div>
                                                <div
                                                    className={`border border-border rounded-lg p-3 text-center cursor-pointer ${tip === "5" ? "bg-primary text-primary-foreground" : ""}`}
                                                    onClick={() => setTip("5")}
                                                >
                                                    <RadioGroupItem value="5" id="tip-5" className="sr-only" />
                                                    <div className="font-semibold">$5</div>
                                                </div>
                                                <div
                                                    className={`border border-border rounded-lg p-3 text-center cursor-pointer ${tip === "10" ? "bg-primary text-primary-foreground" : ""}`}
                                                    onClick={() => setTip("10")}
                                                >
                                                    <RadioGroupItem value="10" id="tip-10" className="sr-only" />
                                                    <div className="font-semibold">$10</div>
                                                </div>
                                            </div>
                                        </RadioGroup>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {step === 3 && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Payment Method</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                                        <div className="flex items-center space-x-2 border border-border rounded-lg p-4">
                                            <RadioGroupItem value="card" id="card" />
                                            <Label htmlFor="card" className="flex-1 cursor-pointer flex items-center gap-2">
                                                <CreditCard className="h-5 w-5" />
                                                <span className="font-semibold">Credit / Debit Card</span>
                                            </Label>
                                        </div>
                                        <div className="flex items-center space-x-2 border border-border rounded-lg p-4">
                                            <RadioGroupItem value="apple" id="apple" />
                                            <Label htmlFor="apple" className="flex-1 cursor-pointer">
                                                <span className="font-semibold">Apple Pay</span>
                                            </Label>
                                        </div>
                                        <div className="flex items-center space-x-2 border border-border rounded-lg p-4">
                                            <RadioGroupItem value="google" id="google" />
                                            <Label htmlFor="google" className="flex-1 cursor-pointer">
                                                <span className="font-semibold">Google Pay</span>
                                            </Label>
                                        </div>
                                    </RadioGroup>

                                    {paymentMethod === "card" && (
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="cardNumber">Card Number</Label>
                                                <Input id="cardNumber" placeholder="1234 5678 9012 3456" required />
                                            </div>
                                            <div className="grid md:grid-cols-3 gap-4">
                                                <div className="space-y-2 md:col-span-2">
                                                    <Label htmlFor="expiry">Expiry Date</Label>
                                                    <Input id="expiry" placeholder="MM / YY" required />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="cvv">CVV</Label>
                                                    <Input id="cvv" placeholder="123" required />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="cardName">Cardholder Name</Label>
                                                <Input id="cardName" placeholder="John Doe" required />
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Lock className="h-4 w-4" />
                                        <span>Your payment information is encrypted and secure</span>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        <div className="flex gap-4 mt-6">
                            {step > 1 && (
                                <Button type="button" variant="outline" onClick={() => setStep(step - 1)} className="flex-1">
                                    Back
                                </Button>
                            )}
                            <Button type="submit" className="flex-1">
                                {step === 3 ? "Place Order" : "Continue"}
                            </Button>
                        </div>
                    </form>
                </div>

                {/* Order Summary Sidebar */}
                <div className="lg:col-span-1">
                    <Card className="sticky top-20">
                        <CardHeader>
                            <CardTitle>Order Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Subtotal</span>
                                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Delivery Fee</span>
                                    <span className="font-medium text-primary">FREE</span>
                                </div>
                                {tipAmount > 0 && (
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Driver Tip</span>
                                        <span className="font-medium">${tipAmount.toFixed(2)}</span>
                                    </div>
                                )}
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Tax</span>
                                    <span className="font-medium">${tax.toFixed(2)}</span>
                                </div>
                            </div>

                            <Separator />

                            <div className="flex justify-between text-lg font-bold">
                                <span>Total</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default Checkout

