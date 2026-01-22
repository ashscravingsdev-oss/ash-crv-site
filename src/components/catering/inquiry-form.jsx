"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
const InquiryForm = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        alert(
            "Thank you for your inquiry! Our catering team will contact you within 24 hours."
        );
    };
    return (
        <div className="max-w-3xl mx-auto">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Request a Quote</CardTitle>
                    <p className="text-muted-foreground">
                        Tell us about your event and we'll create a custom proposal
                    </p>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="contactName">Contact Name</Label>
                                <Input id="contactName" placeholder="John Doe" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="company">Company/Organization</Label>
                                <Input id="company" placeholder="Acme Corp" />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
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
                                <Label htmlFor="phone">Phone</Label>
                                <Input
                                    id="phone"
                                    type="tel"
                                    placeholder="(555) 123-4567"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="eventType">Event Type</Label>
                                <Select required>
                                    <SelectTrigger id="eventType">
                                        <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="corporate">
                                            Corporate Event
                                        </SelectItem>
                                        <SelectItem value="private">Private Party</SelectItem>
                                        <SelectItem value="wellness">
                                            Wellness Program
                                        </SelectItem>
                                        <SelectItem value="other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="guests">Number of Guests</Label>
                                <Input
                                    id="guests"
                                    type="number"
                                    placeholder="50"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="eventDate">Event Date</Label>
                                <Input id="eventDate" type="date" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="budget">Budget Range</Label>
                                <Select required>
                                    <SelectTrigger id="budget">
                                        <SelectValue placeholder="Select range" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="500">Under $500</SelectItem>
                                        <SelectItem value="1000">$500 - $1,000</SelectItem>
                                        <SelectItem value="2000">$1,000 - $2,000</SelectItem>
                                        <SelectItem value="2000+">$2,000+</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="details">
                                Event Details & Special Requirements
                            </Label>
                            <Textarea
                                id="details"
                                placeholder="Tell us about your event, dietary restrictions, etc."
                                rows={5}
                            />
                        </div>

                        <Button type="submit" size="lg" className="w-full">
                            Submit Inquiry
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default InquiryForm
