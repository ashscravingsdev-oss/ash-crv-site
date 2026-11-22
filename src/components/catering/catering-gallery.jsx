"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import PhotoLightbox from "@/components/ui/photo-lightbox";
import { sized } from "@/lib/site-photos";
import { useSpot } from "@/components/site-photos";

// Past events, one photo per spread (no two shots of the same table, and none
// of the photos shown bigger higher up the page). The first one is shown big.
// Ash can change them on the admin's Website photos page ("events.gallery").

const CateringGallery = () => {
    const [viewing, setViewing] = useState(null);
    const photos = useSpot("events.gallery").map((p) => ({ src: sized(p.url, 1800), thumb: sized(p.url, 900), alt: p.alt, note: p.note }));

    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.35 }}
        >
            <div className="text-center mb-10">
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-brand-heading mb-3">
                    <span className="text-brand-matcha">■</span> Past events
                </p>
                <h2 className="font-serif font-medium text-4xl md:text-5xl text-brand-heading">
                    A peek at <em className="italic text-brand-tobacco">past spreads</em>
                </h2>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                {photos.map((p, idx) => (
                    <button
                        key={`${p.src}-${idx}`}
                        type="button"
                        onClick={() => setViewing(idx)}
                        aria-label="See the whole photo"
                        className={`relative aspect-square overflow-hidden rounded-2xl bg-brand-latte cursor-zoom-in focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-tobacco ${
                            idx === 0 ? "col-span-2 row-span-2" : ""
                        }`}
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={p.thumb}
                            alt={p.alt}
                            loading="lazy"
                            className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300"
                        />
                    </button>
                ))}
            </div>
            <p className="text-center mt-8">
                <a
                    href="https://www.instagram.com/ashscravings"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs uppercase tracking-[0.18em] text-brand-espresso border-b border-dashed border-brand-tobacco pb-0.5"
                >
                    More on Instagram @ashscravings →
                </a>
            </p>
            <PhotoLightbox photos={photos} index={viewing} onIndexChange={setViewing} />
        </motion.div>
    );
};

export default CateringGallery;
