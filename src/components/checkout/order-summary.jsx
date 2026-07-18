"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Info } from "lucide-react"

const OrderSummary = ({
    subtotal,
    discount,
    tax,
    tipAmount,
    deliveryFee,
    total,
    rushFee = 0,
    freeDeliveryThreshold = null,
    requiresAdminApproval = false,
    isFreeDeliveryCoupon = false,
    coupon = null,
}) => {
    return (
        <div className="lg:col-span-1">
            <Card className="sticky top-20">
                <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-3">
                        {/* Subtotal */}
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Subtotal</span>
                            <span className="font-medium">${subtotal.toFixed(2)}</span>
                        </div>

                        {/* Discount (if any) */}
                        {discount > 0 && (
                            <div className="flex justify-between text-sm text-green-600">
                                <span>Discount</span>
                                <span>-${discount.toFixed(2)}</span>
                            </div>
                        )}

                        {/* Driver Tip */}
                        {tipAmount > 0 && (
                            <div className="flex justify-between text-sm text-green-600">
                                <span>Driver Tip</span>
                                <span>${tipAmount.toFixed(2)}</span>
                            </div>
                        )}

                        {/* Delivery Fee – handle free delivery coupon */}
                        {deliveryFee !== null && deliveryFee !== undefined && (
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">
                                    {isFreeDeliveryCoupon
                                        ? "Delivery Fee (Coupon)"
                                        : deliveryFee === 0
                                            ? "Delivery Fee (FREE)"
                                            : "Delivery Fee"}
                                </span>
                                <span className="font-medium">
                                    {deliveryFee === 0 ? (
                                        <span className="text-green-600">FREE</span>
                                    ) : (
                                        `$${deliveryFee.toFixed(2)}`
                                    )}
                                </span>
                            </div>
                        )}

                        {/* Free delivery coupon note */}
                        {isFreeDeliveryCoupon && coupon && (
                            <div className="text-xs text-green-600 italic -mt-2">
                                Free delivery applied via coupon &quot;{coupon.code}&quot;
                            </div>
                        )}

                        {/* Rush Fee */}
                        {rushFee > 0 && (
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Rush Delivery</span>
                                <span className="font-medium text-amber-600">+${rushFee.toFixed(2)}</span>
                            </div>
                        )}

                        {/* Free Delivery Threshold Info (only if not already free) */}
                        {freeDeliveryThreshold && !isFreeDeliveryCoupon && subtotal < freeDeliveryThreshold && (
                            <div className="text-xs text-muted-foreground italic">
                                Add ${(freeDeliveryThreshold - subtotal).toFixed(2)} more to qualify
                                for free delivery in your area.
                            </div>
                        )}

                        {/* Tax */}
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

                    {/* Admin Approval Notice */}
                    {requiresAdminApproval && (
                        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-start gap-2">
                            <Info className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-blue-800">
                                Your order requires admin approval. You will only be charged after approval.
                            </p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}

export default OrderSummary