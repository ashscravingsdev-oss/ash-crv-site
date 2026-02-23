"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

const OrderSummary = ({ subtotal, discount, tipAmount, tax, total }) => {
    return (
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
                        <div className="flex justify-between text-sm text-green-600">
                            <span>Discount  </span>
                            <span>-${discount.toFixed(2)}</span>
                        </div>
                        {tipAmount > 0 && (
                            <div className="flex justify-between text-sm text-green-600">
                                <span >Driver Tip</span>
                                <span >${tipAmount.toFixed(2)}</span>
                            </div>
                        )}
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Delivery Fee</span>
                            <span className="font-medium text-primary">FREE</span>
                        </div>
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
    )
}

export default OrderSummary
