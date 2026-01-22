"use client"

import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { fadeUp, scaleUp } from "@/lib/animations";

const ContactInfo = () => {
    const contactItems = [
        {
            icon: <Mail className="h-6 w-6 text-primary" />,
            title: "Email",
            details: ["support@freshprep.com"]
        },
        {
            icon: <Phone className="h-6 w-6 text-primary" />,
            title: "Phone",
            details: ["(555) 123-4567"]
        },
        {
            icon: <MapPin className="h-6 w-6 text-primary" />,
            title: "Address",
            details: ["123 Wellness Way, San Francisco, CA 94102"]
        },
        {
            icon: <Clock className="h-6 w-6 text-primary" />,
            title: "Hours",
            details: [
                "Monday - Friday: 8 AM - 6 PM",
                "Saturday: 9 AM - 4 PM",
                "Sunday: Closed"
            ]
        }
    ];

    return (
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
        >
            <motion.div
                whileHover={{ y: -5, scale: 1.01 }}
                transition={{ duration: 0.2 }}
            >
                <Card className="overflow-hidden">
                    <CardContent className="pt-6">
                        <motion.div
                            className="space-y-6"
                            initial="initial"
                            animate="animate"
                            variants={{
                                animate: {
                                    transition: {
                                        staggerChildren: 0.05
                                    }
                                }
                            }}
                        >
                            {contactItems.map((item, index) => (
                                <motion.div
                                    key={index}
                                    variants={scaleUp}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex items-start gap-4"
                                >
                                    <motion.div
                                        whileHover={{ rotate: 5, scale: 1.1 }}
                                        className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0"
                                    >
                                        {item.icon}
                                    </motion.div>

                                    <div>
                                        <motion.h3
                                            initial={{ opacity: 0, y: 5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1 + 0.05 }}
                                            className="font-semibold mb-1"
                                        >
                                            {item.title}
                                        </motion.h3>

                                        <motion.div
                                            initial="initial"
                                            animate="animate"
                                            variants={{
                                                animate: {
                                                    transition: {
                                                        staggerChildren: 0.03
                                                    }
                                                }
                                            }}
                                        >
                                            {item.details.map((detail, detailIndex) => (
                                                <motion.p
                                                    key={detailIndex}
                                                    variants={fadeUp}
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ delay: detailIndex * 0.03 }}
                                                    className="text-sm text-muted-foreground"
                                                >
                                                    {detail}
                                                </motion.p>
                                            ))}
                                        </motion.div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </CardContent>
                </Card>
            </motion.div>
        </motion.div>
    )
}

export default ContactInfo