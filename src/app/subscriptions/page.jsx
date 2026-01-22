import { Navigation } from "@/components/nav";
import Subscriptions from "@/components/subscriptions/subscriptions";
import { Footer } from "@/components/footer";
import SEO from "@/components/seo";

export default function SubscriptionsPage() {
  return (
    <div className="min-h-screen">
      <SEO
        title="Meal Prep Subscription Plans - FreshPrep | Save Up to 30%"
        description="Subscribe & save! Get weekly, bi-weekly, or monthly meal prep subscriptions starting at $9.99/meal. Free delivery, flexible scheduling, cancel anytime."
        keywords={[
          "meal prep subscription",
          "weekly meal delivery subscription",
          "healthy meal subscription",
          "meal plan subscription",
          "subscription meal delivery",
          "weekly food subscription",
          "monthly meal prep plan",
          "flexible meal subscription",
          "cancel anytime meal plan",
          "discount meal subscription",
          "meal delivery service subscription",
          "affordable meal prep subscription"
        ]}
        image="/og-subscription.jpg" // Create 1200x630 image
        url="/subscription"
        type="website"
        publishedTime="2024-01-01T00:00:00.000Z"
        modifiedTime={new Date().toISOString()}

      />
      <Navigation />
      <Subscriptions />
      <Footer />
    </div>
  )
}
