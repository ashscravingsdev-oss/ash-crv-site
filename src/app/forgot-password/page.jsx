

import { Navigation } from "@/components/nav";
import { Footer } from "@/components/footer";
import ForgotPassword from '@/components/forgot-password/forgot-password'
import SEO from "@/components/seo";

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen">
      <SEO
        title="Reset Your Password - Ash's Cravings | Forgot Password Help"
        description="Forgot your Ash's Cravings password? Reset it quickly and securely. Enter your email to receive a password reset link for your meal delivery account."
        keywords={[
          "forgot password Ash's Cravings",
          "reset password meal delivery",
          "password recovery Ash's Cravings",
          "lost password Ash's Cravings",
          "account recovery meal delivery",
          "Ash's Cravings password reset",
          "cannot login Ash's Cravings",
          "reset my password",
          "password help Ash's Cravings",
          "account access recovery",
          "meal delivery login help",
          "Ash's Cravings account recovery"
        ]}
        url="/forgot-password"
        type="website"
        publishedTime="2024-01-01T00:00:00.000Z"
        modifiedTime={new Date().toISOString()}
      />
      <Navigation />
      <ForgotPassword />
      <Footer />
    </div>
  );
}
