"use client"

import Link from "next/link"
import { STATIC_DESSERTS, useDesserts } from "@/lib/use-desserts"
import { dessertSlug, soldWhole } from "@/lib/special-orders"
import { FlavorTags } from "./flavor-list"

/**
 * The dessert list for "Sweets by the dozen": each dessert with its flavors as
 * little tags. No prices here (they differ by flavor); each row opens that
 * dessert on the Menu, where the prices are. Cheesecakes have their own card
 * (CheesecakeCard), since they're sold whole. The rules sit above this list.
 */
const DessertList = () => {
    const { groups, live } = useDesserts()
    const list = (live ? groups : STATIC_DESSERTS).filter((g) => !soldWhole(g.name))

    return (
        <div className="space-y-6">
            <ul className="border-t border-brand-espresso/25">
                {list.map((g) => (
                    <li key={g.name} className="border-b border-dashed border-border">
                        <Link
                            href={`/menu?tab=desserts&d=${dessertSlug(g.name)}`}
                            className="group block py-5 -mx-3 px-3 rounded-xl transition-colors hover:bg-brand-latte/40 focus-visible:bg-brand-latte/40 outline-none"
                        >
                            <span className="flex items-baseline justify-between gap-4">
                                <span className="font-serif text-2xl md:text-[1.7rem] leading-tight text-brand-espresso">{g.name}</span>
                                <span className="shrink-0 text-sm text-brand-tobacco md:opacity-0 md:group-hover:opacity-100 md:group-focus-visible:opacity-100 transition-opacity">
                                    Order <span aria-hidden="true">→</span>
                                </span>
                            </span>
                            <FlavorTags items={g.items} className="mt-2.5" />
                        </Link>
                    </li>
                ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-3">
                <Link
                    href="/menu?tab=desserts"
                    className="inline-flex items-center justify-center gap-3 h-12 px-6 rounded-lg bg-primary text-primary-foreground font-mono text-xs uppercase tracking-[0.18em] hover:bg-primary/90 transition-colors"
                >
                    See prices &amp; order <span aria-hidden="true">→</span>
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
