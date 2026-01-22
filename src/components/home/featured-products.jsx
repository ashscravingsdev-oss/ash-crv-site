'use client'
import React from 'react'
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, scaleUp } from "@/lib/animations";

const FeaturedProducts = () => {
    const products = [
        {
            name: "Mediterranean Bowl",
            description: "Grilled chicken, quinoa, roasted vegetables, hummus",
            price: "$12.99",
            image: "/mediterranean-bowl-with-chicken-quinoa-vegetables.jpg",
        },
        {
            name: "Green Detox Juice",
            description: "Kale, cucumber, green apple, lemon, ginger",
            price: "$8.99",
            image: "/green-detox-juice-cold-pressed.jpg",
        },
        {
            name: "Power Protein Pack",
            description: "Grilled salmon, sweet potato, broccoli, tahini",
            price: "$14.99",
            image: "/protein-meal-prep-salmon-sweet-potato.jpg",
        },
    ];

    return (
        <section className="bg-muted py-16 md:py-24">
            <div className="container mx-auto px-4">
                <motion.div
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
                        This week's favorites
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Our most popular meals and juices
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
                    {products.map((product, index) => (
                        <motion.div key={product.name} variants={scaleUp}>
                            <motion.div
                                whileHover={{ y: -10 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0.3 }}
                                        className="aspect-square overflow-hidden"
                                    >
                                        <img
                                            src={product.image || "/placeholder.svg"}
                                            alt={product.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </motion.div>
                                    <CardContent className="p-6">
                                        <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                                        <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                                            {product.description}
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <span className="text-2xl font-bold">{product.price}</span>
                                            <motion.div>
                                                <Button>Add to Cart</Button>
                                            </motion.div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="text-center mt-8"
                >
                    <Button size="lg" variant="outline" asChild>
                        <Link href="/menu">View Full Menu</Link>
                    </Button>
                </motion.div>
            </div>
        </section>
    )
}

export default FeaturedProducts