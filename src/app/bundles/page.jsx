
import { Navigation } from "@/components/nav";
import Bundles from "@/components/bundles/bundles";
import { Footer } from "@/components/footer";
import SEO from "@/components/seo";


export default function BundlesPage() {
  return (
    <div className="min-h-screen">
      <SEO
        title="Build Your Meal Prep Bundle - Ash's Cravings | Pick Any Meals"
        description="Build your own meal prep bundle from Ash's Cravings: pick your size, then mix and match any meals from this week's menu. Made from scratch in Eastvale, CA."
        keywords={[
          "meal prep bundles",
          "weekly meal packages",
          "healthy meal packages",
          "family meal bundles",
          "meal prep deals",
          "discount meal plans",
          "bulk meal prep",
          "subscription meal delivery",
          "save on healthy meals",
          "budget meal prep",
          "weekly delivery bundles",
          "meal package deals"
        ]}
        url="/bundles"
        type="website"
        publishedTime="2024-01-01T00:00:00.000Z"
        modifiedTime={new Date().toISOString()}
      />
      <Navigation />
      <Bundles />
      <Footer />
    </div>
  )
}
