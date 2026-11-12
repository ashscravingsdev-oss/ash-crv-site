import { Navigation } from "@/components/nav";
import { Footer } from "@/components/footer";
import Catering from '@/components/catering/catering'
import SEO from "@/components/seo";

export default function EventsPage() {
  return (
    <div className="min-h-screen">
      <SEO
        title="Events - Ash's Cravings | Party Food, Office Lunches & Dessert Tables in Eastvale, CA"
        description="Food for your events from Ash's Cravings: breakfast burritos, sandwich trays and dessert tables for birthdays, showers and office orders in Eastvale, CA."
        keywords={[
          "healthy catering service",
          "corporate meal delivery",
          "event catering healthy",
          "office catering fresh meals",
          "wedding catering nutritious",
          "business lunch catering",
          "special event catering",
          "fresh food catering",
          "chef-prepared catering",
          "nutritious event catering",
          "corporate wellness catering",
          "catering delivery service"
        ]}
        url="/events"
        type="website"
        publishedTime="2024-01-01T00:00:00.000Z"
        modifiedTime={new Date().toISOString()}
      />
      <Navigation />
      <Catering />
      <Footer />
    </div>
  );
}
