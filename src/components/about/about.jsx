'use client'
import React from 'react'
import Link from "next/link";
import { motion } from "framer-motion"
import { fadeUp } from "@/lib/animations"

const values = [
    {
        title: "Real, fresh food",
        description: "Every meal, cake and dessert is made from scratch, fresh each week.",
    },
    {
        title: "Made with love",
        description: "The way my grandmas taught me, with the goal of making you happy.",
    },
    {
        title: "Made for you",
        description: "No rice, extra veggies, extra protein, allergies. Just tell me and I'll make it work.",
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
                        <p className="font-mono text-xs uppercase tracking-[0.18em] text-brand-heading"><span className="text-brand-matcha">■</span> My story</p>
                        <h1 className="font-serif font-medium text-[3.25rem] leading-[0.98] sm:text-6xl lg:text-7xl text-brand-heading">
                            Hi, I&apos;m <em className="italic text-brand-tobacco">Ash</em>
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
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="aspect-[4/5] max-w-lg w-full md:ml-auto rounded-[18px] overflow-hidden bg-muted"
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="/brand/about-hero.jpg"
                            alt="Ash in the kitchen"
                            className="w-full h-full object-cover"
                        />
                    </motion.div>
                </div>
            </section>

            {/* Grandma */}
            <section className="bg-muted">
                <div className="container mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
                    <motion.figure {...reveal} className="relative order-2 md:order-1 max-w-lg w-full mx-auto md:mx-0 aspect-[9/10] rounded-[18px] overflow-hidden bg-background">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="/brand/about-grandma.jpg"
                            alt="Young Ash and her grandma Maria Elena making pupusas from scratch"
                            loading="lazy"
                            className="w-full h-full object-cover object-[center_30%]"
                        />
                        <figcaption className="absolute left-3 bottom-3 whitespace-nowrap rounded-full bg-background/90 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-brand-espresso">
                            Me &amp; my grandma Maria Elena ♡
                        </figcaption>
                    </motion.figure>
                    <motion.div {...reveal} className="order-1 md:order-2 max-w-xl space-y-6">
                        <p className="font-mono text-xs uppercase tracking-[0.18em] text-brand-heading"><span className="text-brand-matcha">■</span> Where it all started</p>
                        <h2 className="font-serif font-medium text-4xl md:text-5xl text-brand-heading text-balance">
                            In the kitchen with <em className="italic text-brand-tobacco">my grandmas</em>
                        </h2>
                        <p className="text-lg text-foreground/85 leading-relaxed">
                            I&apos;ve been in the kitchen my whole life. I was blessed with two of the best grandmas
                            in the world, my grandma Maria Elena and my grandma Alicia. They both helped raise me,
                            and they&apos;re the best chefs I know. Growing up right next to them is how I learned
                            to cook, Mexican food most of all.
                        </p>
                        <p className="text-lg text-foreground/85 leading-relaxed">
                            In the photo, that&apos;s me and my grandma Maria Elena making pupusas from scratch. She
                            made the best ones, and I loved making them with her. She passed a couple of years ago,
                            but that love is in everything I make.
                        </p>
                        <p className="text-lg text-foreground/85 leading-relaxed">
                            My grandma Alicia is still the best and still makes our family go round. They both
                            taught me the love of making people happy through food, and that&apos;s what
                            Ash&apos;s Cravings is all about.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Culinary school + Ash's Cravings */}
            <section className="container mx-auto px-4 py-16 md:py-24">
                <div className="grid md:grid-cols-2 gap-10 md:gap-16">
                    <motion.div {...reveal} className="space-y-4">
                        <p className="font-mono text-xs uppercase tracking-[0.18em] text-brand-heading"><span className="text-brand-matcha">■</span> Culinary school</p>
                        <h2 className="font-serif font-medium text-4xl md:text-5xl text-brand-heading">
                            Class of <em className="italic text-brand-tobacco">2024</em>
                        </h2>
                        <p className="text-lg text-foreground/85 leading-relaxed">
                            Ash&apos;s Cravings was truly the first thing on my mind when I went to culinary school a
                            couple of years ago. I graduated in 2024, and now I get to cook for you every week.
                        </p>
                    </motion.div>
                    <motion.div {...reveal} className="space-y-4">
                        <p className="font-mono text-xs uppercase tracking-[0.18em] text-brand-heading"><span className="text-brand-matcha">■</span> Outside the kitchen</p>
                        <h2 className="font-serif font-medium text-4xl md:text-5xl text-brand-heading">
                            My <em className="italic text-brand-tobacco">little family</em>
                        </h2>
                        <p className="text-lg text-foreground/85 leading-relaxed">
                            When I&apos;m not cooking, I&apos;m with my beautiful little family: my fiancé, who I
                            love so much, and our toy poodle, Cash, my baby boy.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Values */}
            <section className="bg-muted">
                <div className="container mx-auto px-4 py-16 md:py-20">
                    <div className="grid md:grid-cols-3 gap-5">
                        {values.map((value) => (
                            <motion.div {...reveal} key={value.title} className="bg-background rounded-2xl p-6 md:p-8 space-y-2">
                                <h3 className="font-serif text-2xl md:text-3xl font-semibold text-brand-espresso">{value.title}</h3>
                                <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                            </motion.div>
                        ))}
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center pt-10">
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
                </div>
            </section>
        </>
    )
}

export default About
