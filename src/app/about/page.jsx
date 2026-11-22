import { Navigation } from "@/components/nav";
import About from "@/components/about/about";
import { Footer } from "@/components/footer";
import SEO from "@/components/seo";
import WithSitePhotos from "@/components/with-site-photos";


// Ash's picks from the admin's Website photos page show within a minute
export const revalidate = 60

export default function AboutPage() {
  return (
    <WithSitePhotos>
    <div className="min-h-screen">
      <SEO
        title="About Ash - Ash's Cravings | Meal Prep, Cakes & Private Chef in Eastvale, CA"
        description="Meet Ash, the culinary school-trained chef behind Ash's Cravings: made-from-scratch meal prep, custom cakes, desserts, events and private chef dinners in Eastvale, CA."
        keywords={[
          "about ash's cravings",
          "my story",
          "company mission",
          "healthy meal delivery company",
          "about Ash",
          "made from scratch",
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
    </WithSitePhotos>
  )
}
