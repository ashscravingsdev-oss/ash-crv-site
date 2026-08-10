 'use client'
 import React from 'react'
import { Card, CardContent } from "@/components/ui/card";
import { Leaf, Truck, ChefHat } from "lucide-react";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";

const Features = () => {
    return (
        <section className="bg-muted py-16">
            <div className="container mx-auto px-4">
                <motion.div
                    className="grid md:grid-cols-3 gap-8"
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
                    {[
                        {
                            icon: <Leaf className="h-6 w-6 text-primary" />,
                            title: "Organic, On Purpose",
                            description: "I choose organic, local ingredients because that's genuinely how I cook — not a marketing checkbox."
                        },
                        {
                            icon: <ChefHat className="h-6 w-6 text-primary" />,
                            title: "Made by One Chef, By Hand",
                            description: "No line cooks, no shortcuts — every meal is cooked, portioned, and packed by me, personally."
                        },
                        {
                            icon: <Truck className="h-6 w-6 text-primary" />,
                            title: "Fresh to Your Door",
                            description: "Deliveries Mondays & Tuesdays, cooked and packed the same day so it reaches you as fresh as it left my kitchen."
                        }
                    ].map((feature, index) => (
                        <motion.div key={index} variants={fadeUp}>
                            <motion.div
                                whileHover={{ y: -5, scale: 1.02 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Card className="overflow-hidden">
                                    <CardContent className="pt-6">
                                        <motion.div
                                            whileHover={{ rotate: 5 }}
                                            className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4"
                                        >
                                            {feature.icon}
                                        </motion.div>
                                        <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                        <p className="text-muted-foreground leading-relaxed">
                                            {feature.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}

export default Features