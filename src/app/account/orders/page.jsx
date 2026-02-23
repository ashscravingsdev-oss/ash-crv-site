

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
          title="My Orders - FreshPrep | Order History & Tracking"
          description="View your FreshPrep order history, track current deliveries, and manage past meal deliveries. Access receipts and delivery details for all your orders."
          keywords={[
            "freshprep order history",
            "my orders freshprep",
            "meal delivery orders",
            "track my order",
            "order history meal prep",
            "delivery tracking",
            "past orders freshprep",
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
