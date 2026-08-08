import { Navigation } from "@/components/nav";
import { Footer } from "@/components/footer";
import Register from '@/components/register/register'
import SEO from "@/components/seo";

export default function RegisterPage() {
  return (
    <div className="min-h-screen">
      <SEO
        title="Sign Up for Ash's Cravings | Create Your Meal Delivery Account"
        description="Join Ash's Cravings for healthy meal delivery. Create your account in 60 seconds to order fresh meals, manage subscriptions, and track deliveries."
        keywords={[
          "sign up Ash's Cravings",
          "create account meal delivery",
          "register Ash's Cravings",
          "join Ash's Cravings",
          "meal prep account signup",
          "healthy food delivery signup",
          "create Ash's Cravings account",
          "meal delivery registration",
          "new account Ash's Cravings",
          "food subscription sign up",
          "healthy eating membership",
          "Ash's Cravings customer registration"
        ]}
        url="/register"
        type="website"
        publishedTime="2024-01-01T00:00:00.000Z"
        modifiedTime={new Date().toISOString()}
      />
      <Navigation />
      <Register />
      <Footer />
    </div>
  );
}
