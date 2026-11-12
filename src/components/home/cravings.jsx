"use client"
import Link from "next/link";
import { useSelector } from "react-redux";

const Cravings = () => {
    const { products } = useSelector((state) => state.products)
    const mealPhoto =
        products?.find((p) => p.category?.name === "Meals" && p.image_url)?.image_url ||
        "/brand/home-hero.jpg"

    const tiles = [
        { title: "Meal Prep", line: "Eat good all week", href: "/menu", img: mealPhoto, alt: "Meal prep bowl" },
        { title: "Party Packs", line: "Feed the whole crew", href: "/catering", img: "/gallery/catering/catering-16.jpg", alt: "Party platters on a styled table" },
        { title: "Cakes", line: "Made to wow", href: "/custom-cakes", img: "/gallery/cakes/cake-06.jpg", alt: "Green vintage-piped cake with red bows" },
        { title: "Desserts", line: "Little sweet things", href: "/menu", img: "/gallery/catering/catering-05.jpg", alt: "Chocolate-covered strawberries and dessert cups" },
    ]

    return (
        <section className="bg-muted">
            <div className="container mx-auto px-4 py-16 md:py-24">
                <div className="text-center mb-10 md:mb-12 space-y-2">
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-brand-heading">■ Pick your craving</p>
                    <h2 className="font-serif font-medium text-4xl md:text-5xl text-brand-heading">
                        Something for <em className="italic">every</em> mood
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
                            <div className="p-4 md:p-5 flex items-end justify-between gap-2">
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
