"use client";

import { useState } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { submitToWeb3Forms } from "@/lib/web3forms";

const EMPTY = { firstName: "", lastName: "", email: "", phone: "", subject: "", message: "" };

const ContactForm = () => {
    const [form, setForm] = useState(EMPTY);
    const [status, setStatus] = useState("idle"); // idle | sending | success | error

    const update = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("sending");
        try {
            // Same form service as the Events page: it emails the message to Ash
            await submitToWeb3Forms({
                subject: `New message: ${form.subject} (Ash's Cravings website)`,
                replyto: form.email,
                Name: `${form.firstName} ${form.lastName}`.trim(),
                Email: form.email,
                Phone: form.phone || "Not given",
                Subject: form.subject,
                Message: form.message,
            });
            setStatus("success");
            setForm(EMPTY);
        } catch {
            setStatus("error");
        }
    };

    return (
        <div className="lg:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle>Send me a message</CardTitle>
                </CardHeader>
                <CardContent>
                    {status === "success" ? (
                        <div role="status" className="flex flex-col items-center text-center gap-3 py-10">
                            <CheckCircle2 className="h-10 w-10 text-primary" />
                            <p className="text-lg font-medium">Thank you! I got your message.</p>
                            <p className="text-muted-foreground">I&apos;ll get back to you soon.</p>
                            <Button variant="outline" onClick={() => setStatus("idle")}>
                                Send another message
                            </Button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName">First Name</Label>
                                    <Input id="firstName" autoComplete="given-name" value={form.firstName} onChange={update("firstName")} required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Input id="lastName" autoComplete="family-name" value={form.lastName} onChange={update("lastName")} required />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" autoComplete="email" placeholder="you@example.com" value={form.email} onChange={update("email")} required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone Number (Optional)</Label>
                                <Input id="phone" type="tel" autoComplete="tel" placeholder="(555) 123-4567" value={form.phone} onChange={update("phone")} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="subject">Subject</Label>
                                <Input id="subject" placeholder="How can I help?" value={form.subject} onChange={update("subject")} required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="message">Message</Label>
                                <Textarea id="message" placeholder="Tell me more..." rows={6} value={form.message} onChange={update("message")} required />
                            </div>
                            {status === "error" && (
                                <p role="alert" className="text-sm text-red-600">
                                    Something went wrong sending your message. Please try again, or email me at Ashscravings@gmail.com.
                                </p>
                            )}
                            <Button type="submit" size="lg" className="w-full" disabled={status === "sending"}>
                                {status === "sending" ? (
                                    <>
                                        <Loader2 className="h-4 w-4 animate-spin" /> Sending...
                                    </>
                                ) : (
                                    "Send Message"
                                )}
                            </Button>
                        </form>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default ContactForm;
