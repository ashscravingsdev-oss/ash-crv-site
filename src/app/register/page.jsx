import { Navigation } from "@/components/nav";
import { Footer } from "@/components/footer";
import Register from '@/components/register/register'
import SEO from "@/components/seo";

export default function RegisterPage() {
  return (
    <div className="min-h-screen">
      <SEO
        title="Sign Up for FreshPrep | Create Your Meal Delivery Account"
        description="Join FreshPrep for healthy meal delivery. Create your account in 60 seconds to order fresh meals, manage subscriptions, and track deliveries."
        keywords={[
          "sign up freshprep",
          "create account meal delivery",
          "register freshprep",
          "join freshprep",
          "meal prep account signup",
          "healthy food delivery signup",
          "create freshprep account",
          "meal delivery registration",
          "new account freshprep",
          "food subscription sign up",
          "healthy eating membership",
          "freshprep customer registration"
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
