import { Navigation } from "@/components/nav";
import FAQ from "@/components/faq/faq";
import { Footer } from "@/components/footer";
import SEO from "@/components/seo";

export default function FAQPage() {
  return (
    <div className="min-h-screen">
      <SEO
        title="Ash's Cravings FAQ - Meal Prep Subscription Questions Answered"
        description="Find answers to common questions about our meal prep subscriptions, delivery, pricing, cancellation, and more. Everything you need to know about Ash's Cravings."
        keywords={[
          "meal prep FAQ",
          "Ash's Cravings frequently asked questions",
          "subscription questions",
          "meal delivery FAQ",
          "healthy meal prep questions",
          "food delivery FAQ",
          "subscription cancellation policy",
          "delivery schedule FAQ",
          "meal prep pricing questions",
          "food subscription FAQ",
          "Ash's Cravings help center",
          "meal plan questions answered"
        ]}
        url="/faq"
        type="faq"
        publishedTime="2024-01-01T00:00:00.000Z"
        modifiedTime={new Date().toISOString()}

      />
      <Navigation />
      <FAQ />
      <Footer />
    </div>
  )
}
