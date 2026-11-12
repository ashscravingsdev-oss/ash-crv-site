"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import CakeInquiryForm from "./cake-inquiry-form";
import DessertList from "@/components/desserts/dessert-list";
import PhotoLightbox from "@/components/ui/photo-lightbox";

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
    "cake-54.jpg",
    "cake-51.jpg",
    "cake-48.jpg",
    "cake-50.jpg",
    "cake-52.jpg",
    "cake-49.jpg",
    "cake-53.jpg",
    "cake-37.jpg",
    "cake-06.jpg",
    "cake-05.jpg",
    "cake-17.jpg",
    "cake-01.jpg",
    "cake-22.jpg",
    "cake-27.jpg",
    "cake-39.jpg",
    "cake-43.jpg",
    // "cake-34.jpg" moved under "Show more" to keep the grid even
];

// A little note on special cakes, and a real description for screen readers
const cakeNotes = {
    "cake-54.jpg": {
        note: "For my grandma ♡",
        alt: "Peach piped cake with baby's breath and a photo of Ash's grandma Maria Elena holding a cake",
    },
};

const allCakes = Array.from(
    { length: 54 },
    (_, i) => `cake-${String(i + 1).padStart(2, "0")}.jpg`
).filter((f) => !removedCakes.includes(f));

const remainingCakes = allCakes.filter((f) => !featuredCakes.includes(f));

// Every cake, in gallery order, for the full-size viewer
const cakePhotos = [...featuredCakes, ...remainingCakes].map((filename, idx) => ({
    src: `/gallery/cakes/${filename}`,
    alt: cakeNotes[filename]?.alt || `Custom cake ${idx + 1} by Ash's Cravings`,
    note: cakeNotes[filename]?.note,
}));

const perks = [
    { label: "6\" custom cakes", value: "from $125" },
    { label: "Order ahead", value: "at least 1 week" },
    { label: "Deposit to hold your date", value: "50%" },
]

