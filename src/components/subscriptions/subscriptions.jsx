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

const steps = [
    {
        n: "01",
        title: "Pick a bundle",
        text: "Choose 5 or 10 meals (or a juice bundle) and how often: every week or every 2 weeks.",
    },
    {
        n: "02",
        title: "Pick your favorites",
        text: "Mix and match from this week's menu, all one flavor or a little of everything.",
    },
    {
        n: "03",
        title: "Pick again each week",
        text: "My menu changes, so pick new favorites from your account before the Sunday cutoff. If you don't, I'll repeat your last picks.",
    },
    {
        n: "04",
        title: "Delivered fresh",
        text: "Every Monday or Tuesday, or pick up. Just heat and enjoy.",
    },
]

const perks = [
    "Pick new meals every week, right from your account",
    "Forget to pick? I'll repeat your last picks for you",
    "Something off the menu? I'll swap in a chef's choice",
    "Skip a week or pause anytime, no fees",
]

const faqs = [
    {
        q: "When am I charged?",
        a: "Your first order is charged at checkout. After that, your card is charged at the Sunday cutoff before each delivery.",
    },
    {
        q: "What if a meal I picked isn't on the menu that week?",
        a: "My menu rotates, so if something you picked isn't available, I'll swap in a chef's choice from the same part of the menu, so you never miss a delivery.",
    },
    {
        q: "Can I subscribe to single meals?",
        a: "Subscriptions are for bundles, so you can pick new meals every week as my menu changes. Single meals and juices can always be ordered one time.",
    },
    {
        q: "Can I skip a week or stop?",
        a: "Yes! Skip a week or pause your subscription anytime from your account. It stays paused until you resume it.",
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
            {/* Hero */}
            <section className="container mx-auto px-4 pt-10 pb-14 md:pt-14 md:pb-20 text-center">
                <motion.div initial="initial" animate="animate" variants={fadeUp} className="max-w-3xl mx-auto space-y-5">
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-brand-heading">
                        <span className="text-brand-matcha">■</span> Subscriptions
                    </p>
                    <h1 className="font-serif font-medium text-5xl md:text-7xl leading-[0.98] text-brand-heading">
                        Your meals, <em className="italic text-brand-tobacco">every week</em>
                    </h1>
                    <p className="text-lg md:text-xl text-foreground/85 leading-relaxed">
                        Pick a bundle once and it shows up every week or every 2 weeks. My menu changes, so you get to pick new
                        favorites each week, or I&apos;ll repeat your last picks for you.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                        <Link
                            href="/bundles?subscribe=weekly"
                            className="inline-flex items-center justify-center gap-3 h-12 px-6 rounded-lg bg-primary text-primary-foreground font-mono text-xs uppercase tracking-[0.18em] hover:bg-primary/90 transition-colors"
                        >
                            Start my subscription <span aria-hidden="true">→</span>
                        </Link>
                        <Link
                            href="/menu"
                            className="inline-flex items-center justify-center gap-3 h-12 px-6 rounded-lg border border-primary text-primary font-mono text-xs uppercase tracking-[0.18em] hover:bg-primary/5 transition-colors"
                        >
                            See this week&apos;s menu <span aria-hidden="true">→</span>
                        </Link>
                    </div>
                </motion.div>
            </section>

            {/* How it works */}
            <section className="bg-muted">
                <div className="container mx-auto px-4 py-16 md:py-20">
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-brand-heading text-center mb-3">
                        <span className="text-brand-matcha">■</span> How it works
                    </p>
                    <h2 className="font-serif font-medium text-4xl md:text-5xl text-brand-heading text-center mb-10">
                        Simple, <em className="italic text-brand-tobacco">every week</em>
                    </h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {steps.map((s) => (
                            <div key={s.n} className="bg-background rounded-2xl p-6 space-y-2">
                                <p className="font-serif italic text-3xl text-brand-tobacco">{s.n}</p>
                                <h3 className="font-serif text-2xl font-semibold text-brand-espresso">{s.title}</h3>
                                <p className="text-muted-foreground leading-relaxed">{s.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Bundles you can subscribe to */}
            <section className="container mx-auto px-4 py-16 md:py-20">
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

            {/* FAQ */}
            <section className="bg-muted">
                <div className="container mx-auto px-4 py-16 md:py-20 max-w-3xl">
                    <h2 className="font-serif font-medium text-4xl md:text-5xl text-brand-heading text-center mb-10">
                        Good to <em className="italic text-brand-tobacco">know</em>
                    </h2>
                    <div className="space-y-4">
                        {faqs.map((f) => (
                            <div key={f.q} className="bg-background rounded-2xl p-6">
                                <h3 className="font-serif text-2xl font-semibold text-brand-espresso mb-2">{f.q}</h3>
                                <p className="text-foreground/85 leading-relaxed">{f.a}</p>
                            </div>
                        ))}
                    </div>
                    <div className="text-center pt-10">
                        <Link
                            href="/bundles?subscribe=weekly"
                            className="inline-flex items-center justify-center gap-3 h-12 px-6 rounded-lg bg-primary text-primary-foreground font-mono text-xs uppercase tracking-[0.18em] hover:bg-primary/90 transition-colors"
                        >
                            Start my subscription <span aria-hidden="true">→</span>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Subscriptions
