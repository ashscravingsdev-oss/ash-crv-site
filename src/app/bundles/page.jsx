
import { Navigation } from "@/components/nav";
import Bundles from "@/components/bundles/bundles";
import { Footer } from "@/components/footer";
import SEO from "@/components/seo";


export default function BundlesPage() {
  return (
    <div className="min-h-screen">
      <SEO
        title="Meal Prep Bundles & Packages - FreshPrep | Save Up to 25%"
        description="Save time and money with our healthy meal prep bundles. Weekly packages, family bundles, and customized meal plans with fresh ingredients delivered to your door."
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
