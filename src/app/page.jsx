import { Navigation } from "@/components/nav";
import AnnouncementBar from "@/components/home/announcement-bar";
import HeroSection from "@/components/home/hero";
import Cravings from "@/components/home/cravings";
import HowItWorks from "@/components/home/how-it-works";
import FeaturedProducts from "@/components/home/featured-products";
import CakesFeature from "@/components/home/cakes-feature";
import OurStory from "@/components/home/our-story";
import Newsletter from "@/components/home/newsletter";
import { Footer } from "@/components/footer";
import SEO from "@/components/seo";


export default function HomePage() {
  return (
    <div className="min-h-screen">
      <SEO
        title="Ash's Cravings | Meal Prep, Custom Cakes & Desserts in Eastvale, CA"
        description="Made-from-scratch meal prep, custom cakes, dessert cups and party packs in Eastvale, CA. Made fresh, with love."
        keywords={["meal prep", "custom cakes", "desserts", "party packs", "Eastvale"]}
      />
      <AnnouncementBar />
      <Navigation />
      <HeroSection />
      <Cravings />
      <HowItWorks />
      <FeaturedProducts />
      <CakesFeature />
      <OurStory />
      <Newsletter />
      <Footer flush />
    </div>
  );
}
