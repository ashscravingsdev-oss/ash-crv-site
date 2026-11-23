import React from 'react'
import Link from "next/link";
import { SpotImg } from "@/components/site-photos";

const OurStory = () => {
    return (
        <section id="our-story" className="container mx-auto px-4 py-16 md:py-24">
            <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-center">
                <div className="order-2 md:order-1 aspect-[4/5] max-w-lg w-full rounded-[18px] overflow-hidden bg-muted">
                    <SpotImg
                        spot="home.story"
                        loading="lazy"
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="space-y-5 order-1 md:order-2">
                    <p className="font-serif italic text-xl md:text-2xl text-brand-tobacco"><span aria-hidden="true" className="not-italic text-brand-matcha text-[0.55em] align-[0.2em] mr-2">■</span>My story</p>
                    <h2 className="font-serif font-medium text-5xl md:text-6xl leading-none text-brand-heading">
                        Meet <em className="italic text-brand-tobacco">Ash</em>
                    </h2>
                    <p className="text-lg text-foreground/85 leading-relaxed">
                        I learned to cook right beside my grandma, then trained as a chef in culinary school. Now I get
                        to cook for you every week, with everything starting from scratch.
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
