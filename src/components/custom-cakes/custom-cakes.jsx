"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import CakeInquiryForm from "./cake-inquiry-form";
import DessertList from "@/components/desserts/dessert-list";
import DessertRules from "@/components/desserts/dessert-rules";
import PhotoLightbox from "@/components/ui/photo-lightbox";
import FactStrip from "@/components/ui/fact-strip";
import CheesecakeCard from "@/components/desserts/cheesecake-card";
import { SpotImg, useSpot } from "@/components/site-photos";
import { SPOT, sized } from "@/lib/site-photos";

// Cake flavors, in Ash's words. Each has a little round swatch of what the
// cake looks like inside (chocolate, pink strawberry, vanilla bean specks...).
const flavors = [
    {
        name: "Chocolate",
        text: "Moist chocolate cake with chocolate ganache in every layer. For my chocolate lovers.",
        swatch: "radial-gradient(circle at 32% 30%, #84593f, #4a2c1d 72%)",
    },
    {
        name: "Strawberry Velvet",
        text: "My pink strawberry cake, made with real strawberries. Perfect with cream cheese or vanilla buttercream.",
        swatch: "radial-gradient(circle at 32% 30%, #ecc2c0, #c98d8e 72%)",
    },
    {
        name: "Strawberries & Cream",
        text: "Vanilla cake with fresh strawberries and whipped cream. One of my most requested.",
        swatch: "radial-gradient(circle at 64% 60%, #cf6a62 0 26%, transparent 27.5%), radial-gradient(circle at 34% 34%, #e48c84 0 14%, transparent 15.5%), radial-gradient(circle at 30% 70%, #d9776f 0 8%, transparent 9.5%), #f7eedf",
    },
    {
        name: "Cookies & Cream",
        text: "Vanilla cake with cookies & cream filling and crushed cookies in every bite.",
        swatch: "radial-gradient(circle at 28% 30%, #3b2a22 0 9%, transparent 10%), radial-gradient(circle at 62% 24%, #3b2a22 0 6%, transparent 7%), radial-gradient(circle at 72% 58%, #3b2a22 0 10%, transparent 11%), radial-gradient(circle at 40% 66%, #3b2a22 0 7%, transparent 8%), radial-gradient(circle at 22% 58%, #4a3529 0 5%, transparent 6%), radial-gradient(circle at 56% 82%, #3b2a22 0 5%, transparent 6%), radial-gradient(circle at 50% 45%, #4a3529 0 4%, transparent 5%), radial-gradient(circle at 80% 36%, #3b2a22 0 4%, transparent 5%), #efe6d8",
    },
    {
        name: "Vanilla Bean",
        text: "Soft vanilla cake made with real vanilla bean. Simple and so good.",
        swatch: "radial-gradient(circle at 25% 30%, #4b3a2c 0 2.4%, transparent 3.6%), radial-gradient(circle at 45% 22%, #4b3a2c 0 2.4%, transparent 3.6%), radial-gradient(circle at 68% 35%, #4b3a2c 0 2.4%, transparent 3.6%), radial-gradient(circle at 30% 55%, #4b3a2c 0 2.4%, transparent 3.6%), radial-gradient(circle at 55% 50%, #4b3a2c 0 2.4%, transparent 3.6%), radial-gradient(circle at 75% 62%, #4b3a2c 0 2.4%, transparent 3.6%), radial-gradient(circle at 40% 75%, #4b3a2c 0 2.4%, transparent 3.6%), radial-gradient(circle at 60% 80%, #4b3a2c 0 2.4%, transparent 3.6%), radial-gradient(circle at 20% 70%, #4b3a2c 0 2.4%, transparent 3.6%), radial-gradient(circle at 80% 42%, #4b3a2c 0 2.4%, transparent 3.6%), radial-gradient(circle at 50% 35%, #4b3a2c 0 2.4%, transparent 3.6%), radial-gradient(circle at 35% 40%, #4b3a2c 0 2.4%, transparent 3.6%), #f3e7c9",
    },
    {
        name: "Red Velvet",
        text: "Classic red velvet with cream cheese frosting.",
        swatch: "radial-gradient(circle at 32% 30%, #ac463f, #742826 72%)",
    },
    {
        name: "Tres Leches",
        text: "Soaked in three milks, so it's light, creamy and melts in your mouth.",
        swatch: "radial-gradient(circle at 32% 30%, #fdf6e7, #e6d5b4 75%)",
    },
    {
        name: "Confetti",
        text: "Vanilla cake with sprinkles baked in. A birthday must.",
        swatch: "radial-gradient(circle at 25% 30%, #e58aa0 0 4.5%, transparent 5.7%), radial-gradient(circle at 48% 20%, #7fb3d5 0 4.5%, transparent 5.7%), radial-gradient(circle at 70% 32%, #f2c14e 0 4.5%, transparent 5.7%), radial-gradient(circle at 32% 52%, #8cc084 0 4.5%, transparent 5.7%), radial-gradient(circle at 56% 48%, #e58aa0 0 4.5%, transparent 5.7%), radial-gradient(circle at 76% 60%, #b49fdc 0 4.5%, transparent 5.7%), radial-gradient(circle at 42% 74%, #f2c14e 0 4.5%, transparent 5.7%), radial-gradient(circle at 62% 78%, #7fb3d5 0 4.5%, transparent 5.7%), radial-gradient(circle at 20% 66%, #b49fdc 0 4.5%, transparent 5.7%), radial-gradient(circle at 82% 44%, #8cc084 0 4.5%, transparent 5.7%), radial-gradient(circle at 50% 62%, #7fb3d5 0 4.5%, transparent 5.7%), radial-gradient(circle at 38% 36%, #f2c14e 0 4.5%, transparent 5.7%), #f7efe2",
    },
]

