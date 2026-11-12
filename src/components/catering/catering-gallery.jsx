"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import PhotoLightbox from "@/components/ui/photo-lightbox";

// Past events, one photo per spread (no two shots of the same table, and none
// of the photos shown bigger higher up the page). The first one is shown big.
const photos = [
    { src: "/gallery/catering/catering-01.jpg", alt: "Grazing board with veggies, grapes, cheeses and a spinach dip" },
    { src: "/gallery/catering/catering-21.jpg", alt: "Crostini with whipped cheese, blueberry compote, walnuts and thyme" },
    { src: "/gallery/catering/catering-13.jpg", alt: "Deviled eggs garnished with cranberries and parsley" },
    { src: "/gallery/catering/catering-22.jpg", alt: "Shower table with white chocolate strawberries, rosette cupcakes, pretzel rods and deviled eggs" },
    { src: "/gallery/catering/catering-14.jpg", alt: "Party table with brie bites, berries and a big glazed tray" },
    { src: "/gallery/catering/catering-09.jpg", alt: "Fall party spread with crostini, pasta salad cups and mini desserts" },
    { src: "/gallery/catering/catering-02.jpg", alt: "Tray of pesto and caprese toasts on ciabatta" },
    { src: "/gallery/catering/catering-23.jpg", alt: "Truffle parmesan potato bites, deviled eggs and bacon crostini" },
    { src: "/gallery/catering/catering-19.jpg", alt: "Caprese skewers with tomato, mozzarella and basil" },
];

const CateringGallery = () => {
    const [viewing, setViewing] = useState(null);

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
                        key={p.src}
                        type="button"
                        onClick={() => setViewing(idx)}
                        aria-label="See the whole photo"
                        className={`relative aspect-square overflow-hidden rounded-2xl bg-brand-latte cursor-zoom-in focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-tobacco ${
                            idx === 0 ? "col-span-2 row-span-2" : ""
                        }`}
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={p.src}
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
