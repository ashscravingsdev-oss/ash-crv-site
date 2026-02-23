import { Navigation } from "@/components/nav";
import { Footer } from "@/components/footer";
import Account from '@/components/account/account'
import SEO from "@/components/seo";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function AccountPage() {
  return (
    <ProtectedRoute>

      <div className="min-h-screen">
        <SEO
          title="My Account - FreshPrep | Manage Your Meal Delivery"
          description="Access your FreshPrep account to manage subscriptions, view order history, update delivery preferences, and track your healthy meal deliveries."
          keywords={[
            "freshprep account login",
            "manage meal subscription",
            "my account freshprep",
            "meal delivery account",
            "track my order freshprep",
            "update delivery address",
            "meal prep account settings",
            "subscription management",
            "order history freshprep",
            "delivery preferences",
            "account dashboard",
            "healthy food account"
          ]}
          url="/account"
          type="account"
          publishedTime="2024-01-01T00:00:00.000Z"
          modifiedTime={new Date().toISOString()}
        />
        <Navigation />
        <Account />
        <Footer />
      </div>
    </ProtectedRoute>
  );
}
