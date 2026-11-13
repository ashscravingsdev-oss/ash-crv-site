import { Navigation } from "@/components/nav";
import { Footer } from "@/components/footer";
import Christmas from "@/components/christmas/christmas";
import SEO from "@/components/seo";

export default function ChristmasPage() {
  return (
    <div className="min-h-screen">
      <SEO
        title="Christmas Mini Cakes - Ash's Cravings | Eastvale, CA"
        description="4-inch Christmas mini cakes, each in its own gift box and every design different. $45 each or 2 for $85, ready on two days in December. Eastvale, CA."
        keywords={["christmas mini cakes", "christmas cake", "holiday gift", "mini cake gift box", "Eastvale bakery"]}
        url="/christmas"
        type="website"
        publishedTime="2026-11-12T00:00:00.000Z"
        modifiedTime={new Date().toISOString()}
      />
      <Navigation />
      <Christmas />
      <Footer />
    </div>
  );
}
