import { Navigation } from "@/components/nav";
import { Footer } from "@/components/footer";
import Checkout from '@/components/checkout/checkout'
import SEO from "@/components/seo";
import ProtectedRoute from '@/components/ProtectedRoute';


export default function CheckoutPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen">
        <SEO
          title="Checkout - FreshPrep | Complete Your Meal Delivery Order"
          description="Complete your FreshPrep order securely. Enter delivery details, choose payment method, and confirm your healthy meal delivery. Secure checkout guaranteed."
          keywords={[
            "freshprep checkout",
            "meal delivery checkout",
            "complete order",
            "secure checkout",
            "payment information",
            "delivery details",
            "order confirmation",
            "checkout process",
            "billing address",
            "shipping information",
            "payment methods",
            "place order"
          ]}
          url="/checkout"
          type="website"
          publishedTime="2024-01-01T00:00:00.000Z"
          modifiedTime={new Date().toISOString()}

        />
        <Navigation />
        <Checkout />
        <Footer />
      </div>
    </ProtectedRoute>
  );
}
