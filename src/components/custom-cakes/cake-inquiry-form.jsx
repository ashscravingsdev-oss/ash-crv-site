"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2 } from "lucide-react";

const CakeInquiryForm = () => {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // No backend wiring yet — this just shows an on-screen confirmation.
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="max-w-3xl mx-auto">
                <Card>
                    <CardContent className="flex flex-col items-center text-center gap-3 py-16">
                        <CheckCircle2 className="h-10 w-10 text-primary" />
                        <CardTitle className="text-2xl">
                            Thanks — we&apos;ll be in touch!
                        </CardTitle>
                        <p className="text-muted-foreground max-w-md">
                            We&apos;ve received your cake request and will follow up with
                            a custom quote soon.
                        </p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Request a Cake</CardTitle>
                    <p className="text-muted-foreground">
                        Tell us about your celebration and we&apos;ll send a custom quote
                    </p>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="cakeName">Name</Label>
                                <Input id="cakeName" placeholder="Jane Doe" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="cakeEmail">Email</Label>
                                <Input
                                    id="cakeEmail"
                                    type="email"
                                    placeholder="you@example.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="cakePhone">Phone</Label>
                                <Input
                                    id="cakePhone"
                                    type="tel"
                                    placeholder="(555) 123-4567"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="cakeEventDate">Event Date</Label>
                                <Input id="cakeEventDate" type="date" required />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="cakeServings">Number of Servings</Label>
                            <Input
                                id="cakeServings"
                                type="number"
                                placeholder="25"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="cakeDetails">Cake Details</Label>
                            <Textarea
                                id="cakeDetails"
                                placeholder="Flavor, theme, colors, inspiration — tell us your vision"
                                rows={8}
                            />
                        </div>

                        <Button type="submit" size="lg" className="w-full">
                            Submit Request
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default CakeInquiryForm;
