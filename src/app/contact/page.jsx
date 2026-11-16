

import { Navigation } from "@/components/nav";
import { Footer } from "@/components/footer";
import Contact from '@/components/contact/contact'
import SEO from "@/components/seo";

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <SEO
        title="Contact - Ash's Cravings | Meal Prep, Cakes & Events in Eastvale, CA"
        description="Message Ash's Cravings about meal prep, custom cakes, desserts, or events in Eastvale, CA. I'd love to hear from you."
        keywords={[
          "contact Ash's Cravings",
          "customer service meal delivery",
          "Ash's Cravings support",
          "meal prep contact",
          "healthy food delivery help",
          "Ash's Cravings phone number",
          "meal delivery customer service",
          "food subscription support",
          "event food inquiries",
          "contact us meal prep",
          "Ash's Cravings email",
          "meal delivery questions"
        ]}
        url="/contact"
        type="contact"
        publishedTime="2024-01-01T00:00:00.000Z"
        modifiedTime={new Date().toISOString()}
      />
      <Navigation />
      <Contact />
      <Footer />
    </div>
  );
}
