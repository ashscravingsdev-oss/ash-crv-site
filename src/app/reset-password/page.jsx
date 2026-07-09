

import { Navigation } from "@/components/nav";
import { Footer } from "@/components/footer";
import ResetPassword from '@/components/reset-password/reset-password'
import SEO from "@/components/seo";

export default function ResetPasswordPage() {
    return (
        <div className="min-h-screen">
            <SEO
                title="Reset Your Password - FreshPrep | Forgot Password Help"
                description="Forgot your FreshPrep password? Reset it quickly and securely. Enter your email to receive a password reset link for your meal delivery account."
                keywords={[
                    "forgot password freshprep",
                    "reset password meal delivery",
                    "password recovery freshprep",
                    "lost password freshprep",
                    "account recovery meal delivery",
                    "freshprep password reset",
                    "cannot login freshprep",
                    "reset my password",
                    "password help freshprep",
                    "account access recovery",
                    "meal delivery login help",
                    "freshprep account recovery"
                ]}
                url="/forgot-password"
                type="website"
                publishedTime="2024-01-01T00:00:00.000Z"
                modifiedTime={new Date().toISOString()}
            />
            <Navigation />
            <ResetPassword />
            <Footer />
        </div>
    );
}
