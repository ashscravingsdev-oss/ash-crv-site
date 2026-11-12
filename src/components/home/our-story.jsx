import React from 'react'
import Link from "next/link";

const OurStory = () => {
    return (
        <section id="our-story" className="container mx-auto px-4 py-16 md:py-24">
            <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-center">
                <div className="order-2 md:order-1 aspect-[4/5] max-w-lg w-full rounded-[18px] overflow-hidden bg-muted">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src="/brand/about-hero.jpg"
                        alt="Ash in the kitchen"
                        loading="lazy"
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="space-y-5 order-1 md:order-2">
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-brand-heading">■ Our story</p>
                    <h2 className="font-serif font-medium text-5xl md:text-6xl leading-none text-brand-heading">
                        Hi, I’m <em className="italic">Ash</em>
                    </h2>
                    <p className="text-lg text-foreground/85 leading-relaxed">
                        Everything at Ash’s Cravings is made from scratch, from weekly meal prep that actually tastes amazing
                        to custom cakes with every little detail done by hand. If you’re craving it, I’ll make it with love.
                    </p>
                    <Link href="/about" className="inline-block font-medium border-b border-dashed border-brand-tobacco">
                        Read my story →
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default OurStory
