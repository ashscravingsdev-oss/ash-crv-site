import { Navigation } from "@/components/nav";
import { Footer } from "@/components/footer";
import Login from '@/components/login/login'
import SEO from "@/components/seo";

export default function LoginPage() {
  return (
    <div className="min-h-screen">
      <SEO
        title="Log in - Ash's Cravings"
        description="Log in to your Ash's Cravings account to see your orders and manage your meal prep subscription."
        keywords={[
          "Ash's Cravings login",
          "sign in Ash's Cravings",
          "meal delivery account login",
          "healthy food login",
          "customer portal",
          "meal prep account",
          "food delivery login",
          "access my account",
          "Ash's Cravings customer login",
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
