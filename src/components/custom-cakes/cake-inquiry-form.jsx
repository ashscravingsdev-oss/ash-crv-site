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

// Cakes need at least a week's notice
const earliestDate = () => {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    return d.toISOString().split("T")[0];
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
                subject: "New Cake & Dessert Request — Ash's Cravings Website",
                replyto: form.email,
                Name: form.name,
                Email: form.email,
                Phone: form.phone,
                "Event Date": form.eventDate,
                "Number of Servings": form.servings,
                "Cake / Dessert Details": form.details,
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
                        <CardTitle className="font-serif text-3xl font-semibold text-brand-espresso">
                            Thank you! I got your request.
                        </CardTitle>
                        <p className="text-muted-foreground max-w-md">
                            I&apos;ll get back to you soon with a custom quote.
                        </p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto">
            <Card className="rounded-2xl">
                <CardHeader className="space-y-2">
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-brand-heading">
                        <span className="text-brand-matcha">■</span> Request a cake or desserts
                    </p>
                    <CardTitle className="font-serif text-4xl font-medium text-brand-heading">
                        Tell me about your <em className="italic text-brand-tobacco">celebration</em>
                    </CardTitle>
                    <p className="text-muted-foreground">
                        I&apos;ll send you a custom quote. Cakes need at least 1 week&apos;s notice. Need it sooner? Message me
                        and I&apos;ll see what I can do.
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
                                    min={earliestDate()}
                                    value={form.eventDate}
                                    onChange={updateField("eventDate")}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="cakeServings">How many people (or dozens)?</Label>
                            <Input
                                id="cakeServings"
                                type="text"
                                placeholder="25 people, or 3 dozen"
                                required
                                value={form.servings}
                                onChange={updateField("servings")}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="cakeDetails">Tell me your idea</Label>
                            <Textarea
                                id="cakeDetails"
                                placeholder="Cake size, flavor, theme, colors, inspiration, or which desserts you'd like"
                                rows={8}
                                value={form.details}
                                onChange={updateField("details")}
                            />
                        </div>

                        {status === "error" && (
                            <div className="rounded-md border border-destructive/30 bg-destructive/10 text-destructive text-sm p-3">
                                Something went wrong sending your request. Please try
                                again, or reach me directly at{" "}
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
                            className="w-full h-12 font-mono text-xs uppercase tracking-[0.18em]"
                            disabled={status === "sending"}
                        >
                            {status === "sending" ? "Sending..." : "Send my request"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default CakeInquiryForm;
