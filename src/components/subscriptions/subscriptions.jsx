"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useDispatch, useSelector } from "react-redux"
import { Check } from "lucide-react"
import { fadeUp } from "@/lib/animations"
import { fetchActiveBundles } from "@/store/bundleSlice"
import { SpotImg } from "@/components/site-photos"

const money = (n) => {
    const v = Number(n || 0)
    return `$${v % 1 === 0 ? v : v.toFixed(2)}`
}

// "5 Meals" → 5, so a meal bundle can show its price per meal
const mealCount = (b) => {
    const m = String(b?.name || "").match(/(\d+)\s*meals?/i)
    return m ? parseInt(m[1], 10) : 0
}
const perMeal = (b) => (mealCount(b) ? Number(b.price) / mealCount(b) : 0)

const perks = [
    //   keeps "fully booked" together, so the last word never wraps alone on a phone
    "Your spot is saved, even when I'm fully booked",
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

const START = "/bundles?subscribe=weekly"
const buttonClass =
    "inline-flex items-center justify-center gap-3 h-12 px-6 rounded-lg bg-primary text-primary-foreground font-mono text-xs uppercase tracking-[0.18em] hover:bg-primary/90 transition-colors"
const linkClass = "text-brand-tobacco underline underline-offset-4 decoration-brand-tobacco/40 hover:decoration-brand-tobacco"

const Heading = ({ className = "" }) => (
    <h1 className={`font-serif font-semibold text-5xl md:text-6xl xl:text-7xl leading-[0.98] text-brand-heading ${className}`}>
        Your meals, <em className="italic font-medium text-brand-tobacco">every week</em>
    </h1>
)

const Intro = () => (
    <p className="text-lg md:text-xl text-foreground/85 leading-relaxed">
        Pick a bundle once. Fresh meals every Tuesday, weekly or every other week, for delivery or pickup.
    </p>
)

const Actions = () => (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-4 pt-1">
        <Link href={START} className={buttonClass}>
            Start my subscription <span aria-hidden="true">→</span>
        </Link>
        <Link href="/menu" className={linkClass}>
            See this week&apos;s menu
        </Link>
    </div>
)

const Photo = ({ className = "", children }) => (
    <div className={`relative overflow-hidden bg-muted ${className}`}>
        <SpotImg spot="subscriptions.hero" className="w-full h-full object-cover" />
        {children}
    </div>
)

/** A meal bundle as a little menu card: what's in it, the price, and the price per meal. */
const MealCard = ({ b }) => (
    <Link
        href={START}
        className="group flex flex-col rounded-2xl border border-border bg-card p-6 hover:border-[color:var(--acc)] hover:shadow-md transition"
    >
        <p className="font-serif text-3xl font-semibold text-brand-espresso leading-tight">{b.name}</p>
        {b.description && <p className="text-muted-foreground mt-1">{b.description}</p>}
        <div className="mt-8 flex items-end justify-between gap-4">
            <div>
                <p className="font-serif text-4xl font-semibold text-brand-espresso leading-none">{money(b.price)}</p>
                <p className="text-sm text-muted-foreground mt-2 flex flex-wrap items-center gap-2">
                    a delivery
                    {perMeal(b) > 0 && (
                        <span className="rounded-full bg-[color:var(--acc-soft)] px-2.5 py-0.5 text-[color:var(--acc-ink)]">
                            {money(perMeal(b))} a meal
                        </span>
                    )}
                </p>
            </div>
            <span className="text-brand-tobacco whitespace-nowrap transition-transform group-hover:translate-x-1">
                Start <span aria-hidden="true">→</span>
            </span>
        </div>
    </Link>
)

/** Any other bundle (like juices) as a slim row under the meal cards. */
const OtherRow = ({ b }) => (
    <Link
        href={START}
        className="flex items-center justify-between gap-4 rounded-2xl border border-border bg-card px-6 py-4 hover:border-brand-tobacco transition-colors"
    >
        <div className="min-w-0">
            <p className="font-serif text-2xl font-semibold text-brand-espresso leading-tight">{b.name}</p>
            {b.description && <p className="text-sm text-muted-foreground mt-0.5">{b.description}</p>}
        </div>
        <p className="shrink-0 text-right">
            <span className="font-serif text-2xl font-semibold text-brand-espresso">{money(b.price)}</span>
            <span className="block text-sm text-muted-foreground">a delivery</span>
        </p>
    </Link>
)

const Bundles = ({ meals, others }) =>
    meals.length + others.length === 0 ? (
        <p className="text-muted-foreground">Subscription bundles are coming soon!</p>
    ) : (
        <div className="space-y-4">
            {meals.length > 0 && (
                <div className="grid sm:grid-cols-2 gap-4">
                    {meals.map((b) => (
                        <MealCard key={b.id} b={b} />
                    ))}
                </div>
            )}
            {others.map((b) => (
                <OtherRow key={b.id} b={b} />
            ))}
        </div>
    )

const PerkList = ({ className = "" }) => (
    <ul className={className}>
        {perks.map((p) => (
            <li key={p} className="flex items-start gap-3 text-lg text-foreground/85">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[color:var(--acc-soft)]">
                    <Check className="h-3.5 w-3.5 text-[color:var(--acc-ink)]" strokeWidth={3} />
                </span>
                <span>{p}</span>
            </li>
        ))}
    </ul>
)

const Details = () => (
    <section className="bg-[color:var(--acc-wash)]">
        <div className="container mx-auto px-4 py-14 md:py-16">
            <h2 className="font-serif font-medium text-3xl md:text-4xl text-brand-heading mb-8">
                Good to <em className="italic text-brand-tobacco">know</em>
            </h2>
            <dl className="grid md:grid-cols-3 gap-x-10 gap-y-7">
                {details.map((d) => (
                    <div key={d.q} className="border-t-2 border-[color:var(--acc-soft)] pt-4">
                        <dt className="font-serif text-xl font-semibold text-brand-espresso">{d.q}</dt>
                        <dd className="mt-1.5 text-foreground/80 leading-relaxed">{d.a}</dd>
                    </div>
                ))}
            </dl>
            <p className="mt-10 text-foreground/80">
                Anything else?{" "}
                <Link href="/contact" className={linkClass}>
                    Just ask me
                </Link>
                .
            </p>
        </div>
    </section>
)

// The page's soft green touches (the block behind the photo, check circles, price tags, the last band)
const ACCENT = { "--acc": "#7D9150", "--acc-soft": "#E1E8C9", "--acc-wash": "#EEF2E0", "--acc-ink": "#4E6127" }

// A smaller copy of a menu photo (Cloudinary resizes it), added after any crop already in the link
const sized = (url, px = 480) =>
    /res\.cloudinary\.com\/.+\/upload\//.test(url || "")
        ? url.replace(/\/upload\/((?:[^/]+\/)*?)(v\d+\/)/, `/upload/$1w_${px},h_${px},c_fill,q_auto,f_auto/$2`)
        : url

/** This week's meals, so people can see what they'd be picking from. */
const ThisWeek = ({ menu }) =>
    menu.length === 0 ? null : (
        <section className="container mx-auto px-4 pb-14 md:pb-16">
            <div className="flex items-baseline justify-between gap-4 mb-5">
                <h2 className="font-serif font-medium text-3xl md:text-4xl text-brand-heading">
                    On my menu <em className="italic text-brand-tobacco">this week</em>
                </h2>
                <Link href="/menu" className={`${linkClass} whitespace-nowrap`}>
                    Full menu
                </Link>
            </div>
            <div className="-mx-4 px-4 scroll-px-4 flex gap-4 overflow-x-auto snap-x pb-2 md:mx-0 md:px-0 md:overflow-visible md:gap-5">
                {menu.slice(0, 5).map((p) => (
                    <Link key={p.id} href={`/menu/${p.slug}`} className="group w-40 shrink-0 snap-start md:w-auto md:flex-1 md:max-w-[260px]">
                        <div className="aspect-square overflow-hidden rounded-2xl bg-muted">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={sized(p.image_url)}
                                alt={p.name}
                                loading="lazy"
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                        </div>
                        <p className="mt-2.5 font-serif text-lg leading-snug text-brand-espresso">{p.name}</p>
                    </Link>
                ))}
            </div>
        </section>
    )

const Page = ({ meals, others, fromPerMeal, menu }) => (
    <>
        <section className="container mx-auto px-4 pt-8 pb-14 md:pt-14 md:pb-20">
            <div className="grid md:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-14 items-center">
                <motion.div initial="initial" animate="animate" variants={fadeUp} className="space-y-6 max-w-2xl">
                    <Heading />
                    <Intro />
                    <Actions />
                </motion.div>
                <div className="relative mr-3 mb-3 md:mr-0">
                    {/* A soft block of color peeking out behind the photo */}
                    <div aria-hidden="true" className="absolute inset-0 translate-x-3 translate-y-3 md:translate-x-5 md:translate-y-5 rounded-[18px] bg-[color:var(--acc-soft)]" />
                    <Photo className="aspect-[4/3] md:aspect-[5/4] rounded-[18px]">
                        {fromPerMeal > 0 && (
                            <p className="absolute top-4 right-4 rounded-full bg-[color:var(--acc-ink)] px-4 py-2 shadow-md font-serif italic text-lg text-white">
                                from {money(fromPerMeal)} a meal
                            </p>
                        )}
                    </Photo>
                </div>
            </div>
        </section>

        <ThisWeek menu={menu} />

        <section className="container mx-auto px-4 pb-16 md:pb-20">
            <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-16 items-start">
                <div className="space-y-4 lg:pt-2">
                    <h2 className="font-serif font-medium text-4xl md:text-5xl text-brand-heading">
                        Made easy, <em className="italic text-brand-tobacco">your way</em>
                    </h2>
                    <PerkList className="space-y-3.5 pt-2" />
                </div>
                <Bundles meals={meals} others={others} />
            </div>
        </section>
    </>
)

const Subscriptions = () => {
    const dispatch = useDispatch()
    const { bundles } = useSelector((state) => state.bundles)
    const [menu, setMenu] = useState([])

    useEffect(() => {
        dispatch(fetchActiveBundles())
        // This week's meals with a photo
        let alive = true
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products?order_type=meal_prep&limit=100`)
            .then((r) => (r.ok ? r.json() : null))
            .then((d) => {
                const list = (d?.products || []).filter((p) => p.is_active && p.image_url && p.category?.name === "Meals")
                if (alive) setMenu(list)
            })
            .catch(() => {})
        return () => {
            alive = false
        }
    }, [dispatch])

    const { meals, others } = useMemo(() => {
        const all = [...(bundles || [])].sort((a, b) => Number(a.price) - Number(b.price))
        return { meals: all.filter((b) => mealCount(b) > 0), others: all.filter((b) => !mealCount(b)) }
    }, [bundles])
    const fromPerMeal = meals.length ? Math.min(...meals.map(perMeal)) : 0

    return (
        <div style={ACCENT}>
            <Page meals={meals} others={others} fromPerMeal={fromPerMeal} menu={menu} />
            <Details />
        </div>
    )
}

export default Subscriptions
