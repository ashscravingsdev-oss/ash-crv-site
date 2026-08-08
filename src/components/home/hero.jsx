'use client'
import React from 'react'
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, slideInRight } from "@/lib/animations";

const HeroSection = () => {
    return (
        <section className="container mx-auto px-4 pb-16 md:pt-4 pt-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <motion.div
                    className="space-y-6"
                    initial="initial"
                    animate="animate"
                    variants={{
                        animate: {
                            transition: {
                                staggerChildren: 0.1
                            }
                        }
                    }}
                >
                    <motion.div variants={fadeUp}>
                        <Badge variant='secondary'>
                            Deliveries Mondays & Tuesdays
                        </Badge>
                    </motion.div>

                    <motion.h1
                        variants={fadeUp}
                        className="text-4xl md:text-5xl lg:text-6xl font-bold text-balance leading-tight"
                    >
                        Healthy meals & juices delivered to your door
                    </motion.h1>

                    <motion.p
                        variants={fadeUp}
                        className="text-lg font-semibold text-primary"
                    >
                        Fresh. Organic. Chef-Crafted meals.
                    </motion.p>

                    <motion.p
                        variants={fadeUp}
                        className="text-lg text-muted-foreground leading-relaxed"
                    >
                        Chef-crafted meal prep and cold-pressed wellness juices made with
                        organic ingredients. Save time, eat better, feel amazing.
                    </motion.p>

                    <motion.div
                        variants={fadeUp}
                        className="flex flex-col sm:flex-row gap-4"
                    >
                        <Button size="lg" asChild className="text-base">
                            <Link href="/menu">Browse Menu</Link>
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            asChild
                            className="text-base bg-transparent"
                        >
                            <Link href="/subscriptions">View Plans</Link>
                        </Button>
                    </motion.div>
                </motion.div>

                <motion.div
                    variants={slideInRight}
                    initial="initial"
                    animate="animate"
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="relative"
                >
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                        className="aspect-square rounded-2xl overflow-hidden bg-muted"
                    >
                        <img
                            src="/brand/home-hero.jpg"
                            alt="Fresh meal prep bowls"
                            className="w-full h-full object-cover"
                        />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}

export default HeroSection