"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Layout from "./layout";
import { fetchUserOrders } from "@/store/dashboardSlice";
import { Loader2, RefreshCw, MapPin, Calendar, Clock } from "lucide-react";

const Orders = () => {
    const dispatch = useDispatch();
    const {
        orders,
        loading: { orders: loading },
        error,
    } = useSelector((state) => state.dashboard);

    useEffect(() => {
        dispatch(fetchUserOrders({}));
    }, [dispatch]);

    // Loading state
    if (loading) {
        return (
            <Layout title="Orders" description="View your order history and delivery status.">
                <div className="lg:col-span-3 flex justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
            </Layout>
        );
    }

    // Empty state
    if (!orders || orders.length === 0) {
        return (
            <Layout title="Orders" description="View your order history and delivery status.">
                <div className="lg:col-span-3 text-center py-12">
                    <p className="text-muted-foreground">No orders yet.</p>
                    <Button className="mt-4" asChild>
                        <Link href="/menu">Browse Menu</Link>
                    </Button>
                </div>
            </Layout>
        );
    }

    return (
        <Layout
            title="Orders"
            description="View your order history, order details, and delivery status."
        >
            <div className="lg:col-span-3 space-y-6">
                {orders.map((order) => {
                    // Calculate discount if coupon exists (fallback to 0)
                    let discount = 0;
                    if (order.coupon) {
                        if (order.coupon.type === "percentage") {
                            discount = parseFloat(order.subtotal) * parseFloat(order.coupon.value) / 100;
                        } else if (order.coupon.type === "fixed") {
                            discount = Math.min(parseFloat(order.coupon.value), parseFloat(order.subtotal));
                        }
                    }

                    return (
                        <Card key={order.id}>
                            <CardContent className="p-6">
                                {/* Header: Order number, status, date, total */}
                                <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
                                    <div>
                                        <div className="flex flex-wrap items-center gap-3 mb-2">
                                            <h3 className="text-xl font-semibold">#{order.order_number}</h3>
                                            <div className="flex flex-wrap items-center gap-2">
                                                <Badge variant={order.status === "completed" || order.status === "delivered" ? "secondary" : "default"}>
                                                    {order.status}
                                                </Badge>
                                                {order.subscription_id && (
                                                    <Badge variant="outline" className="text-xs gap-1">
                                                        <RefreshCw size={12} />
                                                        Subscription
                                                    </Badge>
                                                )}
                                            </div>
                                        </div>
                                        <p className="text-sm text-muted-foreground">
                                            {new Date(order.createdAt).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "short",
                                                day: "numeric",
                                            })}
                                        </p>
                                    </div>
                                    <div className="text-left md:text-right">
                                        <p className="text-2xl font-bold">${Number(order.total_amount).toFixed(2)}</p>
                                        <p className="text-sm text-muted-foreground">
                                            {order.items?.length || 0} item{(order.items?.length || 0) !== 1 ? "s" : ""}
                                        </p>
                                    </div>
                                </div>

                                {/* Items list */}
                                <div className="space-y-2 mb-6">
                                    {order.items?.map((item, idx) => (
                                        <div key={idx} className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">
                                                {item.quantity}x{" "}
                                                {item.product?.name || item.bundle?.name || "Item"}
                                            </span>
                                            <span className="font-medium">
                                                ${(parseFloat(item.unit_price) * item.quantity).toFixed(2)}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                {/* Order breakdown */}
                                <div className="bg-muted/50 rounded-lg p-4 mb-4 space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Subtotal</span>
                                        <span className="font-medium">
                                            ${parseFloat(order.subtotal).toFixed(2)}
                                        </span>
                                    </div>

                                    {/* Coupon Discount – calculated from coupon */}
                                    {order.coupon && (
                                        <div className="flex justify-between text-green-600">
                                            <span>
                                                Discount ({order.coupon.code})
                                            </span>
                                            <span>
                                                -$
                                                {(order.coupon.type === 'percentage'
                                                    ? (parseFloat(order.subtotal) * parseFloat(order.coupon.value) / 100)
                                                    : Math.min(parseFloat(order.coupon.value), parseFloat(order.subtotal))
                                                ).toFixed(2)}
                                            </span>
                                        </div>
                                    )}

                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Tax</span>
                                        <span className="font-medium">
                                            ${parseFloat(order.tax_total).toFixed(2)}
                                        </span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Delivery Fee</span>
                                        <span className="font-medium">
                                            {parseFloat(order.delivery_fee) === 0 ? (
                                                <span className="text-green-600">FREE</span>
                                            ) : (
                                                `$${parseFloat(order.delivery_fee).toFixed(2)}`
                                            )}
                                        </span>
                                    </div>

                                    {/* Rush Fee – only if > 0 */}
                                    {parseFloat(order.rush_fee || 0) > 0 && (
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Rush Delivery</span>
                                            <span className="font-medium text-amber-600">
                                                +${parseFloat(order.rush_fee).toFixed(2)}
                                            </span>
                                        </div>
                                    )}

                                    {/* Tip – from tip relation */}
                                    {order.tip && parseFloat(order.tip.amount) > 0 && (
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Driver Tip</span>
                                            <span className="font-medium">
                                                ${parseFloat(order.tip.amount).toFixed(2)}
                                            </span>
                                        </div>
                                    )}

                                    <div className="flex justify-between font-semibold pt-2 border-t">
                                        <span>Total</span>
                                        <span>${parseFloat(order.total_amount).toFixed(2)}</span>
                                    </div>
                                </div>
                                {/* Delivery details */}
                                {(order.delivery_address || order.delivery_day) && (
                                    <div className="flex flex-wrap gap-4 text-xs text-muted-foreground mb-4">
                                        {order.delivery_address && (
                                            <div className="flex items-center gap-1">
                                                <MapPin size={14} />
                                                <span>{order.delivery_address.address}</span>
                                            </div>
                                        )}
                                        {order.delivery_day && (
                                            <div className="flex items-center gap-1">
                                                <Calendar size={14} />
                                                <span className="capitalize">{order.delivery_day}</span>
                                            </div>
                                        )}
                                        {order.delivery_time_slot && (
                                            <div className="flex items-center gap-1">
                                                <Clock size={14} />
                                                <span>{order.delivery_time_slot}</span>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Payment status */}
                                {order.payments && order.payments.length > 0 && (
                                    <div className="text-xs text-muted-foreground">
                                        Payment:{" "}
                                        <span className="font-semibold capitalize">
                                            {order.payments[0]?.status}
                                        </span>
                                        {order.payments[0]?.payment_method && (
                                            <span> via {order.payments[0].payment_method}</span>
                                        )}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </Layout>
    );
};

export default Orders;