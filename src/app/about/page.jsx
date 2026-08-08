import { Navigation } from "@/components/nav";
import About from "@/components/about/about";
import { Footer } from "@/components/footer";
import SEO from "@/components/seo";


export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <SEO
        title="About Ash's Cravings - Our Story, Mission & Commitment to Healthy Eating"
        description="Discover Ash's Cravings' mission to bring fresh, organic, chef-crafted meals to Eastvale, CA. Learn about our commitment to fresh, nutritious meals made with real ingredients."
        keywords={[
          "about ash's cravings",
          "our story",
          "company mission",
          "healthy meal delivery company",
          "meal prep company about us",
          "our commitment to quality",
          "fresh ingredients mission",
          "nutrition-focused company",
          "sustainable meal delivery",
          "food philosophy",
          "chef-prepared meals company"
        ]}
        url="/about"
        type="website"
        publishedTime="2024-01-01T00:00:00.000Z"
        modifiedTime={new Date().toISOString()}
      />
      <Navigation />
      <About />
      <Footer />
    </div>
  )
}
