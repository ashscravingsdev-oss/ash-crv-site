

import { Navigation } from "@/components/nav";
import { Footer } from "@/components/footer";
import VerifyCode from '@/components/verify-code/verify-code'
import SEO from "@/components/seo";

export default function VerifyCodePage() {
  return (
    <div className="min-h-screen">
      <SEO
        title="Verify Your Account - FreshPrep | Enter Verification Code"
        description="Enter the 6-digit verification code sent to your email or phone to complete your FreshPrep account setup and start ordering healthy meals."
        keywords={[
          "verify account freshprep",
          "verification code freshprep",
          "enter otp freshprep",
          "account verification",
          "two factor authentication freshprep",
          "phone verification freshprep",
          "email verification code",
          "freshprep otp verification",
          "verify my account",
          "security code freshprep",
          "6 digit code verification",
          "complete registration freshprep"
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
