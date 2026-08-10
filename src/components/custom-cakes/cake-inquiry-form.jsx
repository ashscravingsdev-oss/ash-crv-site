"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2 } from "lucide-react";
import { submitToWeb3Forms } from "@/lib/web3forms";

const initialFormState = {
    name: "",
    email: "",
    phone: "",
    eventDate: "",
    servings: "",
    details: "",
};

const CakeInquiryForm = () => {
    const [form, setForm] = useState(initialFormState);
    const [status, setStatus] = useState("idle"); // idle | sending | success | error

    const updateField = (field) => (e) => {
        setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("sending");

        try {
            await submitToWeb3Forms({
                subject: "New Custom Cake Request — Ash's Cravings Website",
                replyto: form.email,
                Name: form.name,
                Email: form.email,
                Phone: form.phone,
                "Event Date": form.eventDate,
                "Number of Servings": form.servings,
                "Cake Details": form.details,
            });
            setStatus("success");
        } catch (err) {
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
                                <Label htmlFor="cakeName">Name</Label>
                                <Input
                                    id="cakeName"
                                    placeholder="Jane Doe"
                                    required
                                    value={form.name}
                                    onChange={updateField("name")}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="cakeEmail">Email</Label>
                                <Input
                                    id="cakeEmail"
                                    type="email"
                                    placeholder="you@example.com"
                                    required
                                    value={form.email}
                                    onChange={updateField("email")}
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
                                    value={form.phone}
                                    onChange={updateField("phone")}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="cakeEventDate">Event Date</Label>
                                <Input
                                    id="cakeEventDate"
                                    type="date"
                                    required
                                    value={form.eventDate}
                                    onChange={updateField("eventDate")}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="cakeServings">Number of Servings</Label>
                            <Input
                                id="cakeServings"
                                type="number"
                                placeholder="25"
                                required
                                value={form.servings}
                                onChange={updateField("servings")}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="cakeDetails">Cake Details</Label>
                            <Textarea
                                id="cakeDetails"
                                placeholder="Flavor, theme, colors, inspiration — tell us your vision"
                                rows={8}
                                value={form.details}
                                onChange={updateField("details")}
                            />
                        </div>

                        {status === "error" && (
                            <div className="rounded-md border border-destructive/30 bg-destructive/10 text-destructive text-sm p-3">
                                Something went wrong sending your request. Please try
                                again, or reach us directly at{" "}
                                <a href="mailto:Ashscravings@gmail.com" className="underline">
                                    Ashscravings@gmail.com
                                </a>{" "}
                                or{" "}
                                <a href="tel:9512247740" className="underline">
                                    951-224-7740
                                </a>
                                .
                            </div>
                        )}

                        <Button
                            type="submit"
                            size="lg"
                            className="w-full"
                            disabled={status === "sending"}
                        >
                            {status === "sending" ? "Sending..." : "Submit Request"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default CakeInquiryForm;
