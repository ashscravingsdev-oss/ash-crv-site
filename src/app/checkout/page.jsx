import { Navigation } from "@/components/nav";
import { Footer } from "@/components/footer";
import Checkout from '@/components/checkout/checkout'
import SEO from "@/components/seo";


export default function CheckoutPage() {
  return (
      <div className="min-h-screen">
        <SEO
          title="Checkout - Ash's Cravings"
          description="Complete your Ash's Cravings order: choose delivery or pickup, pick your day, and pay securely."
          keywords={[
            "Ash's Cravings checkout",
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
  );
}
