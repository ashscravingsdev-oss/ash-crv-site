'use client'
import React from 'react'
import { Card, CardContent } from "@/components/ui/card";
import { Leaf, Users, Award, Heart } from "lucide-react";
import { motion } from "framer-motion"
import { fadeUp, fadeIn, scaleUp } from "@/lib/animations"
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

// Stats Data Array
const stats = [
    { value: "10K+", label: "Happy Customers" },
    { value: "500K+", label: "Meals Delivered" },
    { value: "30+", label: "Partner Farms" },
    { value: "4.9/5", label: "Customer Rating" }
]
const About = () => {
    return (
        <>
            {/* Hero Section */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-primary text-primary-foreground py-16 md:py-24 overflow-hidden"
            >
                <motion.div
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.3 }}
                    className="container mx-auto px-4 text-center"
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
                        Bringing fresh, healthy, and delicious meals to your doorstep since 2018
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
                        At FreshPrep, we believe that eating healthy shouldn't be
                        complicated or time-consuming. Our mission is to make nutritious,
                        chef-crafted meals accessible to everyone, saving you time while
                        nourishing your body with the best ingredients nature has to offer.
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

            {/* Story Section */}
            <section className="bg-muted py-16">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        variants={fadeIn}
                        className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto"
                    >
                        {/* Image */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="aspect-square rounded-2xl overflow-hidden"
                        >
                            <motion.img
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                                src="/about-team-kitchen.jpg"
                                alt="FreshPrep team"
                                className="w-full h-full object-cover"
                            />
                        </motion.div>

                        {/* Content */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <motion.h2
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="text-3xl font-bold mb-6"
                            >
                                How We Started
                            </motion.h2>

                            <motion.div
                                initial="initial"
                                whileInView="animate"
                                viewport={{ once: true }}
                                variants={{
                                    animate: {
                                        transition: {
                                            staggerChildren: 0.1
                                        }
                                    }
                                }}
                                className="space-y-4 text-muted-foreground leading-relaxed"
                            >
                                <motion.p variants={fadeUp}>
                                    Founded in 2018 by chef Sarah Martinez and nutritionist Dr.
                                    James Chen, FreshPrep was born from a simple idea: everyone
                                    deserves access to restaurant-quality, nutritious meals
                                    without the hassle of cooking or meal planning.
                                </motion.p>

                                <motion.p variants={fadeUp}>
                                    What started as a small operation serving 50 customers has
                                    grown into a thriving community of over 10,000
                                    health-conscious individuals who trust us with their daily
                                    nutrition.
                                </motion.p>

                                <motion.p variants={fadeUp}>
                                    Today, we work with over 30 local organic farms, employ a team
                                    of talented chefs, and deliver thousands of fresh meals every
                                    week. But our mission remains the same: making healthy eating
                                    easy, delicious, and accessible for everyone.
                                </motion.p>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="container mx-auto px-4 pt-16">
                <motion.div
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    variants={{
                        animate: {
                            transition: {
                                staggerChildren: 0.1
                            }
                        }
                    }}
                    className="grid md:grid-cols-4 gap-8 text-center"
                >
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            variants={fadeUp}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.05 }}
                        >
                            <motion.p
                                initial={{ scale: 0.9 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ type: "spring", stiffness: 100 }}
                                className="text-4xl md:text-5xl font-bold mb-2"
                            >
                                {stat.value}
                            </motion.p>

                            <motion.p
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="text-muted-foreground"
                            >
                                {stat.label}
                            </motion.p>
                        </motion.div>
                    ))}
                </motion.div>
            </section>
        </>
    )
}

export default About
