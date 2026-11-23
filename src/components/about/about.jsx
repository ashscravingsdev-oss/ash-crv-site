'use client'
import React from 'react'
import Link from "next/link";
import { motion } from "framer-motion"
import { Plus } from "lucide-react"
import { fadeUp } from "@/lib/animations"
import { SpotImg } from "@/components/site-photos";

// "Get to know Ash": tap a question to open it
const getToKnow = [
    {
        q: "Where did the name Ash's Cravings come from?",
        a: "A chef friend I met long before culinary school came up with it, and I knew right away it was the one. It works for meals and desserts, but mostly it's just true: I'm always craving something. I could honestly eat every hour (the right foods, of course).",
    },
    {
        q: "What did you grow up eating?",
        a: "Everything! My grandmas on both sides cooked for our whole family every single day, so I grew up on every kind of Mexican food you can think of. Enchiladas and pozole are still my favorites.",
    },
    {
        q: "A dish from your grandma you still make?",
        a: "Pozole and birria, just the way she taught me.",
    },
    {
        q: "What could you eat every single day?",
        a: "Sushi and pho, no question. Honestly, anything with rice. I really love rice.",
    },
    {
        q: "Sweet or savory?",
        a: "I genuinely can't choose. I love both, which is probably why I make both.",
    },
    {
        q: "Go-to late-night snack?",
        a: "Peanut butter and jelly with fresh strawberry jam. Simple, but perfect.",
    },
]

const reveal = {
    initial: "initial",
    whileInView: "animate",
    viewport: { once: true, amount: 0.2 },
    variants: fadeUp,
}

