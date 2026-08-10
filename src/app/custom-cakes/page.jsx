import { Navigation } from "@/components/nav";
import { Footer } from "@/components/footer";
import CustomCakes from '@/components/custom-cakes/custom-cakes'
import SEO from "@/components/seo";

export default function CustomCakesPage() {
  return (
    <div className="min-h-screen">
      <SEO
        title="Custom Cakes - Ash's Cravings"
        description="Handcrafted custom cakes for birthdays, weddings, and every celebration. Every cake is custom-quoted to your vision."
        keywords={[
          "custom cakes",
          "birthday cake",
          "wedding cake",
          "celebration cake",
          "custom cake order",
          "handcrafted cake"
        ]}
        url="/custom-cakes"
        type="website"
        publishedTime="2026-08-07T00:00:00.000Z"
        modifiedTime={new Date().toISOString()}
      />
      <Navigation />
      <CustomCakes />
      <Footer />
    </div>
  );
}
