import { Navigation } from "@/components/nav";
import { Footer } from "@/components/footer";
import Login from '@/components/login/login'
import SEO from "@/components/seo";

export default function LoginPage() {
  return (
    <div className="min-h-screen">
      <SEO
        title="Login to FreshPrep | Access Your Meal Delivery Account"
        description="Sign in to your FreshPrep account to manage meal deliveries, view order history, update preferences, and track your healthy meals."
        keywords={[
          "freshprep login",
          "sign in freshprep",
          "meal delivery account login",
          "healthy food login",
          "customer portal",
          "meal prep account",
          "food delivery login",
          "access my account",
          "freshprep customer login",
          "login to order",
          "account dashboard",
          "secure login"
        ]}
        url="/login"
        type="website"
        publishedTime="2024-01-01T00:00:00.000Z"
        modifiedTime={new Date().toISOString()}
      />
      <Navigation />
      <Login />
      <Footer />
    </div>
  );
}
