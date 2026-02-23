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
                    title="Profile Settings - FreshPrep | Edit Your Account Details"
                    description="Manage your FreshPrep profile settings. Update your name, email address, password, and preferences to keep your meal delivery account secure and up to date."
                    keywords={[
                        "freshprep profile",
                        "profile settings freshprep",
                        "edit profile freshprep",
                        "change email freshprep",
                        "change password freshprep",
                        "manage account profile",
                        "personal information freshprep",
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
