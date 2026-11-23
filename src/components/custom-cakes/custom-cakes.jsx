"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import CakeInquiryForm from "./cake-inquiry-form";
import DessertList from "@/components/desserts/dessert-list";
import DessertRules from "@/components/desserts/dessert-rules";
import PhotoLightbox from "@/components/ui/photo-lightbox";
import FactStrip from "@/components/ui/fact-strip";
import CheesecakeCard from "@/components/desserts/cheesecake-card";
import PhotoRow from "@/components/ui/photo-row";
import { SpotImg, useSpot } from "@/components/site-photos";
import { sized } from "@/lib/site-photos";

// Cake flavors, in Ash's words
const flavors = [
    {
        name: "Chocolate",
        text: "Moist chocolate cake with chocolate ganache in every layer. For my chocolate lovers.",
    },
    {
        name: "Strawberry Velvet",
        text: "My pink strawberry cake, made with real strawberries. Perfect with cream cheese or vanilla buttercream.",
    },
    {
        name: "Strawberries & Cream",
        text: "Vanilla cake with fresh strawberries and whipped cream. One of my most requested.",
    },
    {
        name: "Cookies & Cream",
        text: "Vanilla cake with cookies & cream filling and crushed cookies in every bite.",
    },
    {
        name: "Vanilla Bean",
        text: "Soft vanilla cake made with real vanilla bean. Simple and so good.",
    },
    {
        name: "Red Velvet",
        text: "Classic red velvet with cream cheese frosting.",
    },
    {
        name: "Tres Leches",
        text: "Soaked in three milks, so it's light, creamy and melts in your mouth.",
    },
    {
        name: "Confetti",
        text: "Vanilla cake with sprinkles baked in. A birthday must.",
    },
]

const perks = [
    { value: "From $125", label: "6\" custom cakes" },
    { value: "1 week", label: "to order ahead" },
    { value: "50%", label: "holds your date" },
]

// The cake flavors on a printed bakery menu card (thin double border, centered italic names)
const FlavorsMenuCard = () => (
    <div className="max-w-4xl mx-auto rounded-md border border-brand-tobacco/30 bg-[#fffaf2] p-2 md:p-2.5">
        <div className="rounded-[3px] border border-brand-tobacco/20 px-6 py-10 md:px-14 md:py-14">
            <p className="text-center font-serif italic text-xl md:text-2xl text-brand-tobacco">Cake flavors</p>
            <div aria-hidden="true" className="mx-auto mt-3 h-px w-14 bg-brand-tobacco/40" />
            <ul className="mt-9 md:mt-10 grid md:grid-cols-2 gap-x-14 gap-y-8 md:gap-y-10 text-center">
                {flavors.map((f) => (
                    <li key={f.name}>
                        <p className="font-serif italic text-[1.85rem] md:text-[2.1rem] leading-tight text-brand-espresso">{f.name}</p>
                        <p className="mt-1.5 mx-auto max-w-xs text-[14.5px] leading-relaxed text-foreground/70">{f.text}</p>
                    </li>
                ))}
            </ul>
            <div aria-hidden="true" className="mx-auto mt-10 h-px w-14 bg-brand-tobacco/40" />
            <p className="mt-4 text-center font-serif italic text-lg text-brand-tobacco">
                Any flavor, any filling. Tell me what you&apos;re craving.
            </p>
        </div>
    </div>
)

