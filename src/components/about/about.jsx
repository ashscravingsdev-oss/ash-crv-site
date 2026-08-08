'use client'
import React from 'react'
import { Card, CardContent } from "@/components/ui/card";
import { Leaf, Users, Award, Heart } from "lucide-react";
import { motion } from "framer-motion"
import { fadeUp, scaleUp } from "@/lib/animations"
const values = [
    {
        icon: Leaf,
        title: "Organic Quality",
        description: "Only the finest organic ingredients from trusted local farms"
    },
    {
        icon: Users,
        title: "Community First",
        description: "Supporting local farmers and sustainable practices"
    },
    {
        icon: Award,
        title: "Excellence",
        description: "Chef-crafted recipes using restaurant-quality techniques"
    },
    {
        icon: Heart,
        title: "Your Health",
        description: "Nutritionally balanced meals designed by experts"
    }
]

const About = () => {
    return (
        <>
            {/* Hero Section */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative text-primary-foreground py-16 md:py-24 overflow-hidden"
            >
                <div className="absolute inset-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src="/brand/about-hero.jpg"
                        alt="Ash's Cravings catering spread"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-primary/80" />
                </div>
                <motion.div
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.3 }}
                    className="relative container mx-auto px-4 text-center"
                >
                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-bold mb-4 text-balance"
                    >
                        Our Story
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-primary-foreground/90 max-w-2xl mx-auto"
                    >
                        Fresh. Organic. Chef-Crafted meals.
                    </motion.p>
                </motion.div>
            </motion.section>

            {/* Mission Section */}
            <section className="container mx-auto px-4 py-16">
                <motion.div
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    className="max-w-3xl mx-auto text-center mb-16"
                >
                    <motion.h2
                        variants={fadeUp}
                        className="text-3xl md:text-4xl font-bold mb-6"
                    >
                        Our Mission
                    </motion.h2>

                    <motion.p
                        variants={fadeUp}
                        className="text-lg text-muted-foreground leading-relaxed"
                    >
                        At Ash's Cravings, we believe in nourishing the body without sacrificing flavor.
                        Every meal is made fresh with organic ingredients and homestyle care, crafted by
                        a chef passionate about real food and balanced nutrition. Whether you're fueling
                        your week or treating yourself, our menu brings comfort, convenience, and quality
                        to every bite.
                    </motion.p>
                </motion.div>

                {/* Values Grid */}
                <motion.div
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={{
                        animate: {
                            transition: {
                                staggerChildren: 0.1
                            }
                        }
                    }}
                    className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {values.map((value, index) => {
                        const Icon = value.icon
                        return (
                            <motion.div
                                key={index}
                                variants={scaleUp}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -5, scale: 1.02 }}
                            >
                                <Card className="overflow-hidden h-full">
                                    <CardContent className="pt-6 text-center h-full">
                                        <motion.div
                                            whileHover={{ rotate: 5, scale: 1.1 }}
                                            className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4"
                                        >
                                            <Icon className="h-8 w-8 text-primary" />
                                        </motion.div>

                                        <h3 className="text-xl font-semibold mb-2">{value.title}</h3>

                                        <motion.p
                                            initial={{ opacity: 0 }}
                                            whileInView={{ opacity: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.1 }}
                                            className="text-muted-foreground text-sm leading-relaxed"
                                        >
                                            {value.description}
                                        </motion.p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        )
                    })}
                </motion.div>
            </section>

        </>
    )
}

export default About
