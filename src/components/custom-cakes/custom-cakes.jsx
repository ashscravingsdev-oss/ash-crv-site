"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import CakeInquiryForm from "./cake-inquiry-form";
import DessertShop from "@/components/desserts/dessert-shop";

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
    "cake-34.jpg",
];

const allCakes = Array.from(
    { length: 53 },
    (_, i) => `cake-${String(i + 1).padStart(2, "0")}.jpg`
).filter((f) => !removedCakes.includes(f));

const remainingCakes = allCakes.filter((f) => !featuredCakes.includes(f));

const perks = [
    { label: "6\" custom cakes", value: "from $125" },
    { label: "Order ahead", value: "at least 1 week" },
    { label: "Deposit to hold your date", value: "50%" },
]

const CustomCakes = () => {
    const [showAll, setShowAll] = useState(false);
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
                        <img src="/gallery/cakes/cake-51.jpg" alt="Vintage piped cake topped with cherries and red bows" className="col-span-3 row-span-2 w-full h-full object-cover rounded-[18px]" />
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/gallery/cakes/cake-17.jpg" alt="Cupcake flower bouquet" className="col-span-2 w-full h-full object-cover rounded-[18px]" />
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/gallery/desserts/strawberry-cheesecake.jpg" alt="Strawberry cheesecake" className="col-span-2 w-full h-full object-cover rounded-[18px]" />
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
                            <div key={filename} className="aspect-square overflow-hidden rounded-2xl bg-background">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={`/gallery/cakes/${filename}`}
                                    alt={`Custom cake ${idx + 1} by Ash's Cravings`}
                                    loading="lazy"
                                    className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                        ))}
                    </div>
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
                <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
                    <div className="space-y-4">
                        <p className="font-mono text-xs uppercase tracking-[0.18em] text-brand-heading">
                            <span className="text-brand-matcha">■</span> Desserts
                        </p>
                        <h2 className="font-serif font-medium text-4xl md:text-5xl text-brand-heading">
                            Sweets by <em className="italic text-brand-tobacco">the dozen</em>
                        </h2>
                        <p className="text-lg text-foreground/85 leading-relaxed">
                            Cookies, mini cupcakes, cheesecakes, brownies, chocolate-covered strawberries and dessert cups,
                            made fresh for birthdays, showers, holidays or just because. Pick your favorites below and
                            check out right here.
                        </p>
                        <p className="text-sm text-muted-foreground">
                            Want a whole dessert table for your event? See <a href="/events" className="underline">Events</a>.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <figure className="row-span-2 relative rounded-[18px] overflow-hidden bg-brand-latte">
                            <video
                                className="w-full h-full object-cover"
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
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/gallery/desserts/dessert-boxes-1.jpg" alt="Boxes of chocolate-covered strawberries, mini cheesecakes and rice krispie pops" className="aspect-square w-full object-cover rounded-[18px]" />
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/gallery/desserts/dessert-boxes-2.jpg" alt="Mini cheesecakes, chocolate pretzels and cow-print strawberries" className="aspect-square w-full object-cover rounded-[18px]" />
                    </div>
                </div>

                <div className="mt-12">
                    <DessertShop requestHref="#request" />
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
