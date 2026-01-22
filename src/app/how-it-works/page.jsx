import { Footer } from "@/components/footer";
import HowItWorks from "@/components/how-it-works/how-it-works";
import { Navigation } from "@/components/nav";
import SEO from "@/components/seo";

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen">
      <SEO
        title="How FreshPrep Works - Easy Meal Delivery Explained"
        description="Discover how FreshPrep makes meal delivery simple and convenient. Learn about our meal plans, easy ordering process, and fast delivery to enjoy fresh meals at home."
        keywords={[
          "freshprep how it works",
          "meal delivery process",
          "meal plans freshprep",
          "ordering meals online",
          "fresh meal delivery explained",
          "how to use freshprep",
          "freshprep delivery steps",
          "easy meal prep service",
          "freshprep guide",
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
