"use client";
import { useState } from "react";
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
import { CheckCircle2 } from "lucide-react";
import { submitToWeb3Forms } from "@/lib/web3forms";

const eventTypeLabels = {
    birthday: "Birthday / Celebration",
    private: "Private Event / Shower",
    corporate: "Corporate / Office Event",
    other: "Other",
};

const budgetLabels = {
    "500": "Under $500",
    "1000": "$500 - $1,000",
    "2000": "$1,000 - $2,000",
    "2000+": "$2,000+",
};

const initialFormState = {
    contactName: "",
    company: "",
    email: "",
    phone: "",
    eventType: "",
    guests: "",
    eventDate: "",
    budget: "",
    details: "",
};

const InquiryForm = () => {
    const [form, setForm] = useState(initialFormState);
    const [status, setStatus] = useState("idle"); // idle | sending | success | error
    const [errorMessage, setErrorMessage] = useState("");

    const updateField = (field) => (e) => {
        setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.eventType || !form.budget) {
            setErrorMessage("Please select an Event Type and Budget Range.");
            setStatus("error");
            return;
        }

        setStatus("sending");

        try {
            await submitToWeb3Forms({
                subject: "New Catering Inquiry — Ash's Cravings Website",
                replyto: form.email,
                "Contact Name": form.contactName,
                "Company/Organization": form.company,
                Email: form.email,
                Phone: form.phone,
                "Event Type": eventTypeLabels[form.eventType] || form.eventType,
                "Number of Guests": form.guests,
                "Event Date": form.eventDate,
                "Budget Range": budgetLabels[form.budget] || form.budget,
                "Event Details": form.details,
            });
            setStatus("success");
        } catch (err) {
            setErrorMessage(
                "Something went wrong sending your request. Please try again, or reach us directly at Ashscravings@gmail.com or 951-224-7740."
            );
            setStatus("error");
        }
    };

    if (status === "success") {
        return (
            <div className="max-w-3xl mx-auto">
                <Card>
                    <CardContent className="flex flex-col items-center text-center gap-3 py-16">
                        <CheckCircle2 className="h-10 w-10 text-primary" />
                        <CardTitle className="text-2xl">
                            Thank you! Your request has been sent — we&apos;ll get back to
                            you soon.
                        </CardTitle>
                        <p className="text-muted-foreground max-w-md">
                            Our catering team will follow up with a custom proposal.
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
                    <CardTitle className="text-2xl">Request a Quote</CardTitle>
                    <p className="text-muted-foreground">
                        Tell us about your event and we'll create a custom proposal
                    </p>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Honeypot spam trap — left blank by real visitors, hidden from view */}
                        <input
                            type="checkbox"
                            name="botcheck"
                            className="hidden"
                            style={{ display: "none" }}
                            tabIndex={-1}
                            autoComplete="off"
                        />

                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="contactName">Contact Name</Label>
                                <Input
                                    id="contactName"
                                    placeholder="John Doe"
                                    required
                                    value={form.contactName}
                                    onChange={updateField("contactName")}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="company">Company/Organization</Label>
                                <Input
                                    id="company"
                                    placeholder="Acme Corp"
                                    value={form.company}
                                    onChange={updateField("company")}
                                />
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
                                    value={form.email}
                                    onChange={updateField("email")}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone</Label>
                                <Input
                                    id="phone"
                                    type="tel"
                                    placeholder="(555) 123-4567"
                                    required
                                    value={form.phone}
                                    onChange={updateField("phone")}
                                />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="eventType">Event Type</Label>
                                <Select
                                    required
                                    value={form.eventType}
                                    onValueChange={(value) =>
                                        setForm((prev) => ({ ...prev, eventType: value }))
                                    }
                                >
                                    <SelectTrigger id="eventType">
                                        <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="birthday">
                                            Birthday / Celebration
                                        </SelectItem>
                                        <SelectItem value="private">
                                            Private Event / Shower
                                        </SelectItem>
                                        <SelectItem value="corporate">
                                            Corporate / Office Event
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
                                    value={form.guests}
                                    onChange={updateField("guests")}
                                />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="eventDate">Event Date</Label>
                                <Input
                                    id="eventDate"
                                    type="date"
                                    required
                                    value={form.eventDate}
                                    onChange={updateField("eventDate")}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="budget">Budget Range</Label>
                                <Select
                                    required
                                    value={form.budget}
                                    onValueChange={(value) =>
                                        setForm((prev) => ({ ...prev, budget: value }))
                                    }
                                >
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
                                value={form.details}
                                onChange={updateField("details")}
                            />
                        </div>

                        {status === "error" && (
                            <div className="rounded-md border border-destructive/30 bg-destructive/10 text-destructive text-sm p-3">
                                {errorMessage}
                            </div>
                        )}

                        <Button
                            type="submit"
                            size="lg"
                            className="w-full"
                            disabled={status === "sending"}
                        >
                            {status === "sending" ? "Sending..." : "Submit Inquiry"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default InquiryForm
