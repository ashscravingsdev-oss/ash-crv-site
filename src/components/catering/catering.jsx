"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import InquiryForm from './inquiry-form'
import { motion } from "framer-motion"
import { fadeUp, fadeIn, scaleUp } from "@/lib/animations"
const cateringServices = [
    {
        title: "Corporate Events",
        description:
            "Healthy catering for meetings, conferences, and office events",
        features: [
            "Custom menu planning",
            "On-time delivery",
            "Setup & cleanup",
            "Dietary accommodations",
        ],
    },
    {
        title: "Private Parties",
        description:
            "Elegant meal service for birthdays, celebrations, and gatherings",
        features: [
            "Personalized menus",
            "Professional presentation",
            "Serving staff available",
            "Flexible portions",
        ],
    },
    {
        title: "Wellness Programs",
        description: "Ongoing meal services for corporate wellness initiatives",
        features: [
            "Weekly meal plans",
            "Nutritional tracking",
            "Employee discounts",
            "Flexible scheduling",
        ],
    },
];
const Catering = () => {
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
                        Catering Services
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-primary-foreground/90 max-w-2xl mx-auto"
                    >
                        Healthy, delicious catering for events of any size
                    </motion.p>
                </motion.div>
            </motion.section>

            {/* Services Section */}
            <section className="container mx-auto px-4 pt-16">
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
                    className="grid md:grid-cols-3 gap-8 mb-16"
                >
                    {cateringServices.map((service, index) => (
                        <motion.div
                            key={service.title}
                            variants={scaleUp}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -5, scale: 1.02 }}
                        >
                            <Card className="overflow-hidden h-full">
                                <CardHeader>
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.1 }}
                                    >
                                        <CardTitle>{service.title}</CardTitle>
                                    </motion.div>

                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.15 }}
                                        className="text-sm text-muted-foreground"
                                    >
                                        {service.description}
                                    </motion.p>
                                </CardHeader>

                                <CardContent>
                                    <motion.ul
                                        initial="initial"
                                        whileInView="animate"
                                        viewport={{ once: true }}
                                        variants={{
                                            animate: {
                                                transition: {
                                                    staggerChildren: 0.05
                                                }
                                            }
                                        }}
                                        className="space-y-2"
                                    >
                                        {service.features.map((feature, idx) => (
                                            <motion.li
                                                key={idx}
                                                variants={fadeUp}
                                                initial={{ opacity: 0, x: -10 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: idx * 0.05 }}
                                                className="flex items-start gap-2 text-sm"
                                            >
                                                <motion.div
                                                    whileHover={{ rotate: 5, scale: 1.1 }}
                                                    className="flex-shrink-0"
                                                >
                                                    <Check className="h-4 w-4 text-primary mt-0.5" />
                                                </motion.div>
                                                <span>{feature}</span>
                                            </motion.li>
                                        ))}
                                    </motion.ul>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Inquiry Form */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <InquiryForm />
                </motion.div>

            </section>
        </>
    )
}

export default Catering
