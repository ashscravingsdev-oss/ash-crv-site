'use client'
import React from 'react'
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";

const Testimonials = () => {
    const testimonials = [
        {
            name: "Sarah Johnson",
            role: "Busy Professional",
            content: "FreshPrep has completely changed my life. I save hours every week and eat healthier than ever. The meals are restaurant-quality!",
        },
        {
            name: "Michael Chen",
            role: "Fitness Enthusiast",
            content: "The perfect macros, delicious flavors, and incredible convenience. I've hit all my fitness goals thanks to FreshPrep.",
        },
        {
            name: "Emily Rodriguez",
            role: "Working Mom",
            content: "As a working mom, FreshPrep is a lifesaver. My whole family loves the meals, and I love the time it saves me.",
        },
    ];

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
                    What our customers say
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Join thousands of happy customers
                </p>
            </motion.div>

            <motion.div
                className="grid md:grid-cols-3 gap-6"
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
                {testimonials.map((testimonial, index) => (
                    <motion.div key={testimonial.name} variants={fadeUp}>
                        <motion.div
                            whileHover={{ y: -5 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Card>
                                <CardContent className="pt-6">
                                    <div className="flex items-center gap-1 mb-4">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className="h-5 w-5 fill-amber-500 text-amber-500"
                                            />
                                        ))}
                                    </div>

                                    <p className="text-muted-foreground mb-6 leading-relaxed italic">
                                        "{testimonial.content}"
                                    </p>

                                    <div className="flex items-center gap-3">
                                        <motion.div
                                            whileHover={{ scale: 1.1 }}
                                            className="relative h-12 w-12 overflow-hidden rounded-full bg-gray-200"
                                        >
                                            <img
                                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWLxOUhQP5AB1r8naieABxkPwiIaEM9pJvjA&s"
                                                alt={testimonial.name}
                                                className="h-full w-full object-cover"
                                            />
                                        </motion.div>
                                        <div>
                                            <p className="font-semibold">{testimonial.name}</p>
                                            <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    )
}

export default Testimonials