const About = () => {
    return (
        <>
            {/* Intro */}
            <section className="container mx-auto px-4 pt-10 pb-16 md:pt-14 md:pb-24">
                <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-center">
                    <motion.div {...reveal} className="space-y-5">
                        <p className="font-serif italic text-xl md:text-2xl text-brand-tobacco"><span aria-hidden="true" className="not-italic text-brand-matcha text-[0.55em] align-[0.2em] mr-2">■</span>My story</p>
                        <h1 className="font-serif font-semibold text-[3.25rem] leading-[0.98] sm:text-6xl lg:text-7xl text-brand-heading">
                            Hi, I&apos;m <em className="italic font-medium text-brand-tobacco">Ash</em>
                        </h1>
                        <p className="text-lg md:text-xl text-foreground/85 leading-relaxed">
                            I&apos;m a culinary school-trained chef and the founder of Ash&apos;s Cravings. Food has
                            always been my passion, and I love cooking across every cuisine.
                        </p>
                        <p className="text-lg md:text-xl text-foreground/85 leading-relaxed">
                            I believe eating well and feeling good should never mean giving up what you crave. That&apos;s
                            why I cook with real, fresh ingredients and make every craving my way. My goal is simple:
                            every bite should leave you happy and truly satisfied.
                        </p>
                        <p className="text-lg md:text-xl text-foreground/85 leading-relaxed">
                            Everything at Ash&apos;s Cravings is made from scratch, from weekly meal prep that actually
                            tastes amazing to custom cakes with every little detail done by hand. If you&apos;re craving
                            it, I&apos;ll make it with love.
                        </p>
                    </motion.div>
                    <div className="relative max-w-lg w-full md:ml-auto">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                            className="aspect-[4/5] w-full rounded-[18px] overflow-hidden bg-muted"
                        >
                            <SpotImg
                                spot="about.hero"
                                className="w-full h-full object-cover"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Grandma */}
            <section className="container mx-auto px-4 pb-14 md:pb-20">
                <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center border-t border-brand-tobacco/20 pt-14 md:pt-20">
                    <motion.figure {...reveal} className="relative order-2 md:order-1 max-w-lg w-full mx-auto md:mx-0 aspect-[9/10] rounded-[18px] overflow-hidden bg-muted">
                        <SpotImg
                            spot="about.grandma"
                            loading="lazy"
                            className="w-full h-full object-cover object-[center_30%]"
                        />
                        <figcaption className="absolute left-3 bottom-3 whitespace-nowrap rounded-full bg-background/90 px-3.5 py-1 font-serif italic text-[15px] text-brand-espresso">
                            Me &amp; my grandma Maria Elena ♡
                        </figcaption>
                    </motion.figure>
                    <motion.div {...reveal} className="order-1 md:order-2 max-w-xl space-y-6">
                        <p className="font-serif italic text-xl md:text-2xl text-brand-tobacco"><span aria-hidden="true" className="not-italic text-brand-matcha text-[0.55em] align-[0.2em] mr-2">■</span>Where it all started</p>
                        <h2 className="font-serif font-medium text-4xl md:text-5xl text-brand-heading text-balance">
                            In the kitchen with <em className="italic text-brand-tobacco">my grandma</em>
                        </h2>
                        <p className="text-lg text-foreground/85 leading-relaxed">
                            I grew up in the kitchen, right beside my grandma, the best chef I know.
                            Everything I know about cooking, I learned from her.
                        </p>
                        <p className="text-lg text-foreground/85 leading-relaxed">
                            She taught me that food is how you show love, and that love goes into everything
                            I make.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Class of 2024: text on the left, photo on the right */}
            <section className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center border-t border-brand-tobacco/20 py-14 md:py-20">
                    <motion.div {...reveal} className="max-w-xl space-y-6">
                        <p className="font-serif italic text-xl md:text-2xl text-brand-tobacco"><span aria-hidden="true" className="not-italic text-brand-matcha text-[0.55em] align-[0.2em] mr-2">■</span>Culinary school</p>
                        <h2 className="font-serif font-medium text-4xl md:text-5xl text-brand-heading">
                            Class of <em className="italic text-brand-tobacco">2024</em>
                        </h2>
                        <p className="text-lg text-foreground/85 leading-relaxed">
                            Ash&apos;s Cravings was truly the first thing on my mind when I went to culinary school a
                            couple of years ago. I graduated in 2024, and now I get to cook for you every week.
                        </p>
                    </motion.div>
                    <motion.figure {...reveal} className="max-w-md w-full mx-auto md:mr-0 aspect-[4/5] rounded-[18px] overflow-hidden bg-muted">
                        <SpotImg spot="about.kitchen" loading="lazy" className="w-full h-full object-cover" />
                    </motion.figure>
                </div>
            </section>

            {/* Made to nourish: a quiet, centered pause in the middle of the story */}
            <section className="container mx-auto px-4">
                <motion.div {...reveal} className="border-t border-brand-tobacco/20 py-16 md:py-24">
                    <div className="max-w-2xl mx-auto text-center space-y-5">
                        <p className="font-serif italic text-xl md:text-2xl text-brand-tobacco"><span aria-hidden="true" className="not-italic text-brand-matcha text-[0.55em] align-[0.2em] mr-2">■</span>My why</p>
                        <h2 className="font-serif font-medium text-4xl md:text-6xl text-brand-heading">
                            Made to <em className="italic text-brand-tobacco">nourish</em>
                        </h2>
                        <p className="text-lg text-foreground/85 leading-relaxed">
                            Not long after I graduated from culinary school, my health took a turn. I spent the next
                            two years working closely with a holistic doctor, and it completely changed the way I think
                            about food. I learned that what we eat plays the biggest role in how we feel, and I&apos;ve
                            been studying it ever since.
                        </p>
                        <p className="text-lg text-foreground/85 leading-relaxed">
                            That&apos;s why everything I make starts with real ingredients, balanced and colorful, the
                            way home cooking should be. Food that tastes amazing and helps you feel your best.
                        </p>
                    </div>
                </motion.div>
            </section>

            {/* My little family: picture on the left, words on the right */}
            <section className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center border-t border-brand-tobacco/20 py-14 md:py-20">
                    <motion.figure {...reveal} className="order-2 md:order-1 relative max-w-md w-full mx-auto md:mx-0 aspect-[4/5] rounded-[18px] overflow-hidden bg-muted">
                        <SpotImg spot="about.family" loading="lazy" className="w-full h-full object-cover" />
                        <figcaption className="absolute left-3 bottom-3 whitespace-nowrap rounded-full bg-background/90 px-3.5 py-1 font-serif italic text-[15px] text-brand-espresso">
                            My baby boy, Cash
                        </figcaption>
                    </motion.figure>
                    <motion.div {...reveal} className="order-1 md:order-2 max-w-xl space-y-6">
                        <p className="font-serif italic text-xl md:text-2xl text-brand-tobacco"><span aria-hidden="true" className="not-italic text-brand-matcha text-[0.55em] align-[0.2em] mr-2">■</span>Outside the kitchen</p>
                        <h2 className="font-serif font-medium text-4xl md:text-5xl text-brand-heading">
                            My <em className="italic text-brand-tobacco">little family</em>
                        </h2>
                        <p className="text-lg text-foreground/85 leading-relaxed">
                            When I&apos;m not cooking, I&apos;m with my beautiful little family: my fiancé, who I love so
                            much, and our toy poodle, Cash, my baby boy.
                        </p>
                        <figure className="flex items-center gap-5 pt-2">
                            <SpotImg
                                spot="about.first-logo"
                                px={400}
                                loading="lazy"
                                className="w-32 h-32 md:w-40 md:h-40 shrink-0 rounded-full object-cover ring-1 ring-border shadow-sm"
                            />
                            <figcaption className="space-y-1">
                                <span className="block font-serif italic text-xl text-brand-espresso">My very first logo ♡</span>
                                <span className="block text-muted-foreground leading-relaxed">
                                    My fiancé made it for me. Look closely and you&apos;ll find Cashy hiding up top!
                                </span>
                            </figcaption>
                        </figure>
                    </motion.div>
                </div>
            </section>

            {/* Get to know Ash: centered, questions open with a tap */}
            <section className="container mx-auto px-4">
                <div className="border-t border-brand-tobacco/20 py-14 md:py-20">
                    <motion.div {...reveal} className="text-center space-y-3">
                        <p className="font-serif italic text-xl md:text-2xl text-brand-tobacco"><span aria-hidden="true" className="not-italic text-brand-matcha text-[0.55em] align-[0.2em] mr-2">■</span>More about me</p>
                        <h2 className="font-serif font-medium text-4xl md:text-5xl text-brand-heading">
                            Get to know <em className="italic text-brand-tobacco">Ash</em>
                        </h2>
                    </motion.div>
                    <motion.div {...reveal} className="max-w-3xl mx-auto mt-8 md:mt-10 border-t border-brand-tobacco/20">
                        {getToKnow.map((item, i) => (
                            <details key={item.q} open={i === 0} className="group border-b border-brand-tobacco/20">
                                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-serif text-[1.45rem] md:text-[1.7rem] leading-tight text-brand-espresso [&::-webkit-details-marker]:hidden">
                                    {item.q}
                                    <Plus aria-hidden="true" className="h-5 w-5 shrink-0 text-brand-tobacco transition-transform duration-200 group-open:rotate-45" />
                                </summary>
                                <p className="-mt-1 pb-6 pr-8 text-lg leading-relaxed text-foreground/80">{item.a}</p>
                            </details>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Sign-off */}
            <section className="container mx-auto px-4 pt-4 pb-20 md:pb-28">
                <motion.div {...reveal} className="rounded-[22px] bg-muted px-6 py-12 md:py-16 text-center">
                    <h2 className="font-serif font-medium text-4xl md:text-5xl text-brand-heading">
                        Made just for <em className="italic text-brand-tobacco">you</em>
                    </h2>
                    <p className="mt-4 mx-auto max-w-xl text-lg text-foreground/85 leading-relaxed">
                        No rice, extra veggies, extra protein, allergies? Just tell me, and I&apos;ll make it work.
                    </p>
                    <p className="mt-5 font-serif italic text-2xl text-brand-tobacco">With love, Ash</p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center pt-8">
                        <Link
                            href="/menu"
                            className="inline-flex items-center justify-center gap-3 h-12 px-6 rounded-lg bg-primary text-primary-foreground font-mono text-xs uppercase tracking-[0.18em] hover:bg-primary/90 transition-colors"
                        >
                            Order meal prep <span aria-hidden="true">→</span>
                        </Link>
                        <Link
                            href="/custom-cakes"
                            className="inline-flex items-center justify-center gap-3 h-12 px-6 rounded-lg border border-primary text-primary font-mono text-xs uppercase tracking-[0.18em] hover:bg-primary/5 transition-colors"
                        >
                            Request a cake <span aria-hidden="true">→</span>
                        </Link>
                    </div>
                </motion.div>
            </section>
        </>
    )
}

export default About
