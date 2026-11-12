"use client";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useState } from "react";
import PhotoLightbox from "@/components/ui/photo-lightbox";

const cateringPhotos = Array.from({ length: 20 }, (_, i) => {
    const num = String(i + 1).padStart(2, "0");
    return `/gallery/catering/catering-${num}.jpg`;
});

const photos = cateringPhotos.map((src, idx) => ({ src, alt: `Event spread ${idx + 1}` }));

const CateringGallery = () => {
    const [viewing, setViewing] = useState(null);
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
        >
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
                Event Gallery
            </h2>
            <p className="text-muted-foreground text-center mb-8">
                A look at spreads we&apos;ve served for past events
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                {cateringPhotos.map((src, idx) => (
                    <Card key={src} className="overflow-hidden">
                        <button
                            type="button"
                            onClick={() => setViewing(idx)}
                            aria-label="See the whole photo"
                            className="block w-full aspect-square overflow-hidden relative cursor-zoom-in focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-tobacco"
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={src}
                                alt={`Event spread ${idx + 1}`}
                                loading="lazy"
                                className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300"
                            />
                        </button>
                    </Card>
                ))}
            </div>
            <PhotoLightbox photos={photos} index={viewing} onIndexChange={setViewing} />
        </motion.div>
    );
};

export default CateringGallery;
