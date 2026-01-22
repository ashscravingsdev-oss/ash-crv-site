"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
const ContactForm = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        alert("Thank you for contacting us! We'll get back to you soon.");
    };
    return (
        <div className="lg:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle>Send us a message</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="firstName">First Name</Label>
                                <Input id="firstName" placeholder="John" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="lastName">Last Name</Label>
                                <Input id="lastName" placeholder="Doe" required />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number (Optional)</Label>
                            <Input id="phone" type="tel" placeholder="(555) 123-4567" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="subject">Subject</Label>
                            <Input
                                id="subject"
                                placeholder="How can we help?"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="message">Message</Label>
                            <Textarea
                                id="message"
                                placeholder="Tell us more..."
                                rows={6}
                                required
                            />
                        </div>
                        <Button type="submit" size="lg" className="w-full">
                            Send Message
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default ContactForm
