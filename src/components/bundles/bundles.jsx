"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import BundleList from "./bundle-list"
import { motion } from "framer-motion"
import { fadeUp, fadeIn, scaleUp } from "@/lib/animations"
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchActiveBundles,
} from '@/store/bundleSlice';
import { useEffect } from "react"

// const bundles = [
//     {
//         id: "wellness-week",
//         name: "Wellness Week Bundle",
//         description: "Complete nutrition for 7 days",
//         image: "/wellness-bundle.jpg",
//         price: 89.99,
//         originalPrice: 109.99,
//         savings: 20,
//         items: ["5 Mediterranean Bowls", "5 Power Protein Packs", "7 Green Detox Juices", "3 Berry Blast Smoothies"],
//         features: ["Free Delivery", "Flexible Scheduling", "Cancel Anytime"],
//     },
//     {
//         id: "juice-cleanse",
//         name: "5-Day Juice Cleanse",
//         description: "Reset and rejuvenate your body",
//         image: "/juice-cleanse-bundle.jpg",
//         price: 149.99,
//         originalPrice: 179.99,
//         savings: 30,
//         items: ["15 Cold-Pressed Juices", "5 Green Detox Blends", "5 Citrus Immunity Shots", "Cleanse Guide Included"],
//         features: ["Nutritionist Approved", "Daily Schedule", "Free Consultation"],
//     },
//     {
//         id: "family-pack",
//         name: "Family Meal Bundle",
//         description: "Healthy meals for the whole family",
//         image: "/family-meal-bundle.jpg",
//         price: 129.99,
//         originalPrice: 159.99,
//         savings: 30,
//         items: ["12 Mixed Meal Preps", "8 Breakfast Bowls", "6 Fresh Juices", "4 Healthy Snacks"],
//         features: ["Kid-Friendly Options", "Portion Variety", "Weekly Delivery"],
//     },
//     {
//         id: "fitness-fuel",
//         name: "Fitness Fuel Bundle",
//         description: "High-protein meals for athletes",
//         image: "/fitness-bundle.jpg",
//         price: 109.99,
//         originalPrice: 134.99,
//         savings: 25,
//         items: ["8 Power Protein Packs", "6 Pre-Workout Smoothies", "4 Recovery Juices", "Macro Tracking Guide"],
//         features: ["45g+ Protein per Meal", "Performance Optimized", "Macro Balanced"],
//     },
// ]
const Bundles = () => {
    const dispatch = useDispatch();
    const {
        bundles,
        loading,
        error,
    } = useSelector(state => state.bundles);

    useEffect(() => {
        dispatch(fetchActiveBundles());
    }, [dispatch]);

    return (
        <motion.div
            initial="initial"
            animate="animate"
            variants={fadeIn}
            className="mx-auto pt-8"
        >
            {/* Header */}
            <motion.div
                variants={fadeUp}
                className="text-center mb-12 container mx-auto px-4"
            >
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <Badge className="mb-4">Save Up to 30%</Badge>
                </motion.div>

                <motion.h1
                    variants={fadeUp}
                    className="text-4xl md:text-5xl font-bold mb-4 text-balance"
                >
                    Curated Meal Bundles
                </motion.h1>

                <motion.p
                    variants={fadeUp}
                    className="text-lg text-muted-foreground max-w-2xl mx-auto"
                >
                    Save time and money with our pre-designed bundles. Each bundle is carefully crafted to meet specific
                    nutritional goals and preferences.
                </motion.p>
            </motion.div>

            {/* Bundles Grid */}
            <motion.div
                initial="initial"
                animate="animate"
                variants={{
                    animate: {
                        transition: {
                            staggerChildren: 0.1
                        }
                    }
                }}
                className="grid md:grid-cols-2 gap-8 mb-16 md:mb-24 container mx-auto px-4"
            >
                {bundles && bundles?.map((bundle, index) => (
                    <motion.div
                        key={bundle.id}
                        variants={fadeUp}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -5 }}
                        className="h-full"
                    >
                        <BundleList bundle={bundle} />
                    </motion.div>
                ))}
            </motion.div>

            {/* CTA Section */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6 }}
            >
                <Card className="bg-primary rounded-none text-primary-foreground border-none overflow-hidden">
                    <motion.div
                        whileHover={{ scale: 1.01 }}
                        transition={{ duration: 0.3 }}
                    >
                        <CardContent className="p-8 md:p-16 text-center">
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                            >
                                <h2 className="text-3xl font-bold mb-4 text-balance">
                                    Need a custom bundle?
                                </h2>
                            </motion.div>

                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="text-lg text-primary-foreground/90 mb-6 max-w-2xl mx-auto"
                            >
                                Contact our nutrition team to create a personalized bundle tailored to your specific dietary needs and
                                goals.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3, type: "spring" }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Button size="lg" variant="secondary" asChild>
                                    <Link href="/contact">Contact Us</Link>
                                </Button>
                            </motion.div>
                        </CardContent>
                    </motion.div>
                </Card>
            </motion.div>
        </motion.div>
    )
}

export default Bundles
