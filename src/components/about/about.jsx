'use client'
import React from 'react'
import Link from "next/link";
import { motion } from "framer-motion"
import { fadeUp } from "@/lib/animations"

const values = [
    {
        title: "Made from scratch",
        description: "Every meal, cake and dessert is made by hand, fresh each week.",
    },
    {
        title: "Made with love",
        description: "The way my grandma taught me, with the goal of making you happy.",
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
                        <p className="font-mono text-xs uppercase tracking-[0.18em] text-brand-heading">■ My story</p>
                        <h1 className="font-serif font-medium text-[3.25rem] leading-[0.98] sm:text-6xl lg:text-7xl text-brand-heading">
                            Hi, I&apos;m <em className="italic">Ash</em>
                        </h1>
                        <p className="text-lg md:text-xl text-foreground/85 leading-relaxed">
                            I&apos;m the chef behind Ash&apos;s Cravings. I make weekly meal prep, custom cakes,
                            desserts, food for your events and private chef dinners, all from scratch,
                            right here in Eastvale.
                        </p>
                        <p className="text-lg md:text-xl text-foreground/85 leading-relaxed">
                            When you eat my food, I just want you to feel happy and the most satisfied.
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
                <div className="container mx-auto px-4 py-16 md:py-24">
                    <motion.div {...reveal} className="max-w-3xl mx-auto text-center space-y-6">
                        <p className="font-mono text-xs uppercase tracking-[0.18em] text-brand-heading">■ Where it all started</p>
                        <h2 className="font-serif font-medium text-4xl md:text-5xl text-brand-heading text-balance">
                            In the kitchen with <em className="italic">my grandma</em>
                        </h2>
                        <p className="text-lg text-foreground/85 leading-relaxed">
                            I&apos;ve been in the kitchen my whole life. Ever since I was little, I was right next
                            to my grandma. She has always been the number one chef I know. She taught me so much
                            and really helped me find my love for food and cooking.
                        </p>
                        <p className="text-lg text-foreground/85 leading-relaxed">
                            We both truly shared the love of making people happy through food. She&apos;s passed
                            now, but that love is in everything I make.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Culinary school + Ash's Cravings */}
            <section className="container mx-auto px-4 py-16 md:py-24">
                <div className="grid md:grid-cols-2 gap-10 md:gap-16">
                    <motion.div {...reveal} className="space-y-4">
                        <p className="font-mono text-xs uppercase tracking-[0.18em] text-brand-heading">■ Culinary school</p>
                        <h2 className="font-serif font-medium text-4xl md:text-5xl text-brand-heading">
                            Class of <em className="italic">2024</em>
                        </h2>
                        <p className="text-lg text-foreground/85 leading-relaxed">
                            Ash&apos;s Cravings was the first thing on my mind when I started culinary school a
                            couple of years ago. I graduated in 2024, and now I get to cook for you every week.
                        </p>
                    </motion.div>
                    <motion.div {...reveal} className="space-y-4">
                        <p className="font-mono text-xs uppercase tracking-[0.18em] text-brand-heading">■ Outside the kitchen</p>
                        <h2 className="font-serif font-medium text-4xl md:text-5xl text-brand-heading">
                            My <em className="italic">little family</em>
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
