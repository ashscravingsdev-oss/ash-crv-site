import { Navigation } from "@/components/nav";
import { Footer } from "@/components/footer";
import CustomCakes from '@/components/custom-cakes/custom-cakes'
import SEO from "@/components/seo";

export default function CustomCakesPage() {
  return (
    <div className="min-h-screen">
      <SEO
        title="Custom Cakes & Desserts - Ash's Cravings | Eastvale, CA"
        description="Custom cakes made from scratch and decorated by hand, from $125, plus dessert cups, chocolate-covered strawberries and sweets by the dozen. Eastvale, CA."
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