const perks = [
    { value: "From $125", label: "6\" custom cakes" },
    { value: "1 week", label: "to order ahead" },
    { value: "50%", label: "holds your date" },
]

const CustomCakes = () => {
    const [showAll, setShowAll] = useState(false);
    const [viewing, setViewing] = useState(null);
    // The cake gallery (Ash can change it on the admin's Website photos page)
    const cakePhotos = useSpot("cakes.gallery").map((p) => ({ src: sized(p.url, 1800), thumb: sized(p.url, 800), alt: p.alt, note: p.note }));
    const first = SPOT["cakes.gallery"].first || 16;
    const visibleCakes = showAll ? cakePhotos : cakePhotos.slice(0, first);

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
                        <SpotImg spot="cakes.hero" i={0} className="col-span-3 row-span-2 w-full h-full object-cover object-center rounded-[18px]" />
                        <SpotImg spot="cakes.hero" i={1} px={900} className="col-span-2 w-full h-full object-cover rounded-[18px]" />
                        <SpotImg spot="cakes.hero" i={2} px={900} className="col-span-2 w-full h-full object-cover rounded-[18px]" />
                    </motion.div>
                </div>

                {/* Quick facts */}
                <FactStrip facts={perks} className="mt-12" />
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
                        Cakes I&apos;ve <em className="italic text-brand-tobacco">loved making</em>
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                        {visibleCakes.map((photo, idx) => (
                            <figure key={`${photo.src}-${idx}`} className="relative aspect-square overflow-hidden rounded-2xl bg-background">
                                <button
                                    type="button"
                                    onClick={() => setViewing(idx)}
                                    aria-label="See the whole photo"
                                    className="block w-full h-full cursor-zoom-in focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-tobacco rounded-2xl"
                                >
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={photo.thumb}
                                        alt={photo.alt}
                                        loading="lazy"
                                        className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300"
                                    />
                                </button>
                                {photo.note && (
                                    <figcaption className="pointer-events-none absolute left-3 bottom-3 whitespace-nowrap rounded-full bg-background/90 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-brand-espresso">
                                        {photo.note}
                                    </figcaption>
                                )}
                            </figure>
                        ))}
                    </div>
                    <PhotoLightbox photos={cakePhotos} index={viewing} onIndexChange={setViewing} />
                    {!showAll && cakePhotos.length > first && (
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
                    <p className="text-center mt-8">
                        <a
                            href="https://www.instagram.com/ashscravings"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-mono text-xs uppercase tracking-[0.18em] text-brand-espresso border-b border-dashed border-brand-tobacco pb-0.5"
                        >
                            See more on my Instagram <span aria-hidden="true">→</span>
                        </a>
                    </p>
                </div>
            </section>

            {/* Flavors */}
            <section className="container mx-auto px-4 pt-16 md:pt-20">
                <div className="text-center mb-10">
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-brand-heading mb-3">
                        <span className="text-brand-matcha">■</span> Flavors
                    </p>
                    <h2 className="font-serif font-medium text-4xl md:text-5xl text-brand-heading">
                        Now the hard part: <em className="italic text-brand-tobacco">choosing</em>
                    </h2>
                </div>
                <ul className="grid sm:grid-cols-2 gap-x-14 max-w-4xl mx-auto border-t border-brand-espresso/25">
                    {flavors.map((f) => (
                        <li key={f.name} className="flex items-start gap-4 md:gap-5 border-b border-dashed border-border py-6">
                            <span
                                aria-hidden="true"
                                className="mt-0.5 h-12 w-12 md:h-14 md:w-14 shrink-0 rounded-full shadow-[inset_0_0_0_1px_rgba(60,40,30,0.12),0_3px_10px_rgba(60,40,30,0.14)]"
                                style={{ background: f.swatch }}
                            />
                            <span className="min-w-0">
                                <span className="block font-serif text-[1.7rem] md:text-[2rem] leading-tight text-brand-espresso">{f.name}</span>
                                <span className="block mt-1 text-[15px] leading-relaxed text-foreground/75">{f.text}</span>
                            </span>
                        </li>
                    ))}
                </ul>
                <p className="text-center text-sm text-muted-foreground mt-8">
                    Any flavor, any filling. Tell me what you&apos;re craving and I&apos;ll make it happen.
                </p>
                <div className="max-w-5xl mx-auto mt-14 md:mt-16">
                    <CheesecakeCard />
                </div>
            </section>

            {/* Desserts by the dozen */}
            <section id="desserts" className="scroll-mt-24 container mx-auto px-4 py-16 md:py-20">
                {/* Phones: heading, a short photo strip, then the list.
                    Desktop: the list on the left, a small photo set that stays in view on the right. */}
                <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-x-16 gap-y-8">
                    <div className="space-y-4 lg:col-start-1">
                        <p className="font-mono text-xs uppercase tracking-[0.18em] text-brand-heading">
                            <span className="text-brand-matcha">■</span> Desserts
                        </p>
                        <h2 className="font-serif font-medium text-4xl md:text-5xl text-brand-heading">
                            Sweets by <em className="italic text-brand-tobacco">the dozen</em>
                        </h2>
                        <p className="text-lg text-foreground/85 leading-relaxed">
                            For birthdays, showers or just because. Mix and match your favorites.
                        </p>
                        <DessertRules cheesecakes={false} />
                    </div>
                    <div className="lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:sticky lg:top-28 self-start">
                        <div className="grid grid-cols-5 grid-rows-2 gap-3 aspect-[4/3] lg:aspect-[4/5]">
                            <figure className="relative col-span-3 row-span-2 rounded-[18px] overflow-hidden bg-brand-latte">
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
                            <SpotImg
                                spot="cakes.desserts"
                                i={0}
                                px={900}
                                loading="lazy"
                                className="col-span-2 w-full h-full object-cover object-[center_35%] rounded-[18px]"
                            />
                            <SpotImg
                                spot="cakes.desserts"
                                i={1}
                                px={900}
                                loading="lazy"
                                className="col-span-2 w-full h-full object-cover rounded-[18px]"
                            />
                        </div>
                    </div>
                    <div className="lg:col-start-1">
                        <DessertList />
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
