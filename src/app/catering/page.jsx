import { Navigation } from "@/components/nav";
import { Footer } from "@/components/footer";
import Catering from '@/components/catering/catering'
import SEO from "@/components/seo";

export default function CateringPage() {
  return (
    <div className="min-h-screen">
      <SEO
        title="FreshPrep Catering - Healthy Event Catering & Corporate Meal Delivery"
        description="Impress your guests with chef-prepared healthy catering for corporate events, weddings, and special occasions. Custom menus, fresh ingredients, and professional service."
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
        url="/catering"
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
