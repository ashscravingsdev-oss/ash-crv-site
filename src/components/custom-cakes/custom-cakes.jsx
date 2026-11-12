"use client";
import { useState } from "react";
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

const perks = [
    { label: "6\" custom cakes", value: "from $125" },
    { label: "Tasting box, 4 flavors", value: "$55" },
    { label: "Order ahead", value: "at least 1 week" },
    { label: "Deposit to hold your date", value: "50%" },
]

const dozens = [
    { name: "Sweet Bites", price: "$44" },
    { name: "Signature Sweets", price: "$50" },
    { name: "Premium Sweets", price: "$60" },
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
                                See desserts <span aria-hidden="true">→</span>
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
                        <img src="/gallery/cakes/cake-05.jpg" alt="50th birthday cake with peonies" className="col-span-3 row-span-2 w-full h-full object-cover rounded-[18px]" />
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/gallery/cakes/cake-17.jpg" alt="Cupcake flower bouquet" className="col-span-2 w-full h-full object-cover rounded-[18px]" />
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/gallery/catering/catering-05.jpg" alt="Chocolate-covered strawberries and dessert cups" className="col-span-2 w-full h-full object-cover rounded-[18px]" />
                    </motion.div>
                </div>

                {/* Quick facts */}
                <dl className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-12">
                    {perks.map((p) => (
                        <div key={p.label} className="rounded-2xl border border-border bg-card p-4 md:p-5">
                            <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-brand-heading">{p.label}</dt>
                            <dd className="font-serif text-2xl md:text-3xl font-semibold text-brand-espresso mt-1">{p.value}</dd>
                        </div>
                    ))}
                </dl>
                <p className="text-sm text-muted-foreground mt-3">
                    Bigger sizes, tiers, fillings and design details are priced from there. If you book your cake, the full $55
                    from your tasting box goes toward it.
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
                            Dessert cups, chocolate-covered strawberries, cheesecake bites and more, made fresh for birthdays,
                            showers, holidays or just because.
                        </p>
                        <dl className="divide-y divide-dashed divide-border border-y border-dashed border-border">
                            {dozens.map((d) => (
                                <div key={d.name} className="flex items-baseline justify-between gap-6 py-4">
                                    <dt className="font-serif text-2xl font-semibold text-brand-espresso">{d.name}</dt>
                                    <dd className="font-serif text-2xl text-brand-espresso">
                                        {d.price} <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">a dozen</span>
                                    </dd>
                                </div>
                            ))}
                        </dl>
                        <p className="text-sm text-muted-foreground">
                            Want a whole dessert table for your event? See <a href="/events" className="underline">Events</a>.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/gallery/catering/catering-05.jpg" alt="Dessert cups and chocolate-covered strawberries" className="col-span-2 aspect-[16/10] w-full object-cover rounded-[18px]" />
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/gallery/cakes/cake-23.jpg" alt="Holiday cupcakes" className="aspect-square w-full object-cover rounded-[18px]" />
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/gallery/cakes/cake-19.jpg" alt="Christmas mini cakes" className="aspect-square w-full object-cover rounded-[18px]" />
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
