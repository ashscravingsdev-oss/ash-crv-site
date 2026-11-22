"use client"

import React, { useState } from 'react'
import { Input } from "@/components/ui/input";

const BACKEND = (process.env.NEXT_PUBLIC_BACKEND_URL || "").replace(/\/+$/, "")
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

// Joining twice is harmless (the list keeps each email once), so if the
// server is still waking up, quietly try again for about a minute.
async function join(email, website) {
    const delays = [2000, 4000, 6000, 8000, 10000, 15000, 15000]
    for (let attempt = 0; ; attempt++) {
        let res
        try {
            res = await fetch(`${BACKEND}/email-list`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, source: "home", website }),
            })
        } catch {
            res = null
        }
        if (res && res.status !== 502 && res.status !== 503 && res.status !== 504) {
            const data = await res.json().catch(() => ({}))
            if (!res.ok) throw new Error(data.message || "Something went wrong. Please try again.")
            return
        }
        if (attempt >= delays.length) throw new Error("Something went wrong. Please try again in a minute.")
        await sleep(delays[attempt])
    }
}

const Newsletter = () => {
    const [email, setEmail] = useState("")
    const [website, setWebsite] = useState("")
    const [state, setState] = useState("idle") // idle | sending | done
    const [error, setError] = useState("")

    const onSubmit = async (e) => {
        e.preventDefault()
        if (state === "sending") return
        setError("")
        setState("sending")
        try {
            await join(email.trim(), website)
            setState("done")
        } catch (err) {
            setError(err.message)
            setState("idle")
        }
    }

    return (
        <section className="bg-muted border-t border-border">
            <div className="container mx-auto px-4 py-16 md:py-20">
                <div className="max-w-2xl mx-auto text-center space-y-4">
                    <p className="font-serif italic text-xl md:text-2xl text-brand-tobacco"><span aria-hidden="true" className="not-italic text-brand-matcha text-[0.55em] align-[0.2em] mr-2">■</span>Join the list</p>
                    <h2 className="font-serif font-medium text-4xl md:text-5xl text-brand-heading text-balance">
                        Be the <em className="italic text-brand-tobacco">first</em> to know
                    </h2>
                    <p className="text-lg text-foreground/85">
                        This week&apos;s menu, new cake designs and holiday drops, straight to your inbox.
                    </p>
                    {state === "done" ? (
                        <p role="status" className="font-serif italic text-2xl text-brand-espresso pt-2">
                            You&apos;re on the list! Keep an eye on your inbox.
                        </p>
                    ) : (
                        <form onSubmit={onSubmit} className="max-w-md mx-auto pt-2">
                            <div className="flex flex-col sm:flex-row gap-3">
                                <label htmlFor="newsletter-email" className="sr-only">Email address</label>
                                <Input
                                    id="newsletter-email"
                                    type="email"
                                    required
                                    autoComplete="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Your email"
                                    aria-invalid={error ? true : undefined}
                                    aria-describedby={error ? "newsletter-error" : undefined}
                                    className="h-12 bg-background flex-1"
                                />
                                {/* Hidden from people; only bots fill this in */}
                                <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
                                    <label htmlFor="newsletter-website">Leave this empty</label>
                                    <input
                                        id="newsletter-website"
                                        type="text"
                                        tabIndex={-1}
                                        autoComplete="off"
                                        value={website}
                                        onChange={(e) => setWebsite(e.target.value)}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={state === "sending"}
                                    className="h-12 px-6 rounded-lg bg-primary text-primary-foreground font-mono text-xs uppercase tracking-[0.18em] hover:bg-primary/90 transition-colors disabled:opacity-70"
                                >
                                    {state === "sending" ? "Joining…" : "Join"}
                                </button>
                            </div>
                            {error && (
                                <p id="newsletter-error" role="alert" className="mt-3 text-sm text-destructive">
                                    {error}
                                </p>
                            )}
                        </form>
                    )}
                    <p className="text-sm text-muted-foreground">Unsubscribe anytime.</p>
                </div>
            </div>
        </section>
    )
}

export default Newsletter
