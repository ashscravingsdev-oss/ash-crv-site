import { Navigation } from "@/components/nav";
import { Footer } from "@/components/footer";
import Profile from '@/components/account/profile/profile'
import SEO from "@/components/seo";
import ProtectedRoute from "@/components/ProtectedRoute";


export default function AccountPage() {
    return (
        <ProtectedRoute>
            <div className="min-h-screen">
                <SEO
                    title="Profile Settings - Ash's Cravings | Edit Your Account Details"
                    description="Manage your Ash's Cravings profile settings. Update your name, email address, password, and preferences to keep your meal delivery account secure and up to date."
                    keywords={[
                        "Ash's Cravings profile",
                        "profile settings Ash's Cravings",
                        "edit profile Ash's Cravings",
                        "change email Ash's Cravings",
                        "change password Ash's Cravings",
                        "manage account profile",
                        "personal information Ash's Cravings",
                        "account profile settings",
                        "meal delivery profile"
                    ]}
                    url="/account/profile"
                    type="profile"
                    publishedTime="2024-01-01T00:00:00.000Z"
                    modifiedTime={new Date().toISOString()}
                />
                <Navigation />
                <Profile />
                <Footer />
            </div>
        </ProtectedRoute>
    );
}
