'use client'
import React from 'react'
import { motion } from "framer-motion";
import { fadeUp, slideInLeft } from "@/lib/animations";

const OurStory = () => {
    return (
        <section id="our-story" className="container mx-auto px-4 py-16">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <motion.div
                    variants={slideInLeft}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7 }}
                    className="relative order-2 md:order-1"
                >
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                        className="aspect-square rounded-2xl overflow-hidden bg-muted"
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="/brand/about-hero.jpg"
                            alt="Ash's Cravings in the kitchen"
                            loading="lazy"
                            className="w-full h-full object-cover"
                        />
                    </motion.div>
                </motion.div>

                <motion.div
                    className="space-y-6 order-1 md:order-2"
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={{
                        animate: {
                            transition: {
                                staggerChildren: 0.1
                            }
                        }
                    }}
                >
                    <motion.h2
                        variants={fadeUp}
                        className="text-3xl md:text-4xl font-bold text-balance"
                    >
                        Our Story
                    </motion.h2>

                    <motion.p
                        variants={fadeUp}
                        className="text-lg text-muted-foreground leading-relaxed"
                    >
                        At Ash's Cravings, we believe in nourishing the body without
                        sacrificing flavor. Every meal is made fresh with organic
                        ingredients and homestyle care, crafted by a chef passionate
                        about real food and balanced nutrition. Whether you're fueling
                        your week or treating yourself, our menu brings comfort,
                        convenience, and quality to every bite.
                    </motion.p>
                </motion.div>
            </div>
        </section>
    )
}

export default OurStory
