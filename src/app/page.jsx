import { Navigation } from "@/components/nav";
import AnnouncementBar from "@/components/home/announcement-bar";
import HeroSection from "@/components/home/hero";
import Cravings from "@/components/home/cravings";
import FeaturedProducts from "@/components/home/featured-products";
import CakesFeature from "@/components/home/cakes-feature";
import OurStory from "@/components/home/our-story";
import Newsletter from "@/components/home/newsletter";
import MochaBand from "@/components/home/mocha-band";
import InstagramStrip from "@/components/home/instagram-strip";
import Reviews from "@/components/home/reviews";
import { Footer } from "@/components/footer";
import SEO from "@/components/seo";
import BusinessSchema from "@/components/business-schema";
import WithSitePhotos from "@/components/with-site-photos";


// Ash's picks from the admin's Website photos page show within a minute
export const revalidate = 60

export default function HomePage() {
  return (
    <WithSitePhotos>
    <div className="min-h-screen">
      <SEO
        title="Ash's Cravings | Meal Prep, Custom Cakes & Desserts"
        description="Made-from-scratch meal prep, custom cakes, dessert cups and food for your events in Eastvale, CA. Made fresh, with love."
        keywords={["meal prep", "custom cakes", "desserts", "event food", "Eastvale"]}
      />
      <BusinessSchema />
      <AnnouncementBar />
      <Navigation />
      <HeroSection />
      <MochaBand />
      <Cravings />
      <FeaturedProducts />
      <Reviews />
      <CakesFeature />
      <OurStory />
      <InstagramStrip />
      <Newsletter />
      <Footer flush />
    </div>
    </WithSitePhotos>
  );
}
