"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Navigation } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";
import SEO from "@/components/seo";
import Cookies from "js-cookie";

export default function OrderConfirmationPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!orderId) {
      setError("No order ID provided");
      setLoading(false);
      return;
    }

    const fetchOrder = async () => {
      try {
        const token = Cookies.get("accessToken");
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/orders/${orderId}`,
          {
            headers: {
              "Content-Type": "application/json",
              ...(token && { Authorization: `Bearer ${token}` }),
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch order details");
        }

        const data = await response.json();
        setOrder(data);
      } catch (err) {
        console.error("Error fetching order:", err);
        setError(err.message || "Failed to load order details");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  // Get payment info
  const payment =
    order?.payments?.find((p) => p.status === "succeeded") || order?.payments?.[0];
  const cardBrand = payment?.payment_method || "Card";
  const lastFour =
    payment?.card_last_four ||
    payment?.stripe_payment_intent_id?.slice(-4) ||
    "----";

  // Format delivery day nicely
  const formatDeliveryDay = (day, timeSlot) => {
    if (!day) return "Scheduled";
    const formattedDay = day.charAt(0).toUpperCase() + day.slice(1);
    return `${formattedDay}, ${timeSlot || ""}`;
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen">
        <SEO
          title="Order Confirmation - FreshPrep"
          description="Confirming your order..."
        />
        <Navigation />
        <div className="container mx-auto px-4 py-16">
          <Card className="max-w-2xl mx-auto text-center">
            <CardContent className="p-12">
              <Loader2 className="h-16 w-16 text-primary mx-auto mb-4 animate-spin" />
              <h1 className="text-2xl font-bold mb-2">Loading your order...</h1>
              <p className="text-muted-foreground">Please wait while we fetch your order details</p>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  // Error state
  if (error || !order) {
    return (
      <div className="min-h-screen">
        <SEO
          title="Order Confirmation - FreshPrep"
          description="Order confirmation"
        />
        <Navigation />
        <div className="container mx-auto px-4 py-16">
          <Card className="max-w-2xl mx-auto text-center">
            <CardContent className="p-12">
              <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
              <h1 className="text-2xl font-bold mb-2">Something went wrong</h1>
              <p className="text-muted-foreground mb-6">
                {error || "Order not found"}
              </p>
              <div className="space-y-3">
                <Button size="lg" className="w-full" asChild>
                  <Link href="/menu">Continue Shopping</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  const {
    order_number,
    statistics,
    delivery_day,
    delivery_time_slot,
    total_amount,
  } = order;

  return (
    <div className="min-h-screen">
      <SEO
        title={`Order Confirmed #${order_number || orderId} - FreshPrep | Your Meal Delivery is Confirmed`}
        description={`Thank you for your FreshPrep order! Your order #${order_number || orderId} has been confirmed. Delivery scheduled for ${formatDeliveryDay(delivery_day, delivery_time_slot)}. View order details and next steps.`}
        keywords={[
          "order confirmation freshprep",
          "thank you for your order",
          "meal delivery confirmed",
          `order #${order_number || orderId}`,
          "delivery confirmation",
          "order status confirmed",
          "meal prep order receipt",
        ]}
        url="/order-confirmation"
        type="website"
        publishedTime={new Date().toISOString()}
        modifiedTime={new Date().toISOString()}
      />
      <Navigation />

      <div className="container mx-auto px-4 py-16">
        <Card className="max-w-2xl mx-auto text-center">
          <CardContent className="p-12">
            <CheckCircle2 className="h-20 w-20 text-primary mx-auto mb-6" />
            <h1 className="text-4xl font-bold mb-4">Order Confirmed!</h1>
            <p className="text-lg text-muted-foreground mb-6">
              Thank you for your order. We've sent a confirmation email to your inbox.
            </p>

            <div className="bg-muted rounded-lg p-6 mb-8">
              <div className="grid md:grid-cols-2 gap-6 text-left">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Order Number</p>
                  <p className="font-semibold">#{order_number || orderId}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Estimated Delivery</p>
                  <p className="font-semibold">
                    {formatDeliveryDay(delivery_day, delivery_time_slot)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Order Total</p>
                  <p className="font-semibold">
                    ${Number(total_amount || statistics?.total_amount || 0).toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Payment Method</p>
                  <p className="font-semibold capitalize">
                    {cardBrand} •••• {lastFour}
                  </p>
                </div>
                {order.delivery_address && (
                  <div className="md:col-span-2">
                    <p className="text-sm text-muted-foreground mb-1">Delivery Address</p>
                    <p className="font-semibold">{order.delivery_address.address}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <Button size="lg" className="w-full" asChild>
                <Link href={`/account/orders`}>View Order Details</Link>
              </Button>
              <Button size="lg" variant="outline" className="w-full bg-transparent" asChild>
                <Link href="/menu">Continue Shopping</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
}