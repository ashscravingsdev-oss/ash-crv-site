'use client'
import React from 'react'
import Link from "next/link";
import { motion } from "framer-motion"
import { fadeUp } from "@/lib/animations"

const steps = [
    { n: "01", title: "Pick your meals", text: "Choose from this week's menu, or build a bundle and mix and match your favorites." },
    { n: "02", title: "Order by Sunday", text: "Check out by Sunday and pick Monday or Tuesday delivery, or pick up." },
    { n: "03", title: "I cook it fresh", text: "Everything is made from scratch with real, fresh ingredients." },
    { n: "04", title: "Heat and enjoy", text: "About 2 minutes in the microwave, or the air fryer if you're like me. Best within 3 to 4 days." },
]

const details = [
    { label: "Delivery days", value: "Monday & Tuesday" },
    { label: "Order by", value: "Sunday" },
    { label: "Delivery fee", value: "Based on your address, shown at checkout" },
    { label: "Pickup", value: "Available, just message me" },
]

const prices = [
    { label: "Single meal", value: "$17" },
    { label: "5 meals", value: "$80" },
    { label: "10 meals", value: "$160" },
]

const HowItWorks = () => {
    return (
        <div>
            {/* Hero */}
            <section className="container mx-auto px-4 pt-10 pb-14 md:pt-14 md:pb-20 text-center">
                <motion.div initial="initial" animate="animate" variants={fadeUp} className="max-w-3xl mx-auto space-y-5">
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-brand-heading">
                        <span className="text-brand-matcha">■</span> How it works
                    </p>
                    <h1 className="font-serif font-medium text-5xl md:text-7xl leading-[0.98] text-brand-heading">
                        Fresh meals, <em className="italic text-brand-tobacco">no stress</em>
                    </h1>
                    <p className="text-lg md:text-xl text-foreground/85 leading-relaxed">
                        Homemade meal prep, made from scratch and delivered every Monday and Tuesday in Eastvale.
                    </p>
                </motion.div>
            </section>

            {/* Steps */}
            <section className="container mx-auto px-4 pb-16 md:pb-20">
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {steps.map((s) => (
                        <div key={s.n} className="bg-card border border-border rounded-2xl p-6 space-y-2">
                            <p className="font-serif italic text-3xl text-brand-tobacco">{s.n}</p>
                            <h2 className="font-serif text-2xl font-semibold text-brand-espresso">{s.title}</h2>
                            <p className="text-muted-foreground leading-relaxed">{s.text}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Two ways to order */}
            <section className="bg-muted">
                <div className="container mx-auto px-4 py-16 md:py-20">
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-brand-heading text-center mb-3">
                        <span className="text-brand-matcha">■</span> Two ways to order
                    </p>
                    <h2 className="font-serif font-medium text-4xl md:text-5xl text-brand-heading text-center mb-10">
                        One time or <em className="italic text-brand-tobacco">every week</em>
                    </h2>
                    <div className="grid md:grid-cols-2 gap-5 max-w-5xl mx-auto">
                        <div className="bg-background rounded-2xl p-6 md:p-8 flex flex-col">
                            <h3 className="font-serif text-3xl font-semibold text-brand-espresso">Order this week</h3>
                            <p className="text-foreground/85 leading-relaxed mt-3 flex-1">
                                Grab single meals and juices from the menu, or build a bundle of 5 or 10 meals. Perfect if
                                you want to try things out or just need a good week.
                            </p>
                            <div className="flex flex-wrap gap-3 pt-6">
                                <Link href="/menu" className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-lg bg-primary text-primary-foreground font-mono text-xs uppercase tracking-[0.16em]">
                                    See the menu →
                                </Link>
                                <Link href="/bundles" className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-lg border border-primary text-primary font-mono text-xs uppercase tracking-[0.16em]">
                                    Build a bundle →
                                </Link>
                            </div>
                        </div>
                        <div className="bg-background rounded-2xl p-6 md:p-8 flex flex-col border-2 border-primary">
                            <h3 className="font-serif text-3xl font-semibold text-brand-espresso">Subscribe</h3>
                            <p className="text-foreground/85 leading-relaxed mt-3 flex-1">
                                Your bundle shows up every week or every 2 weeks. My menu changes, so you pick new favorites
                                from your account each week. Forget to pick? I&apos;ll repeat your last picks and swap
                                anything that&apos;s off the menu for a chef&apos;s choice. Skip or pause anytime.
                            </p>
                            <div className="flex flex-wrap gap-3 pt-6">
                                <Link href="/bundles?subscribe=weekly" className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-lg bg-primary text-primary-foreground font-mono text-xs uppercase tracking-[0.16em]">
                                    Start a subscription →
                                </Link>
                                <Link href="/subscriptions" className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-lg border border-primary text-primary font-mono text-xs uppercase tracking-[0.16em]">
                                    Learn more →
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Details + pricing */}
            <section className="container mx-auto px-4 py-16 md:py-20">
                <div className="grid md:grid-cols-2 gap-10 md:gap-16 max-w-5xl mx-auto">
                    <div>
                        <h2 className="font-serif font-medium text-4xl text-brand-heading mb-6">
                            The <em className="italic text-brand-tobacco">details</em>
                        </h2>
                        <dl className="divide-y divide-dashed divide-border border-y border-dashed border-border">
                            {details.map((d) => (
                                <div key={d.label} className="flex justify-between gap-6 py-4">
                                    <dt className="font-mono text-xs uppercase tracking-[0.14em] text-brand-heading pt-1">{d.label}</dt>
                                    <dd className="text-right text-foreground/85">{d.value}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                    <div>
                        <h2 className="font-serif font-medium text-4xl text-brand-heading mb-6">
                            Meal <em className="italic text-brand-tobacco">prices</em>
                        </h2>
                        <dl className="divide-y divide-dashed divide-border border-y border-dashed border-border">
                            {prices.map((p) => (
                                <div key={p.label} className="flex justify-between gap-6 py-4">
                                    <dt className="text-lg text-foreground/85">{p.label}</dt>
                                    <dd className="font-serif text-2xl font-semibold text-brand-espresso">{p.value}</dd>
                                </div>
                            ))}
                        </dl>
                        <p className="text-sm text-muted-foreground mt-4">
                            Juice and ginger shot bundles are on the <Link href="/bundles" className="underline">Bundles</Link> page.
                        </p>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="bg-muted">
                <div className="container mx-auto px-4 py-14 text-center space-y-4">
                    <h2 className="font-serif font-medium text-4xl md:text-5xl text-brand-heading">
                        What are you <em className="italic text-brand-tobacco">craving?</em>
                    </h2>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                        <Link href="/menu" className="inline-flex items-center justify-center gap-3 h-12 px-6 rounded-lg bg-primary text-primary-foreground font-mono text-xs uppercase tracking-[0.18em]">
                            Order meal prep <span aria-hidden="true">→</span>
                        </Link>
                        <Link href="/faq" className="inline-flex items-center justify-center gap-3 h-12 px-6 rounded-lg border border-primary text-primary font-mono text-xs uppercase tracking-[0.18em]">
                            Questions? See the FAQ <span aria-hidden="true">→</span>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default HowItWorks
