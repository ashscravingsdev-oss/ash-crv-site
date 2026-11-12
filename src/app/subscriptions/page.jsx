import { Navigation } from "@/components/nav";
import Subscriptions from "@/components/subscriptions/subscriptions";
import { Footer } from "@/components/footer";
import SEO from "@/components/seo";

export default function SubscriptionsPage() {
  return (
    <div className="min-h-screen">
      <SEO
        title="Meal Prep Subscriptions - Ash's Cravings | Your Meals, Every Week"
        description="Get Ash's Cravings meal prep every week or every 2 weeks. Pick a bundle, choose new meals from the rotating menu each week, and skip or pause anytime. Eastvale, CA."
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
        url="/subscriptions"
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
