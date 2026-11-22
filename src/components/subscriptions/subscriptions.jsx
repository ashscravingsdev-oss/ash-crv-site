"use client"

import { useEffect, useMemo } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useDispatch, useSelector } from "react-redux"
import { Check } from "lucide-react"
import { fadeUp } from "@/lib/animations"
import { fetchActiveBundles } from "@/store/bundleSlice"

const money = (n) => {
    const v = Number(n || 0)
    return `$${v % 1 === 0 ? v : v.toFixed(2)}`
}

const perks = [
    // \u00A0 keeps "fully booked" together, so the last word never wraps alone on a phone
    "Your spot is saved, even when I'm fully\u00A0booked",
    "New picks each week, right from your account",
    "Forget to pick? I'll repeat your last ones",
    "Skip a week or pause anytime, no fees",
]

const details = [
    {
        q: "When am I charged?",
        a: "At checkout for your first delivery. After that, on the Sunday before each one.",
    },
    {
        q: "What if a meal I picked is off the menu?",
        a: "I'll swap in a chef's choice, so you never miss a delivery.",
    },
    {
        q: "Can I subscribe to one meal?",
        a: "Subscriptions are for bundles. Single meals are always open as one-time orders.",
    },
]

const Subscriptions = () => {
    const dispatch = useDispatch()
    const { bundles } = useSelector((state) => state.bundles)

    useEffect(() => {
        dispatch(fetchActiveBundles())
    }, [dispatch])

    const sorted = useMemo(
        () => [...(bundles || [])].sort((a, b) => {
            // meal bundles first, then by price
            const am = /meal/i.test(a.name) ? 0 : 1
            const bm = /meal/i.test(b.name) ? 0 : 1
            return am - bm || Number(a.price) - Number(b.price)
        }),
        [bundles]
    )

    return (
        <div>
            {/* Hero: words on one side, real food on the other */}
            <section className="container mx-auto px-4 pt-8 pb-12 md:pt-14 md:pb-14">
                <div className="grid md:grid-cols-[1.3fr_0.7fr] gap-10 lg:gap-16 items-center">
                    <motion.div initial="initial" animate="animate" variants={fadeUp} className="space-y-6 max-w-2xl">
                        <h1 className="font-serif font-medium text-5xl md:text-7xl leading-[0.98] text-brand-heading">
                            Your meals, <em className="italic text-brand-tobacco">every week</em>
                        </h1>
                        <p className="text-lg md:text-xl text-foreground/85 leading-relaxed">
                            Pick a bundle once. Fresh meals every Tuesday, weekly or every other week, for delivery or pickup.
                        </p>
                        <div className="flex flex-wrap items-center gap-x-6 gap-y-4 pt-1">
                            <Link
                                href="/bundles?subscribe=weekly"
                                className="inline-flex items-center justify-center gap-3 h-12 px-6 rounded-lg bg-primary text-primary-foreground font-mono text-xs uppercase tracking-[0.18em] hover:bg-primary/90 transition-colors"
                            >
                                Start my subscription <span aria-hidden="true">→</span>
                            </Link>
                            <Link href="/menu" className="text-brand-tobacco underline underline-offset-4 decoration-brand-tobacco/40 hover:decoration-brand-tobacco">
                                See this week&apos;s menu
                            </Link>
                        </div>
                    </motion.div>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                        <div className="aspect-[4/3] md:aspect-square rounded-[18px] overflow-hidden bg-muted">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src="/gallery/meals/salmon-meal-prep.jpg" alt="Salmon meal prep, packed and ready" className="w-full h-full object-cover" />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Bundles you can subscribe to */}
            <section className="container mx-auto px-4 pt-6 pb-16 md:pt-10 md:pb-20">
                <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
                    <div className="space-y-4">
                        <p className="font-mono text-xs uppercase tracking-[0.18em] text-brand-heading">
                            <span className="text-brand-matcha">■</span> What you get
                        </p>
                        <h2 className="font-serif font-medium text-4xl md:text-5xl text-brand-heading">
                            Made easy, <em className="italic text-brand-tobacco">your way</em>
                        </h2>
                        <ul className="space-y-3 pt-2">
                            {perks.map((p) => (
                                <li key={p} className="flex items-start gap-3 text-lg text-foreground/85">
                                    <Check className="h-5 w-5 text-primary mt-1 shrink-0" />
                                    <span>{p}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="space-y-3">
                        {sorted.length === 0 ? (
                            <p className="text-muted-foreground">Subscription bundles are coming soon!</p>
                        ) : (
                            sorted.map((b) => (
                                <Link
                                    key={b.id}
                                    href="/bundles?subscribe=weekly"
                                    className="flex items-center justify-between gap-4 rounded-2xl border border-border bg-card p-5 hover:border-brand-tobacco transition-colors"
                                >
                                    <div className="min-w-0">
                                        <p className="font-serif text-2xl font-semibold text-brand-espresso leading-tight">{b.name}</p>
                                        {b.description && <p className="text-sm text-muted-foreground mt-0.5">{b.description}</p>}
                                    </div>
                                    <div className="text-right shrink-0">
                                        <p className="font-serif text-3xl font-semibold text-brand-espresso">{money(b.price)}</p>
                                        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">per delivery</p>
                                    </div>
                                </Link>
                            ))
                        )}
                    </div>
                </div>
            </section>

            {/* The little details, short */}
            <section className="bg-muted">
                <div className="container mx-auto px-4 py-14 md:py-16">
                    <h2 className="font-serif font-medium text-3xl md:text-4xl text-brand-heading mb-8">
                        Good to <em className="italic text-brand-tobacco">know</em>
                    </h2>
                    <dl className="grid md:grid-cols-3 gap-x-10 gap-y-7">
                        {details.map((d) => (
                            <div key={d.q} className="border-t border-brand-tobacco/25 pt-4">
                                <dt className="font-serif text-xl font-semibold text-brand-espresso">{d.q}</dt>
                                <dd className="mt-1.5 text-foreground/80 leading-relaxed">{d.a}</dd>
                            </div>
                        ))}
                    </dl>
                    <p className="mt-10 text-foreground/80">
                        Anything else?{" "}
                        <Link href="/contact" className="text-brand-tobacco underline underline-offset-4 decoration-brand-tobacco/40 hover:decoration-brand-tobacco">
                            Just ask me
                        </Link>
                        .
                    </p>
                </div>
            </section>
        </div>
    )
}

export default Subscriptions
