import { Navigation } from "@/components/nav";
import { Footer } from "@/components/footer";
import CustomOrder from "@/components/custom-order/custom-order";

// Private links Ash sends to one customer: never in search results
export const metadata = {
  title: "Your order - Ash's Cravings",
  description: "Your order from Ash's Cravings, made from scratch in Eastvale, CA.",
  robots: { index: false, follow: false },
};

export default async function CustomOrderPage({ params }) {
  const { token } = await params;
  return (
    <div className="min-h-screen">
      <Navigation />
      <CustomOrder token={token} />
      <Footer />
    </div>
  );
}
