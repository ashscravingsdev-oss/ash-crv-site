import { Navigation } from "@/components/nav"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"
import Link from "next/link"
import SEO from "@/components/seo"
export default function OrderConfirmationPage() {
  return (
    <div className="min-h-screen">
      <SEO
        title="Order Confirmation - FreshPrep | Your Meal Delivery is Confirmed"
        description="Thank you for your FreshPrep order! Your order #[ORDER_NUMBER] has been confirmed. Delivery scheduled for [DELIVERY_DATE]. View order details and next steps."
        keywords={[
          "order confirmation freshprep",
          "thank you for your order",
          "meal delivery confirmed",
          "order receipt",
          "order #[ORDER_NUMBER]",
          "delivery confirmation",
          "order status confirmed",
          "purchase confirmation",
          "meal prep order receipt",
          "order summary",
          "next steps",
          "track my order"
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
                  <p className="font-semibold">#FP-2024-12345</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Estimated Delivery</p>
                  <p className="font-semibold">Monday, Dec 23, 10 AM - 12 PM</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Order Total</p>
                  <p className="font-semibold">$53.95</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Payment Method</p>
                  <p className="font-semibold">Credit Card •••• 3456</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Button size="lg" className="w-full" asChild>
                <Link href="/orders">View Order Details</Link>
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
  )
}
