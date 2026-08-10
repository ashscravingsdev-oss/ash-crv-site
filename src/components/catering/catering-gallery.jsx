"use client";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

const cateringPhotos = Array.from({ length: 20 }, (_, i) => {
    const num = String(i + 1).padStart(2, "0");
    return `/gallery/catering/catering-${num}.jpg`;
});

const CateringGallery = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
        >
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
                Catering Gallery
            </h2>
            <p className="text-muted-foreground text-center mb-8">
                A look at spreads we&apos;ve served for past events
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                {cateringPhotos.map((src, idx) => (
                    <Card key={src} className="overflow-hidden">
                        <div className="aspect-square overflow-hidden relative">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={src}
                                alt={`Catering spread ${idx + 1}`}
                                loading="lazy"
                                className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                    </Card>
                ))}
            </div>
        </motion.div>
    );
};

export default CateringGallery;
