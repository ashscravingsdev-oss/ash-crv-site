'use client'
import React from 'react'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";

const Newsletter = () => {
    return (
        <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.01 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="bg-primary text-primary-foreground py-16 overflow-hidden"
        >
            <motion.div
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                variants={fadeUp}
                className="container mx-auto px-4"
            >
                <div className="max-w-2xl mx-auto text-center space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-balance">
                            Get $10 off your first order
                        </h2>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.15 }}
                        className="text-lg text-primary-foreground/90"
                    >
                        Subscribe to our newsletter for exclusive offers, recipes, and
                        wellness tips.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                    >
                        <Input
                            type="email"
                            placeholder="Enter your email"
                            className="bg-primary-foreground text-foreground border-none flex-1"
                        />
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button size="lg" variant="secondary" className="sm:w-auto">
                                Subscribe
                            </Button>
                        </motion.div>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.25 }}
                        className="text-sm text-primary-foreground/80"
                    >
                        Join 10,000+ subscribers. Unsubscribe anytime.
                    </motion.p>
                </div>
            </motion.div>
        </motion.section>
    )
}

export default Newsletter