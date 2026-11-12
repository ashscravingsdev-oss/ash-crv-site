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
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-brand-heading"><span className="text-brand-matcha">■</span> My story</p>
                    <h2 className="font-serif font-medium text-5xl md:text-6xl leading-none text-brand-heading">
                        Hi, I’m <em className="italic text-brand-matcha-dark">Ash</em>
                    </h2>
                    <p className="text-lg text-foreground/85 leading-relaxed">
                        I’m sooo obsessed with food. I love cooking every kind of cuisine, and I’m always hungry! I love
                        living healthy and feeling good, but I still have my cravings, of course, so I make them my way,
                        with real, fresh food. That’s Ash’s Cravings.
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
