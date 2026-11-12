import { Navigation } from "@/components/nav";
import { Footer } from "@/components/footer";
import CustomItem from "@/components/custom-item/custom-item";

// Private links Ash sends to one customer: never in search results
export const metadata = {
  title: "Made just for you - Ash's Cravings",
  description: "A custom order from Ash's Cravings, made from scratch in Eastvale, CA.",
  robots: { index: false, follow: false },
};

export default async function CustomItemPage({ params }) {
  const { token } = await params;
  return (
    <div className="min-h-screen">
      <Navigation />
      <CustomItem token={token} />
      <Footer />
    </div>
  );
}
