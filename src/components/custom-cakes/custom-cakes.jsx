"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import CakeInquiryForm from "./cake-inquiry-form";

// Photos removed from the gallery (redundant/weak shots) — kept out of both
// featuredCakes and allCakes below.
const removedCakes = [
    "cake-07.jpg",
    "cake-08.jpg",
    "cake-12.jpg",
    "cake-33.jpg",
    "cake-35.jpg",
    "cake-36.jpg",
    "cake-42.jpg",
    "cake-45.jpg",
    "cake-47.jpg",
];

// EDIT ME: filenames from public/gallery/cakes/ shown by default before "Show more" is
// clicked. Swap any of these to change which 15 cakes are featured — order matters,
// they display left-to-right, top-to-bottom in this order.
const featuredCakes = [
    "cake-01.jpg",
    "cake-02.jpg",
    "cake-03.jpg",
    "cake-04.jpg",
    "cake-05.jpg",
    "cake-06.jpg",
    "cake-09.jpg",
    "cake-10.jpg",
    "cake-11.jpg",
    "cake-13.jpg",
    "cake-14.jpg",
    "cake-15.jpg",
    "cake-16.jpg",
    "cake-17.jpg",
    "cake-18.jpg",
];

const allCakes = Array.from(
    { length: 47 },
    (_, i) => `cake-${String(i + 1).padStart(2, "0")}.jpg`
).filter((f) => !removedCakes.includes(f));

const remainingCakes = allCakes.filter((f) => !featuredCakes.includes(f));

const CustomCakes = () => {
    const [showAll, setShowAll] = useState(false);
    const visibleCakes = showAll ? [...featuredCakes, ...remainingCakes] : featuredCakes;

    return (
        <>
            {/* Hero Section */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative text-primary-foreground py-16 md:py-24 overflow-hidden"
            >
                <div className="absolute inset-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src="/brand/custom-cakes-hero.jpg"
                        alt="Custom cake by Ash's Cravings"
                        className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-primary/20" />
                </div>
                <motion.div
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.3 }}
                    className="relative container mx-auto px-4 text-center"
                >
                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-bold mb-4 text-balance"
                    >
                        Custom Cakes
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-primary-foreground/90 max-w-2xl mx-auto"
                    >
                        Handcrafted cakes for birthdays, weddings, and every celebration.
                    </motion.p>

                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-sm text-primary-foreground/80 mt-3"
                    >
                        Each cake is custom-quoted — tell us your vision and we&apos;ll
                        send a quote.
                    </motion.p>
                </motion.div>
            </motion.section>

            {/* Form + Gallery */}
            <section className="container mx-auto px-4 pt-16">
                {/* Request a Cake Form */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-16"
                >
                    <CakeInquiryForm />
                </motion.div>

                <motion.div
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={{
                        animate: {
                            transition: {
                                staggerChildren: 0.03,
                            },
                        },
                    }}
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 mb-16"
                >
                    {visibleCakes.map((filename, idx) => (
                        <motion.div
                            key={filename}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                        >
                            <Card className="overflow-hidden">
                                <div className="aspect-square overflow-hidden relative">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={`/gallery/cakes/${filename}`}
                                        alt={`Custom cake ${idx + 1}`}
                                        loading="lazy"
                                        className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>

                {!showAll && remainingCakes.length > 0 && (
                    <div className="flex justify-center mb-16 -mt-8">
                        <Button variant="outline" size="lg" onClick={() => setShowAll(true)}>
                            Show more
                        </Button>
                    </div>
                )}
            </section>
        </>
    );
};

export default CustomCakes;
