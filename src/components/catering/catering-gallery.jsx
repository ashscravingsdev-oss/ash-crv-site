"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import PhotoLightbox from "@/components/ui/photo-lightbox";
import PhotoRow from "@/components/ui/photo-row";
import { sized } from "@/lib/site-photos";
import { useSpot } from "@/components/site-photos";

// Past events, one photo per spread (no two shots of the same table, and none
// of the photos shown bigger higher up the page), as one swipeable row.
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
                <p className="mb-3 font-serif italic text-xl md:text-2xl text-brand-tobacco">
                    <span aria-hidden="true" className="not-italic text-brand-matcha text-[0.55em] align-[0.2em] mr-2">■</span>
                    Past events
                </p>
                <h2 className="font-serif font-medium text-4xl md:text-5xl text-brand-heading">
                    A peek at <em className="italic text-brand-tobacco">past spreads</em>
                </h2>
            </div>
            <PhotoRow photos={photos} onOpen={setViewing} label="spreads" />
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-8">
                <button
                    type="button"
                    onClick={() => setViewing(0)}
                    className="inline-flex items-center justify-center gap-3 h-12 px-6 rounded-lg border border-primary text-primary font-mono text-xs uppercase tracking-[0.18em] hover:bg-primary/5 transition-colors"
                >
                    See all spreads
                </button>
                <a
                    href="#request-a-quote"
                    className="inline-flex items-center justify-center gap-3 h-12 px-6 rounded-lg bg-primary text-primary-foreground font-mono text-xs uppercase tracking-[0.18em] hover:bg-primary/90 transition-colors"
                >
                    Plan your event <span aria-hidden="true">→</span>
                </a>
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
