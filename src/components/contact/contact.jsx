"use client"

import ContactForm from './contact-form'
import ContactInfo from './contact-info'
import { motion } from "framer-motion"
import { fadeUp, fadeIn } from "@/lib/animations"

const Contact = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="min-h-screen"
        >
            <div className="container mx-auto px-4 py-8">
                <motion.div
                    variants={fadeUp}
                    initial="initial"
                    animate="animate"
                    className="text-center mb-12"
                >
                    <motion.h1
                        variants={fadeUp}
                        className="text-4xl md:text-5xl font-bold mb-4"
                    >
                        Get in Touch
                    </motion.h1>

                    <motion.p
                        variants={fadeUp}
                        className="text-lg text-muted-foreground max-w-2xl mx-auto"
                    >
                        Have a question or feedback? We'd love to hear from you!
                    </motion.p>
                </motion.div>

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
                    className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
                >
                    {/* Contact Form - Slides from left */}
                    <motion.div
                        variants={fadeUp}
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="lg:col-span-2"
                    >
                        <ContactForm />
                    </motion.div>

                    {/* Contact Info - Slides from right */}
                    <motion.div
                        variants={fadeUp}
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <ContactInfo />
                    </motion.div>
                </motion.div>
            </div>
        </motion.div>
    )
}

export default Contact