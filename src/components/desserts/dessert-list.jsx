"use client"

import Link from "next/link"
import { STATIC_DESSERTS, useDesserts } from "@/lib/use-desserts"
import { dessertSlug, flavorLabel, priceRange } from "@/lib/special-orders"

/**
 * The dessert list for "Sweets by the dozen": six desserts, each with its price
 * a dozen and every flavor written out underneath, like a menu card. Each one
 * opens that dessert in the Menu's Desserts tab to order.
 */
const DessertList = () => {
    const { groups, live } = useDesserts()
    const list = live ? groups : STATIC_DESSERTS

    return (
        <div className="space-y-6">
            <ul className="border-t border-brand-espresso/25">
                {list.map((g) => (
                    <li key={g.name} className="border-b border-dashed border-border">
                        <Link
                            href={`/menu?tab=desserts&d=${dessertSlug(g.name)}`}
                            className="group grid grid-cols-[1fr_auto] gap-x-4 sm:gap-x-6 py-5 -mx-3 px-3 rounded-xl transition-colors hover:bg-brand-latte/40 focus-visible:bg-brand-latte/40 outline-none"
                        >
                            <span className="min-w-0">
                                <span className="block font-serif text-2xl md:text-[1.7rem] leading-tight text-brand-espresso">
                                    {g.name}
                                </span>
                                <span className="block mt-1.5 text-[15px] leading-relaxed italic text-foreground/70">
                                    {g.items.map((p) => flavorLabel(p)).join(" · ")}
                                </span>
                            </span>
                            <span className="text-right pt-1">
                                <span className="block font-serif text-xl md:text-2xl text-brand-espresso whitespace-nowrap">
                                    {priceRange(g.items)}
                                </span>
                                <span className="block font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">a dozen</span>
                                <span className="inline-block mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-brand-tobacco opacity-100 md:opacity-0 md:group-hover:opacity-100 md:group-focus-visible:opacity-100 transition-opacity">
                                    Order →
                                </span>
                            </span>
                        </Link>
                    </li>
                ))}
            </ul>

            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-brand-heading leading-relaxed">
                One flavor per dozen · 2 dozen minimum per flavor · 10 days&apos; notice · 50% deposit
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
                <Link
                    href="/menu?tab=desserts"
                    className="inline-flex items-center justify-center gap-3 h-12 px-6 rounded-lg bg-primary text-primary-foreground font-mono text-xs uppercase tracking-[0.18em] hover:bg-primary/90 transition-colors"
                >
                    Order desserts <span aria-hidden="true">→</span>
                </Link>
                <a
                    href="#request"
                    className="inline-flex items-center justify-center gap-3 h-12 px-6 rounded-lg border border-primary text-primary font-mono text-xs uppercase tracking-[0.18em] hover:bg-primary/5 transition-colors"
                >
                    Plan a dessert table <span aria-hidden="true">→</span>
                </a>
            </div>
        </div>
    )
}

export default DessertList
