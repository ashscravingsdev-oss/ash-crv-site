"use client"
import Link from "next/link";

const Cravings = () => {
    // Four photos picked to sit together: bright, warm, soft colors
    const tiles = [
        { title: "Meal Prep", line: "Eat good all week", href: "/menu", img: "/gallery/meals/salmon-meal-prep.jpg", alt: "Salmon meal prep with an Ash's Cravings sticker" },
        { title: "Cakes & Desserts", line: "Made to wow", href: "/custom-cakes", img: "/gallery/cakes/cake-05.jpg", alt: "50th birthday cake with blush garden roses" },
        { title: "Events", line: "Feed the whole crew", href: "/events", img: "/gallery/catering/catering-16.jpg", alt: "Party platters on a styled table with greenery" },
        { title: "Private Chef", line: "Dinner at your place", href: "/events#private-chef", img: "/gallery/catering/catering-15.jpg", alt: "Smoked salmon bites with gold forks" },
    ]

    return (
        <section className="bg-muted">
            <div className="container mx-auto px-4 py-16 md:py-24">
                <div className="text-center mb-10 md:mb-12 space-y-2">
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-brand-heading"><span className="text-brand-matcha">■</span> Pick your craving</p>
                    <h2 className="font-serif font-medium text-4xl md:text-5xl text-brand-heading">
                        Something for <em className="italic text-brand-tobacco">every</em> mood
                    </h2>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
                    {tiles.map((t) => (
                        <Link
                            key={t.title}
                            href={t.href}
                            className="group bg-background rounded-2xl overflow-hidden flex flex-col"
                        >
                            <div className="aspect-square overflow-hidden bg-brand-latte">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={t.img}
                                    alt={t.alt}
                                    loading="lazy"
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                                />
                            </div>
                            <div className="flex-1 p-4 md:p-5 flex items-end justify-between gap-2">
                                <div>
                                    <h3 className="font-serif text-2xl md:text-3xl font-semibold leading-none text-brand-espresso">{t.title}</h3>
                                    <p className="text-sm md:text-[15px] text-muted-foreground mt-1">{t.line}</p>
                                </div>
                                <span aria-hidden="true" className="text-lg text-brand-espresso transition-transform group-hover:translate-x-1">→</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Cravings
