import { Navigation } from "@/components/nav";
import { Footer } from "@/components/footer";
import Catering from '@/components/catering/catering'
import SEO from "@/components/seo";

export default function EventsPage() {
  return (
    <div className="min-h-screen">
      <SEO
        title="Events & Private Chef - Ash's Cravings | Party Food, Office Lunches & Chef Dinners in Eastvale, CA"
        description="Food for your events from Ash's Cravings: breakfast burritos, sandwich trays and dessert tables for birthdays, showers and office orders, plus private chef dinners at your home in Eastvale, CA."
        keywords={[
          "event food Eastvale",
          "corporate meal delivery",
          "party food trays",
          "office lunch trays",
          "dessert tables",
          "business lunch trays",
          "birthday party food",
          "baby shower food",
          "private chef dinners",
          "breakfast burrito trays",
          "sandwich trays",
          "food for events in Eastvale CA"
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
