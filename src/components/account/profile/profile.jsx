'use client'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PersonalInfo from './personal-info'
import Security from './security'
import Prefrences from './prefrences'
import Layout from "../layout"

export default function UserProfilePage() {
    return (
        <Layout title="Profile Settings"
            description="Manage your personal information, security settings, and preferences."
        >
            <div className="lg:col-span-3">
                <Tabs defaultValue="personal" className="w-full ">
                    <TabsList className="grid grid-cols-2 mb-8 bg-white">
                        <TabsTrigger value="personal">Personal Information</TabsTrigger>
                        <TabsTrigger value="security">Security</TabsTrigger>
                        {/* <TabsTrigger value="preferences">Preferences</TabsTrigger> */}
                    </TabsList>

                    {/* Profile Tab */}
                    <TabsContent value="personal">
                        <PersonalInfo />
                    </TabsContent>

                    {/* Security Tab */}
                    <TabsContent value="security">
                        <Security />
                    </TabsContent>

                    {/* Preferences Tab */}
                    <TabsContent value="preferences">
                        <Prefrences />
                    </TabsContent>
                </Tabs>
            </div>
        </Layout>

    )
}