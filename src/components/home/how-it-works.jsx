'use client'
import React from 'react'
import { motion } from "framer-motion";
import { fadeUp, scaleUp } from "@/lib/animations";

const HowItWorks = () => {
    return (
        <section className="container mx-auto px-4 py-16 md:py-24">
            <motion.div
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                variants={fadeUp}
                className="text-center mb-12"
            >
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
                    How it works
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Get started in three simple steps
                </p>
            </motion.div>

            <motion.div
                className="grid md:grid-cols-3 gap-12"
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, amount: 0.3 }}
                variants={{
                    animate: {
                        transition: {
                            staggerChildren: 0.2
                        }
                    }
                }}
            >
                {[
                    {
                        number: "1",
                        title: "Choose Your Meals",
                        description: "Browse our menu and select your favorite meal preps, juices, or bundles."
                    },
                    {
                        number: "2",
                        title: "Select Delivery",
                        description: "Pick your preferred delivery day and time that works best for you."
                    },
                    {
                        number: "3",
                        title: "Enjoy Fresh Food",
                        description: "Receive your meals fresh at your door, ready to heat and enjoy."
                    }
                ].map((step, index) => (
                    <motion.div
                        key={index}
                        variants={fadeUp}
                        className="text-center space-y-4"
                    >
                        <motion.div
                            variants={scaleUp}
                            className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto"
                        >
                            <span className="text-2xl font-bold text-primary">{step.number}</span>
                        </motion.div>
                        <h3 className="text-xl font-semibold">{step.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            {step.description}
                        </p>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    )
}

export default HowItWorks