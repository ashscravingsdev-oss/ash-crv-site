
import { Navigation } from "@/components/nav";
import { Footer } from "@/components/footer";
import Cart from '@/components/cart/cart'
import SEO from "@/components/seo";

export default function CartPage() {
  return (
    <div className="min-h-screen">
      <SEO
        title="My Cart - FreshPrep | Review Your Meal Delivery Order"
        description="Review items in your FreshPrep cart before checkout. Add or remove meals, update quantities, and apply promo codes for your healthy meal delivery."
        keywords={[
          "freshprep cart",
          "meal delivery cart",
          "shopping cart freshprep",
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