// One photo in the dessert photo wall; fills whatever height its column gives it
// (`tall` makes the photo taller than its frame and pins it to the top, to crop off the bottom)
const DessertPhoto = ({ src, alt, flex, position = "object-center", tall = false }) => (
    <div className={`relative ${flex} min-h-0 rounded-[18px] overflow-hidden bg-brand-latte`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
            src={src}
            alt={alt}
            loading="lazy"
            className={`absolute inset-x-0 top-0 w-full object-cover ${tall ? "h-[135%] object-top" : `h-full ${position}`}`}
        />
    </div>
)

const CustomCakes = () => {
    const [showAll, setShowAll] = useState(false);
    const [viewing, setViewing] = useState(null);
    const visibleCakes = showAll ? [...featuredCakes, ...remainingCakes] : featuredCakes;

    return (
        <>
            {/* Hero */}
            <section className="container mx-auto px-4 pt-10 pb-14 md:pt-14 md:pb-20">
                <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25 }}
                        className="space-y-5"
                    >
                        <p className="font-mono text-xs uppercase tracking-[0.18em] text-brand-heading">
                            <span className="text-brand-matcha">■</span> Cakes &amp; desserts
                        </p>
                        <h1 className="font-serif font-medium text-[3.25rem] leading-[0.98] sm:text-6xl lg:text-7xl text-brand-heading">
                            Made to <em className="italic text-brand-tobacco">wow</em>
                        </h1>
                        <p className="text-lg md:text-xl text-foreground/85 leading-relaxed max-w-xl">
                            Every cake is made from scratch and decorated by hand, down to the last little pearl. Tell me
                            your idea and I&apos;ll bring it to life.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 pt-2">
                            <a
                                href="#request"
                                className="inline-flex items-center justify-center gap-3 h-12 px-6 rounded-lg bg-primary text-primary-foreground font-mono text-xs uppercase tracking-[0.18em] hover:bg-primary/90 transition-colors"
                            >
                                Request a cake <span aria-hidden="true">→</span>
                            </a>
                            <a
                                href="#desserts"
                                className="inline-flex items-center justify-center gap-3 h-12 px-6 rounded-lg border border-primary text-primary font-mono text-xs uppercase tracking-[0.18em] hover:bg-primary/5 transition-colors"
                            >
                                Shop desserts <span aria-hidden="true">→</span>
                            </a>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="grid grid-cols-5 grid-rows-2 gap-3 aspect-[5/4]"
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/gallery/cakes/cake-05.jpg" alt="50th birthday cake with blush garden roses and a gold topper" className="col-span-3 row-span-2 w-full h-full object-cover object-[45%_center] rounded-[18px]" />
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/gallery/cakes/cake-01.jpg" alt="White cake with pink and red rosettes" className="col-span-2 w-full h-full object-cover rounded-[18px]" />
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/gallery/cakes/cake-43.jpg" alt="Cream vintage heart cake piped with 'engaged'" className="col-span-2 w-full h-full object-cover rounded-[18px]" />
                    </motion.div>
                </div>

                {/* Quick facts */}
                <dl className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-12">
                    {perks.map((p) => (
                        <div key={p.label} className="rounded-2xl border border-border bg-card p-4 md:p-5">
                            <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-brand-heading">{p.label}</dt>
                            <dd className="font-serif text-2xl md:text-3xl font-semibold text-brand-espresso mt-1">{p.value}</dd>
                        </div>
                    ))}
                </dl>
                <p className="text-sm text-muted-foreground mt-3">
                    Bigger sizes, tiers, fillings and design details are priced from there.
                </p>
            </section>

            {/* Gallery */}
            <section className="bg-muted">
                <div className="container mx-auto px-4 py-16 md:py-20">
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-brand-heading text-center mb-3">
                        <span className="text-brand-matcha">■</span> Recent cakes
                    </p>
                    <h2 className="font-serif font-medium text-4xl md:text-5xl text-brand-heading text-center mb-10">
                        Every one, <em className="italic text-brand-tobacco">one of a kind</em>
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                        {visibleCakes.map((filename, idx) => (
                            <figure key={filename} className="relative aspect-square overflow-hidden rounded-2xl bg-background">
                                <button
                                    type="button"
                                    onClick={() => setViewing(idx)}
                                    aria-label="See the whole photo"
                                    className="block w-full h-full cursor-zoom-in focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-tobacco rounded-2xl"
                                >
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={`/gallery/cakes/${filename}`}
                                        alt={cakeNotes[filename]?.alt || `Custom cake ${idx + 1} by Ash's Cravings`}
                                        loading="lazy"
                                        className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300"
                                    />
                                </button>
                                {cakeNotes[filename]?.note && (
                                    <figcaption className="pointer-events-none absolute left-3 bottom-3 whitespace-nowrap rounded-full bg-background/90 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-brand-espresso">
                                        {cakeNotes[filename].note}
                                    </figcaption>
                                )}
                            </figure>
                        ))}
                    </div>
                    <PhotoLightbox photos={cakePhotos} index={viewing} onIndexChange={setViewing} />
                    {!showAll && remainingCakes.length > 0 && (
                        <div className="flex justify-center pt-8">
                            <button
                                type="button"
                                onClick={() => setShowAll(true)}
                                className="inline-flex items-center justify-center gap-3 h-12 px-6 rounded-lg border border-primary text-primary font-mono text-xs uppercase tracking-[0.18em] hover:bg-primary/5 transition-colors"
                            >
                                Show more cakes
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* Desserts by the dozen */}
            <section id="desserts" className="scroll-mt-24 container mx-auto px-4 py-16 md:py-20">
                <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
                    <div className="space-y-4">
                        <p className="font-mono text-xs uppercase tracking-[0.18em] text-brand-heading">
                            <span className="text-brand-matcha">■</span> Desserts
                        </p>
                        <h2 className="font-serif font-medium text-4xl md:text-5xl text-brand-heading">
                            Sweets by <em className="italic text-brand-tobacco">the dozen</em>
                        </h2>
                        <p className="text-lg text-foreground/85 leading-relaxed pb-4">
                            Made fresh for birthdays, showers, holidays or just because. Mix and match your favorites.
                        </p>
                        <DessertList />
                    </div>
                    {/* Photo wall: two columns that grow to the full height of the list */}
                    <div className="flex gap-3 h-[680px] sm:h-[860px] lg:h-auto lg:min-h-[640px]">
                        <div className="flex-1 flex flex-col gap-3">
                            <figure className="relative flex-[5] min-h-0 rounded-[18px] overflow-hidden bg-brand-latte">
                                <video
                                    className="absolute inset-0 w-full h-full object-cover"
                                    src="/video/dessert-boxes.mp4"
                                    poster="/video/dessert-boxes-poster.jpg"
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    preload="metadata"
                                    aria-label="Ash packing up a dessert order with Ash's Cravings stickers"
                                />
                                <figcaption className="absolute left-3 bottom-3 whitespace-nowrap rounded-full bg-background/90 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-brand-espresso">
                                    Packed with love ♡
                                </figcaption>
                            </figure>
                            <DessertPhoto flex="flex-[4]" src="/gallery/desserts/dessert-boxes-2.jpg" alt="Boxes of strawberry mini cheesecakes, cow-print strawberries and chocolate pretzels" position="object-[center_35%]" />
                        </div>
                        <div className="flex-1 flex flex-col gap-3">
                            <DessertPhoto flex="flex-[3]" src="/gallery/cakes/cake-17.jpg" alt="Cupcake flower bouquet in pinks and yellows" />
                            <DessertPhoto flex="flex-[3]" src="/gallery/catering/catering-05.jpg" alt="Dessert table with chocolate-covered strawberries and pink cupcakes" tall />
                            <DessertPhoto flex="flex-[3]" src="/gallery/desserts/strawberry-cheesecake.jpg" alt="Cheesecake topped with fresh strawberries" position="object-[center_60%]" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Request form */}
            <section id="request" className="scroll-mt-24 bg-muted">
                <div className="container mx-auto px-4 py-16 md:py-20">
                    <CakeInquiryForm />
                </div>
            </section>
        </>
    );
};

export default CustomCakes;
