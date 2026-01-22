import { Navigation } from "@/components/nav";
import About from "@/components/about/about";
import { Footer } from "@/components/footer";
import SEO from "@/components/seo";


export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <SEO
        title="About FreshPrep - Our Story, Mission & Commitment to Healthy Eating"
        description="Discover FreshPrep's journey from a local kitchen to a nationwide healthy meal delivery service. Learn about our mission, values, and commitment to fresh, nutritious meals."
        keywords={[
          "about freshprep",
          "our story",
          "company mission",
          "healthy meal delivery company",
          "freshprep founders",
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
