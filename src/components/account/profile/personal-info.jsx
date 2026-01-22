'use client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Save,
} from "lucide-react"
const Profile = () => {
    return (
        <Card className="">
            <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                    Update your personal details and contact information
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="firstName">First Name</Label>
                            <Input
                                id="firstName"
                                placeholder="John"
                                defaultValue="John"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input
                                id="lastName"
                                placeholder="Doe"
                                defaultValue="Doe"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="john@example.com"
                            defaultValue="john@example.com"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input
                                id="phone"
                                placeholder="(123) 456-7890"
                                defaultValue="(123) 456-7890"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="birthdate">Birth Date</Label>
                            <Input
                                id="birthdate"
                                type="date"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end pt-4">
                        <Button type="submit" className="gap-2">
                            <Save className="h-4 w-4" />
                            Save Changes
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}

export default Profile
