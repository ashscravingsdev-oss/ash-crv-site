
import { Navigation } from "@/components/nav";
import { Footer } from "@/components/footer";
import Cart from '@/components/cart/cart'
import SEO from "@/components/seo";

export default function CartPage() {
  return (
    <div className="min-h-screen">
      <SEO
        title="Your cart - Ash's Cravings"
        description="Your Ash's Cravings cart: meal prep, cakes and desserts, made from scratch in Eastvale, CA."
        keywords={[
          "Ash's Cravings cart",
          "meal delivery cart",
          "shopping cart Ash's Cravings",
          "review my order",
          "meal prep cart",
          "food delivery cart",
          "order summary",
          "cart items",
          "add to cart",
          "update cart",
          "empty cart",
          "cart total"
        ]}
        url="/cart"
        type="website"
        publishedTime="2024-01-01T00:00:00.000Z"
        modifiedTime={new Date().toISOString()}
      />
      <Navigation />
      <Cart />
      <Footer />
    </div>
  );
}
