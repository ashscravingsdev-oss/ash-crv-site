import Link from "next/link"

// Christmas mini cakes show until Christmas, then Events takes their spot
const CHRISTMAS_UNTIL = new Date("2026-12-25T08:00:00Z")

const picks = () => [
    { title: "Meal Prep", line: "Eat good all week", href: "/menu", img: "/gallery/meals/salmon-meal-prep.jpg", alt: "Salmon meal prep with an Ash's Cravings sticker" },
    { title: "Cakes & Desserts", line: "Made to wow", href: "/custom-cakes", img: "/gallery/cakes/cake-05.jpg", alt: "50th birthday cake with blush garden roses" },
    new Date() < CHRISTMAS_UNTIL
        ? { title: "Christmas Mini Cakes", line: "This season only", href: "/christmas", img: "/gallery/cakes/cake-22.jpg", alt: "Green Christmas mini cake with red bows" }
        : { title: "Events", line: "Feed the whole crew", href: "/events", img: "/gallery/catering/catering-16.jpg", alt: "Party platters on a styled table" },
]

/** Three photo links to the main parts of the site (shown in the empty cart) */
export default function CravingPicks({ className = "" }) {
    return (
        <ul className={`grid gap-3 sm:grid-cols-3 sm:gap-5 ${className}`}>
            {picks().map((t) => (
                <li key={t.href}>
                    <Link
                        href={t.href}
                        className="group flex sm:flex-col items-center sm:items-stretch gap-4 sm:gap-0 rounded-2xl bg-background border border-border/70 p-2.5 sm:p-0 overflow-hidden text-left transition-colors hover:border-brand-tobacco/40"
                    >
                        <div className="h-20 w-20 sm:h-auto sm:w-full sm:aspect-[4/3] shrink-0 overflow-hidden rounded-xl sm:rounded-none bg-brand-latte">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={t.img}
                                alt={t.alt}
                                loading="lazy"
                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                            />
                        </div>
                        <div className="flex flex-1 items-center sm:items-end justify-between gap-2 sm:p-5">
                            <div>
                                <p className="font-serif text-2xl font-semibold leading-none text-brand-espresso">{t.title}</p>
                                <p className="mt-1 text-sm text-muted-foreground">{t.line}</p>
                            </div>
                            <span aria-hidden="true" className="pr-2 sm:pr-0 text-lg text-brand-espresso transition-transform group-hover:translate-x-1">→</span>
                        </div>
                    </Link>
                </li>
            ))}
        </ul>
    )
}
