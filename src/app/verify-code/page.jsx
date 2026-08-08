

import { Navigation } from "@/components/nav";
import { Footer } from "@/components/footer";
import VerifyCode from '@/components/verify-code/verify-code'
import SEO from "@/components/seo";

export default function VerifyCodePage() {
  return (
    <div className="min-h-screen">
      <SEO
        title="Verify Your Account - Ash's Cravings | Enter Verification Code"
        description="Enter the 6-digit verification code sent to your email or phone to complete your Ash's Cravings account setup and start ordering healthy meals."
        keywords={[
          "verify account Ash's Cravings",
          "verification code Ash's Cravings",
          "enter otp Ash's Cravings",
          "account verification",
          "two factor authentication Ash's Cravings",
          "phone verification Ash's Cravings",
          "email verification code",
          "Ash's Cravings otp verification",
          "verify my account",
          "security code Ash's Cravings",
          "6 digit code verification",
          "complete registration Ash's Cravings"
        ]}
        url="/verify"
        type="website"
        publishedTime="2024-01-01T00:00:00.000Z"
        modifiedTime={new Date().toISOString()}
      />
      <Navigation />
      <VerifyCode />
      <Footer />
    </div>
  );
}
