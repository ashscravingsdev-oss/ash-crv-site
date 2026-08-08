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
          title="My Account - Ash's Cravings | Manage Your Meal Delivery"
          description="Access your Ash's Cravings account to manage subscriptions, view order history, update delivery preferences, and track your healthy meal deliveries."
          keywords={[
            "Ash's Cravings account login",
            "manage meal subscription",
            "my account Ash's Cravings",
            "meal delivery account",
            "track my order Ash's Cravings",
            "update delivery address",
            "meal prep account settings",
            "subscription management",
            "order history Ash's Cravings",
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
