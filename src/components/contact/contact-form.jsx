"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { submitToWeb3Forms } from "@/lib/web3forms";

const TOPICS = ["Meal prep", "Cakes & desserts", "An event", "Something else"];
const EMPTY = { name: "", email: "", phone: "", topic: "", message: "" };

const ContactForm = () => {
    const [form, setForm] = useState(EMPTY);
    const [status, setStatus] = useState("idle"); // idle | sending | success | error

    const update = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("sending");
        const topic = form.topic || "A question";
        try {
            // Same form service as the Events page: it emails the message to Ash
            await submitToWeb3Forms({
                subject: `New message: ${topic} (Ash's Cravings website)`,
                replyto: form.email,
                Name: form.name.trim(),
                Email: form.email,
                Phone: form.phone || "Not given",
                Subject: topic,
                Message: form.message,
            });
            setStatus("success");
            setForm(EMPTY);
        } catch {
            setStatus("error");
        }
    };

    return (
        <div className="rounded-[22px] border border-brand-tobacco/25 bg-[#fffaf2] p-6 md:p-9">
            {status === "success" ? (
                <div role="status" className="flex flex-col items-center text-center gap-3 py-12">
                    <p className="font-serif text-4xl text-brand-heading">
                        Thank <em className="italic text-brand-tobacco">you!</em>
                    </p>
                    <p className="text-lg text-foreground/80">I got your message and I&apos;ll get back to you soon.</p>
                    <button
                        type="button"
                        onClick={() => setStatus("idle")}
                        className="mt-2 font-serif italic text-lg text-brand-tobacco border-b border-dashed border-brand-tobacco"
                    >
                        Send another message
                    </button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                    <p className="font-serif text-3xl text-brand-heading">
                        Send me a <em className="italic text-brand-tobacco">message</em>
                    </p>
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" autoComplete="name" value={form.name} onChange={update("name")} required className="bg-background" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" autoComplete="email" value={form.email} onChange={update("email")} required className="bg-background" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="phone">
                            Phone <span className="text-muted-foreground font-normal">(optional)</span>
                        </Label>
                        <Input id="phone" type="tel" autoComplete="tel" value={form.phone} onChange={update("phone")} className="bg-background" />
                    </div>
                    <fieldset className="space-y-2">
                        <legend className="text-sm font-medium leading-none mb-2">What&apos;s it about?</legend>
                        <div className="flex flex-wrap gap-2">
                            {TOPICS.map((t) => (
                                <label key={t} className="cursor-pointer">
                                    <input
                                        type="radio"
                                        name="topic"
                                        value={t}
                                        checked={form.topic === t}
                                        onChange={update("topic")}
                                        className="peer sr-only"
                                    />
                                    <span className="inline-block rounded-full border border-brand-tobacco/40 bg-background px-4 py-1.5 text-[15px] text-brand-espresso transition-colors peer-checked:border-primary peer-checked:bg-primary peer-checked:text-primary-foreground peer-focus-visible:ring-2 peer-focus-visible:ring-primary/40">
                                        {t}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </fieldset>
                    <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea id="message" rows={6} value={form.message} onChange={update("message")} required className="bg-background" />
                    </div>
                    {status === "error" && (
                        <p role="alert" className="text-sm text-red-600">
                            Something went wrong sending your message. Please try again, or email me at Ashscravings@gmail.com.
                        </p>
                    )}
                    <button
                        type="submit"
                        disabled={status === "sending"}
                        className="inline-flex w-full items-center justify-center gap-3 h-12 px-6 rounded-lg bg-primary text-primary-foreground font-mono text-xs uppercase tracking-[0.18em] hover:bg-primary/90 transition-colors disabled:opacity-70"
                    >
                        {status === "sending" ? (
                            <>
                                <Loader2 className="h-4 w-4 animate-spin" /> Sending…
                            </>
                        ) : (
                            <>
                                Send my message <span aria-hidden="true">→</span>
                            </>
                        )}
                    </button>
                </form>
            )}
        </div>
    );
};

export default ContactForm;
