import { Footer } from "@/components/footer";
import HowItWorks from "@/components/how-it-works/how-it-works";
import { Navigation } from "@/components/nav";
import SEO from "@/components/seo";

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen">
      <SEO
        title="How It Works - Ash's Cravings | Meal Prep Delivered Monday & Tuesday"
        description="Order Ash's Cravings meal prep by Sunday for Monday or Tuesday delivery in Eastvale, CA. Order one time or subscribe and pick new meals every week."
        keywords={[
          "Ash's Cravings how it works",
          "meal delivery process",
          "meal plans Ash's Cravings",
          "ordering meals online",
          "fresh meal delivery explained",
          "how to use Ash's Cravings",
          "Ash's Cravings delivery steps",
          "easy meal prep service",
          "Ash's Cravings guide",
          "meal subscription explained"
        ]}
        url="/how-it-works"
        type="website"
        publishedTime="2024-01-01T00:00:00.000Z"
        modifiedTime={new Date().toISOString()}
      />
      <Navigation />
      <HowItWorks />
      <Footer />
    </div>
  );
}
