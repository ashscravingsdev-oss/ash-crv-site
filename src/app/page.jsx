import { Navigation } from "@/components/nav";
import HeroSection from "@/components/home/hero";
import HowItWorks from "@/components/home/how-it-works";
import FeaturedProducts from "@/components/home/featured-products";
import OurStory from "@/components/home/our-story";
import Newsletter from "@/components/home/newsletter";
import { Footer } from "@/components/footer";
import SEO from "@/components/seo";


export default function HomePage() {
  return (
    <div className="min-h-screen">
      <SEO
        title="Ash's Cravings - Healthy Meal Prep & Wellness Juices Delivered"
        description="Premium meal prep and cold-pressed juices delivered to your door. Fresh, nutritious, and delicious meals crafted by expert chefs."
        keywords={["meal prep", "healthy meals", "food delivery", "wellness juices"]}
      />
      <Navigation />
      <HeroSection />
      <HowItWorks />
      <FeaturedProducts />
      <OurStory />
      <Newsletter />
      <Footer />
    </div>
  );
}
