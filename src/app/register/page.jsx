import { Navigation } from "@/components/nav";
import { Footer } from "@/components/footer";
import Register from '@/components/register/register'
import SEO from "@/components/seo";

export default function RegisterPage() {
  return (
    <div className="min-h-screen">
      <SEO
        title="Create an account - Ash's Cravings"
        description="Create your Ash's Cravings account to order meal prep, cakes and desserts, and keep track of your orders and subscription."
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
