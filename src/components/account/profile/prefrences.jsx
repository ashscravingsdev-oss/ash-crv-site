'use client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {

    Save,
} from "lucide-react"
const Prefrences = () => {
    return (
        <Card className="">
            <CardHeader>
                <CardTitle>Account Preferences</CardTitle>
                <CardDescription>
                    Customize your experience and notification settings
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    <div>
                        <h3 className="font-semibold mb-4">Communication Preferences</h3>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium">Marketing Emails</p>
                                    <p className="text-sm text-muted-foreground">
                                        Receive updates about new products and offers
                                    </p>
                                </div>
                                <div className="h-6 w-12 rounded-full bg-secondary/50 relative">
                                    <div className="h-6 w-6 rounded-full bg-primary absolute right-0" />
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium">Order Updates</p>
                                    <p className="text-sm text-muted-foreground">
                                        Get notified about your order status
                                    </p>
                                </div>
                                <div className="h-6 w-12 rounded-full bg-primary relative">
                                    <div className="h-6 w-6 rounded-full bg-background absolute left-0" />
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium">Weekly Menu</p>
                                    <p className="text-sm text-muted-foreground">
                                        Get weekly menu updates and specials
                                    </p>
                                </div>
                                <div className="h-6 w-12 rounded-full bg-primary relative">
                                    <div className="h-6 w-6 rounded-full bg-background absolute left-0" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-border pt-6">
                        <h3 className="font-semibold mb-4">Dietary Preferences</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-center space-x-2">
                                <div className="h-4 w-4 rounded border border-border" />
                                <label className="text-sm">Vegetarian</label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="h-4 w-4 rounded border border-border" />
                                <label className="text-sm">Gluten-Free</label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="h-4 w-4 rounded border border-border" />
                                <label className="text-sm">Dairy-Free</label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="h-4 w-4 rounded border border-border" />
                                <label className="text-sm">Nut-Free</label>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end pt-4">
                        <Button className="gap-2">
                            <Save className="h-4 w-4" />
                            Save Preferences
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default Prefrences
