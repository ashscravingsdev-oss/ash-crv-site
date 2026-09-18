import { Navigation } from "@/components/nav";
import { Footer } from "@/components/footer";
import SubscriptionPicker from "@/components/account/subscriptions/subscription-picker";
import SEO from "@/components/seo";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function AccountSubscriptionsPage() {
    return (
        <ProtectedRoute>
            <div className="min-h-screen">
                <SEO
                    title="Pick Your Meals - Ash's Cravings | Manage Your Subscription"
                    description="Choose which products fill your build-your-own bundles each cycle, or let Ash's Cravings repeat your last order automatically."
                    keywords={[
                        "pick your meals",
                        "subscription meal picker",
                        "manage meal subscription",
                        "build your own bundle",
                        "Ash's Cravings subscription",
                    ]}
                    url="/account/subscriptions"
                    type="account"
                    publishedTime="2026-09-14T00:00:00.000Z"
                    modifiedTime={new Date().toISOString()}
                />
                <Navigation />
                <SubscriptionPicker />
                <Footer />
            </div>
        </ProtectedRoute>
    );
}
