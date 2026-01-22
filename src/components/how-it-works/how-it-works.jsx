'use client'
import React from 'react'
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    ShoppingCart,
    CheckCircle2,
    Calendar,
    Truck,
    UtensilsCrossed,
    Clock,
    Package,
    Heart,
    ArrowRight
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion"
import { fadeUp, fadeIn, scaleUp } from "@/lib/animations"

const HowItWorks = () => {
    const steps = [
        {
            number: "1",
            title: "Browse Our Fresh Menu",
            description: "Explore our weekly rotating selection of chef-designed meals and cold-pressed wellness juices. Filter by dietary preferences, calories, or ingredients to find your perfect match.",
            icon: <ShoppingCart className="h-10 w-10" />,
            color: "bg-primary text-primary-foreground",
            content: (
                <Card className=" h-full hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6">
                        <div className="flex flex-col items-center text-center space-y-4">
                            <div className="p-4 rounded-full bg-secondary/20">
                                <ShoppingCart className="h-12 w-12 text-primary" />
                            </div>
                            <h3 className="text-xl font-semibold">Weekly Menu Preview</h3>
                            <div className="space-y-3 text-sm text-muted-foreground">
                                <p>✓ 20+ fresh options each week</p>
                                <p>✓ Nutrition info clearly displayed</p>
                                <p>✓ Chef's specials highlighted</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )
        },
        {
            number: "2",
            title: "Customize Your Order",
            description: "Add your favorite extras, sides, and supplements. Choose between flexible subscription plans or one-time orders that fit your lifestyle.",
            icon: <CheckCircle2 className="h-10 w-10" />,
            color: "bg-primary text-primary-foreground",
            content: (
                <Card className=" h-full hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6">
                        <div className="flex flex-col items-center text-center space-y-4">
                            <div className="p-4 rounded-full bg-secondary/20">
                                <CheckCircle2 className="h-12 w-12 text-primary" />
                            </div>
                            <h3 className="text-xl font-semibold">Customization Options</h3>
                            <div className="space-y-3 text-sm text-muted-foreground">
                                <p>✓ Add protein boosts +$3</p>
                                <p>✓ Choose portion sizes</p>
                                <p>✓ Select weekly or bi-weekly</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )
        },
        {
            number: "3",
            title: "Schedule Your Delivery",
            description: "Pick your preferred delivery day and time window. Remember to order by Saturday 8:00 PM for next week's delivery.",
            icon: <Calendar className="h-10 w-10" />,
            color: "bg-primary text-primary-foreground",
            content: (
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6">
                        <div className="flex flex-col items-center text-center space-y-4">
                            <div className="p-4 rounded-full bg-secondary/20">
                                <Calendar className="h-12 w-12 text-primary" />
                            </div>
                            <h3 className="text-xl font-semibold">Delivery Schedule</h3>
                            <div className="space-y-3 text-sm text-muted-foreground">
                                <p>✓ Monday or Tuesday delivery</p>
                                <p>✓ 10:00 AM - 7:00 PM window</p>
                                <p>✓ Saturday 8:00 PM cutoff</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )
        },
        {
            number: "4",
            title: "Enjoy Fresh Meals",
            description: "Receive fresh, never-frozen meals in eco-friendly packaging. Heat and eat in minutes—no cooking, no cleanup, just delicious, nutritious food.",
            icon: <Truck className="h-10 w-10" />,
            color: "bg-primary text-primary-foreground",
            content: (
                <Card className=" h-full hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6">
                        <div className="flex flex-col items-center text-center space-y-4">
                            <div className="p-4 rounded-full bg-secondary/20">
                                <Truck className="h-12 w-12 text-primary" />
                            </div>
                            <h3 className="text-xl font-semibold">Fresh Delivery</h3>
                            <div className="space-y-3 text-sm text-muted-foreground">
                                <p>✓ Insulated eco-friendly packaging</p>
                                <p>✓ 2-3 minute heat time</p>
                                <p>✓ Skip or pause anytime</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )
        }
    ];

    const benefits = [
        {
            icon: <Clock className="h-6 w-6" />,
            title: "Save 5+ Hours Weekly",
            description: "No grocery shopping, prepping, or cleanup needed"
        },
        {
            icon: <Package className="h-6 w-6" />,
            title: "Fresh Never Frozen",
            description: "Prepared fresh daily, delivered at peak freshness"
        },
        {
            icon: <UtensilsCrossed className="h-6 w-6" />,
            title: "Chef-Crafted",
            description: "Designed by nutritionists and professional chefs"
        },
        {
            icon: <Heart className="h-6 w-6" />,
            title: "Flexible Plans",
            description: "Skip weeks, change plans, or cancel anytime"
        }
    ];

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
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
                            How It Works
                        </h1>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-primary-foreground/90 max-w-2xl mx-auto"
                    >
                        Get fresh, healthy meals delivered in 4 simple steps. No commitment,
                        no cooking required—just delicious, nutritious food ready when you are.
                    </motion.p>
                </motion.div>
            </motion.section>

            <div className='container mx-auto px-4 pt-16'>
                {/* Steps with Alternating Layout */}
                <div className="space-y-16 md:space-y-20 mb-20">
                    {steps.map((step, index) => (
                        <motion.div
                            key={step.number}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}
                        >
                            {/* Text Content - Alternates sides */}
                            <motion.div
                                className={`${index % 2 === 1 ? 'lg:col-start-2' : ''}`}
                                whileHover={{ x: index % 2 === 0 ? -5 : 5 }}
                                transition={{ duration: 0.2 }}
                            >
                                <div className="flex items-center gap-4 mb-6">
                                    <motion.div
                                        whileHover={{ rotate: 5, scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                        className={`w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 ${step.color}`}
                                    >
                                        <span className="font-bold text-xl">{step.number}</span>
                                    </motion.div>
                                    <motion.h2
                                        initial={{ opacity: 0, x: index % 2 === 0 ? -10 : 10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.2 }}
                                        className="text-2xl md:text-3xl font-bold"
                                    >
                                        {step.title}
                                    </motion.h2>
                                </div>
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.3 }}
                                    className="text-muted-foreground text-lg leading-relaxed lg:ml-18"
                                >
                                    {step.description}
                                </motion.p>
                            </motion.div>

                            {/* Card - Alternates sides */}
                            <motion.div
                                className={`${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                                whileHover={{ scale: 1.02 }}
                            >
                                {step.content}
                            </motion.div>
                        </motion.div>
                    ))}
                </div>

                {/* Benefits Section */}
                <motion.div
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    className="mb-16"
                >
                    <motion.h2
                        variants={fadeUp}
                        className="text-3xl font-bold mb-8 text-center"
                    >
                        Why Choose FreshPrep
                    </motion.h2>

                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
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
                    >
                        {benefits.map((benefit, index) => (
                            <motion.div
                                key={benefit.title}
                                variants={scaleUp}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -5, scale: 1.02 }}
                            >
                                <div className="p-6 rounded-xl border bg-card group h-full">
                                    <motion.div
                                        whileHover={{ rotate: 5, scale: 1.1 }}
                                        className="mb-4 p-3 rounded-lg bg-secondary/20 text-primary w-fit"
                                    >
                                        {benefit.icon}
                                    </motion.div>
                                    <h3 className="text-lg font-semibold mb-2">
                                        {benefit.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>

                {/* Delivery Info Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-12"
                >
                    <motion.div
                        whileHover={{ y: -5 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Card>
                            <CardContent className="p-8">
                                <motion.h2
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.1 }}
                                    className="text-2xl font-bold mb-6 text-center"
                                >
                                    Delivery Details
                                </motion.h2>

                                <motion.div
                                    className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center"
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
                                >
                                    {[
                                        { icon: <Clock className="h-6 w-6 text-primary" />, label: "Weekly Cutoff", value: "Saturday 8:00 PM" },
                                        { icon: <Calendar className="h-6 w-6 text-primary" />, label: "Delivery Days", value: "Monday & Tuesday" },
                                        { icon: <Truck className="h-6 w-6 text-primary" />, label: "Delivery Window", value: "10:00 AM - 7:00 PM" }
                                    ].map((item, index) => (
                                        <motion.div
                                            key={item.label}
                                            variants={fadeUp}
                                            initial={{ opacity: 0, y: 10 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.1 }}
                                            className="space-y-3"
                                        >
                                            <motion.div
                                                whileHover={{ rotate: 5 }}
                                                className="p-3 rounded-lg bg-secondary/20 inline-block"
                                            >
                                                {item.icon}
                                            </motion.div>
                                            <div>
                                                <p className="text-sm text-muted-foreground mb-1">{item.label}</p>
                                                <p className="text-lg font-semibold">{item.value}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </motion.div>

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                >
                    <motion.div
                        whileHover={{ scale: 1.01 }}
                        transition={{ duration: 0.3 }}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                        >
                            <h2 className="text-3xl font-bold mb-4">
                                Ready to Start Eating Better?
                            </h2>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto"
                        >
                            Join thousands of busy professionals who save time and eat healthier with FreshPrep.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-col sm:flex-row gap-4 justify-center"
                        >
                            <motion.div >
                                <Button size="lg" asChild className="gap-2">
                                    <Link href="/menu">
                                        Browse This Week's Menu
                                        <ArrowRight className="ml-2" size={20} />
                                    </Link>
                                </Button>
                            </motion.div>

                            <motion.div  >
                                <Button size="lg" variant="outline" asChild>
                                    <Link href="/subscriptions">View Subscription Plans</Link>
                                </Button>
                            </motion.div>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="text-sm text-muted-foreground mt-6"
                        >
                            No commitment required • Free delivery over $85 • Skip or cancel anytime
                        </motion.p>
                    </motion.div>
                </motion.div>
            </div>
        </>
    )
}

export default HowItWorks