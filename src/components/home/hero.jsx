'use client'
import React from 'react'
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";

const HeroSection = () => {
    return (
        <section className="container mx-auto px-4 pt-10 pb-16 md:pt-14 md:pb-24">
            <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
                <motion.div
                    className="space-y-6"
                    initial="initial"
                    animate="animate"
                    variants={{ animate: { transition: { staggerChildren: 0.05 } } }}
                >
                    <motion.p
                        variants={fadeUp}
                        className="inline-block font-mono text-[11px] sm:text-xs uppercase tracking-[0.12em] sm:tracking-[0.18em] text-brand-heading border border-brand-tobacco/60 rounded-full px-4 py-1.5"
                    >
                        <span className="text-brand-matcha">■</span> Fresh meal prep, delivered weekly
                    </motion.p>

                    <motion.h1
                        variants={fadeUp}
                        className="font-serif font-medium text-[3.25rem] leading-[0.98] sm:text-6xl lg:text-7xl xl:text-[5.5rem] text-brand-heading text-balance"
                    >
                        What are you <em className="italic text-brand-tobacco">craving?</em>
                    </motion.h1>

                    <motion.p
                        variants={fadeUp}
                        className="text-lg md:text-xl text-foreground/85 leading-relaxed max-w-xl"
                    >
                        Homemade meal prep delivered every week, plus custom cakes, desserts, events and private chef nights,{" "}
                        <span className="border-b-2 border-dashed border-brand-tobacco">made fresh, with love</span>{" "}
                        in Eastvale.
                    </motion.p>

                    <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 pt-2">
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
                    </motion.div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="relative pb-10"
                >
                    <div className="aspect-[10/9] rounded-[18px] overflow-hidden bg-muted">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="/brand/home-hero.jpg"
                            alt="Teriyaki chicken meal prep bowls with rice and broccoli"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <p className="absolute top-4 right-4 rounded-full bg-brand-matcha-light px-4 py-2 font-mono text-[11px] sm:text-xs uppercase tracking-[0.14em] text-brand-espresso shadow-md">
                        $17 a meal · 10 for $160
                    </p>

                    {/* Seasonal card — remove after the holidays */}
                    <Link
                        href="/christmas"
                        className="absolute left-0 sm:-left-6 bottom-0 w-[250px] flex items-center gap-3 bg-background p-3 shadow-xl [clip-path:polygon(14px_0,calc(100%-14px)_0,100%_14px,100%_calc(100%-14px),calc(100%-14px)_100%,14px_100%,0_calc(100%-14px),0_14px)]"
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="/gallery/cakes/cake-22.jpg"
                            alt=""
                            className="w-[68px] h-[68px] rounded-lg object-cover shrink-0"
                        />
                        <span className="flex flex-col">
                            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-brand-heading"><span className="text-brand-matcha">■</span> New this season</span>
                            <span className="font-serif text-xl font-semibold leading-tight text-brand-espresso">Christmas Mini Cakes</span>
                            <span className="text-sm font-medium text-brand-espresso border-b border-dashed border-brand-tobacco self-start">Order yours →</span>
                        </span>
                    </Link>
                </motion.div>
            </div>
        </section>
    )
}

export default HeroSection
