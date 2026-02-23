"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CreditCard, Lock, Apple, Chrome } from "lucide-react"

const PaymentMethod = ({
    paymentMethod,
    setPaymentMethod,
    cardDetails,
    onCardDetailsChange
}) => {
    const formatCardNumber = (value) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        const matches = v.match(/\d{4,16}/g);
        const match = (matches && matches[0]) || '';
        const parts = [];
        for (let i = 0; i < match.length; i += 4) {
            parts.push(match.substring(i, i + 4));
        }
        return parts.length ? parts.join(' ') : value;
    };

    const handleCardNumberChange = (e) => {
        const formatted = formatCardNumber(e.target.value);
        onCardDetailsChange('cardNumber', formatted);
    };

    const handleExpiryChange = (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.slice(0, 2) + ' / ' + value.slice(2, 4);
        }
        onCardDetailsChange('expiry', value);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Payment Method</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    {/* Credit Card Option */}
                    <div className={`flex items-center space-x-2 border rounded-lg p-4 mb-3 transition-all ${paymentMethod === "card"
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}>
                        <RadioGroupItem value="card" id="card" />
                        <Label htmlFor="card" className="flex-1 cursor-pointer flex items-center gap-2">
                            <CreditCard className="h-5 w-5" />
                            <span className="font-semibold">Credit / Debit Card</span>
                        </Label>
                    </div>

                    {/* Apple Pay Option */}
                    <div className={`flex items-center space-x-2 border rounded-lg p-4 mb-3 transition-all ${paymentMethod === "apple"
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}>
                        <RadioGroupItem value="apple" id="apple" />
                        <Label htmlFor="apple" className="flex-1 cursor-pointer flex items-center gap-2">
                            <Apple className="h-5 w-5" />
                            <span className="font-semibold">Apple Pay</span>
                        </Label>
                    </div>

                    {/* Google Pay Option */}
                    <div className={`flex items-center space-x-2 border rounded-lg p-4 transition-all ${paymentMethod === "google"
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}>
                        <RadioGroupItem value="google" id="google" />
                        <Label htmlFor="google" className="flex-1 cursor-pointer flex items-center gap-2">
                            <Chrome className="h-5 w-5" />
                            <span className="font-semibold">Google Pay</span>
                        </Label>
                    </div>
                </RadioGroup>

                {/* Credit Card Form */}
                {paymentMethod === "card" && (
                    <div className="space-y-4 mt-6">
                        <div className="space-y-2">
                            <Label htmlFor="cardNumber">Card Number *</Label>
                            <Input
                                id="cardNumber"
                                placeholder="1234 5678 9012 3456"
                                value={cardDetails.cardNumber}
                                onChange={handleCardNumberChange}
                                maxLength="19"
                                required
                            />
                        </div>

                        <div className="grid md:grid-cols-3 gap-4">
                            <div className="space-y-2 md:col-span-2">
                                <Label htmlFor="expiry">Expiry Date *</Label>
                                <Input
                                    id="expiry"
                                    placeholder="MM / YY"
                                    value={cardDetails.expiry}
                                    onChange={handleExpiryChange}
                                    maxLength="9"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="cvv">CVV *</Label>
                                <Input
                                    id="cvv"
                                    placeholder="123"
                                    value={cardDetails.cvv}
                                    onChange={(e) => onCardDetailsChange('cvv', e.target.value)}
                                    maxLength="4"
                                    type="password"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="cardName">Cardholder Name *</Label>
                            <Input
                                id="cardName"
                                placeholder="John Doe"
                                value={cardDetails.cardName}
                                onChange={(e) => onCardDetailsChange('cardName', e.target.value)}
                                required
                            />
                        </div>
                    </div>
                )}

                {/* Security Message */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground pt-4 border-t">
                    <Lock className="h-4 w-4" />
                    <span>Your payment information is encrypted and secure</span>
                </div>
            </CardContent>
        </Card>
    );
};

export default PaymentMethod;