const CustomCakes = () => {
    const [viewing, setViewing] = useState(null);
    // The cake gallery (Ash can change it on the admin's Website photos page)
    const cakePhotos = useSpot("cakes.gallery").map((p) => ({ src: sized(p.url, 1800), thumb: sized(p.url, 800), alt: p.alt, note: p.note }));

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
                        <p className="font-serif italic text-xl md:text-2xl text-brand-tobacco"><span aria-hidden="true" className="not-italic text-brand-matcha text-[0.55em] align-[0.2em] mr-2">■</span>Cakes &amp; desserts</p>
                        <h1 className="font-serif font-semibold text-[3.25rem] leading-[0.98] sm:text-6xl lg:text-7xl text-brand-heading">
                            Made to <em className="italic font-medium text-brand-tobacco">wow</em>
                        </h1>
                        <p className="text-lg md:text-xl text-foreground/85 leading-relaxed max-w-xl">
                            Every cake starts from scratch in my kitchen and is made just for your celebration. Tell me what
                            you&apos;re dreaming of, and I&apos;ll make it happen.
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

            {/* Flavors */}
            <section id="flavors" className="scroll-mt-24 lg:scroll-mt-32 container mx-auto px-4 pb-16 md:pb-20">
                <div className="text-center mb-10">
                    <h2 className="font-serif font-medium text-4xl md:text-5xl text-brand-heading">
                        Now the hard part: <em className="italic text-brand-tobacco">choosing</em>
                    </h2>
                </div>
                <FlavorsMenuCard />
            </section>

            {/* Gallery */}
            <section id="cakes" className="scroll-mt-24 lg:scroll-mt-32 bg-muted">
                <div className="container mx-auto px-4 py-16 md:py-20">
                    <p className="font-serif italic text-xl md:text-2xl text-brand-tobacco text-center mb-2"><span aria-hidden="true" className="not-italic text-brand-matcha text-[0.55em] align-[0.2em] mr-2">■</span>Recent cakes</p>
                    <h2 className="font-serif font-medium text-4xl md:text-5xl text-brand-heading text-center mb-8 md:mb-10">
                        Cakes I&apos;ve <em className="italic text-brand-tobacco">loved making</em>
                    </h2>
                    <PhotoRow photos={cakePhotos} onOpen={setViewing} label="cakes" />
                    <PhotoLightbox photos={cakePhotos} index={viewing} onIndexChange={setViewing} />
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-8">
                        <button
                            type="button"
                            onClick={() => setViewing(0)}
                            className="inline-flex items-center justify-center gap-3 h-12 px-6 rounded-lg border border-primary text-primary font-mono text-xs uppercase tracking-[0.18em] hover:bg-primary/5 transition-colors"
                        >
                            See all cakes
                        </button>
                        <a
                            href="#request"
                            className="inline-flex items-center justify-center gap-3 h-12 px-6 rounded-lg bg-primary text-primary-foreground font-mono text-xs uppercase tracking-[0.18em] hover:bg-primary/90 transition-colors"
                        >
                            Request a cake <span aria-hidden="true">→</span>
                        </a>
                    </div>
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

            {/* Desserts by the dozen */}
            <section id="desserts" className="scroll-mt-24 lg:scroll-mt-32 container mx-auto px-4 py-16 md:py-20">
                {/* Phones: heading, a short photo strip, then the list.
                    Desktop: the list on the left, a small photo set that stays in view on the right. */}
                <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-x-16 gap-y-8">
                    <div className="space-y-4 lg:col-start-1">
                        <p className="font-serif italic text-xl md:text-2xl text-brand-tobacco"><span aria-hidden="true" className="not-italic text-brand-matcha text-[0.55em] align-[0.2em] mr-2">■</span>Desserts</p>
                        <h2 className="font-serif font-medium text-4xl md:text-5xl text-brand-heading">
                            Sweets by <em className="italic text-brand-tobacco">the dozen</em>
                        </h2>
                        <p className="text-lg text-foreground/85 leading-relaxed">
                            For birthdays, showers or just because. Mix and match your favorites.
                        </p>
                        <DessertRules cheesecakes={false} />
                    </div>
                    <div className="lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:sticky lg:top-32 self-start">
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
                <div id="cheesecakes" className="scroll-mt-24 lg:scroll-mt-32 mt-14 md:mt-16">
                    <CheesecakeCard />
                </div>
            </section>

            {/* Request form */}
            <section id="request" className="scroll-mt-24 lg:scroll-mt-32 bg-muted">
                <div className="container mx-auto px-4 py-16 md:py-20">
                    <CakeInquiryForm />
                </div>
            </section>
        </>
    );
};

export default CustomCakes;
