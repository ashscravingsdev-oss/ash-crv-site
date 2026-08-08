

import { Navigation } from "@/components/nav";
import { Footer } from "@/components/footer";
import Orders from '@/components/account/orders'
import SEO from "@/components/seo";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function OrdersPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen">
        <SEO
          title="My Orders - Ash's Cravings | Order History & Tracking"
          description="View your Ash's Cravings order history, track current deliveries, and manage past meal deliveries. Access receipts and delivery details for all your orders."
          keywords={[
            "Ash's Cravings order history",
            "my orders Ash's Cravings",
            "meal delivery orders",
            "track my order",
            "order history meal prep",
            "delivery tracking",
            "past orders Ash's Cravings",
            "meal prep order status",
            "view my orders",
            "order receipts",
            "delivery history",
            "healthy meal orders"
          ]}
          url="/orders"
          type="website"
          publishedTime="2024-01-01T00:00:00.000Z"
          modifiedTime={new Date().toISOString()}
        />
        <Navigation />
        <Orders />
        <Footer />
      </div>
    </ProtectedRoute>
  );
}
