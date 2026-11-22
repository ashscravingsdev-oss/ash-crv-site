"use client"

import Link from "next/link"
import { STATIC_DESSERTS, useDesserts } from "@/lib/use-desserts"
import { money, soldWhole } from "@/lib/special-orders"
import { sized } from "@/lib/site-photos"
import { useSpot } from "@/components/site-photos"
import { FlavorLine } from "./flavor-list"

// "$85 each · Classic is $80": the usual price, then any flavor that differs
function priceLine(items) {
    const counts = new Map()
    for (const p of items) counts.set(Number(p.price), (counts.get(Number(p.price)) || 0) + 1)
    if (counts.size === 0) return ""
    const usual = [...counts.entries()].sort((a, b) => b[1] - a[1] || b[0] - a[0])[0][0]
    const others = items.filter((p) => Number(p.price) !== usual)
    const label = (p) => p.flavor || String(p.name).replace(/\s*cheesecakes?$/i, "")
    return [`${money(usual)} each`, ...others.map((p) => `${label(p)} is ${money(p.price)}`)].join(" · ")
}

/**
 * Cheesecakes get their own card on the Cakes & Desserts page: they're 8-inch
 * and sold whole, so they don't belong with the sweets by the dozen.
 */
const CheesecakeCard = () => {
    const { groups, live } = useDesserts()
    const group = (live ? groups : STATIC_DESSERTS).find((g) => soldWhole(g.name))
    const picked = useSpot("cakes.cheesecakes")[0]
    if (!group || group.items.length === 0) return null

    // Ash's pick on the Website photos page, else a cheesecake photo from the menu
    const menuPhoto = group.items.find((p) => p.image_url)
    const photo = picked || (menuPhoto ? { url: menuPhoto.image_url, alt: `${menuPhoto.name} from Ash's Cravings` } : null)
    const extras = group.extras || []

    const intro = (
        <div className="space-y-4">
            <h3 className="font-serif font-medium text-4xl md:text-5xl leading-[1.05] text-brand-heading">
                Cheesecakes, <em className="italic text-brand-tobacco">8 inch</em>
            </h3>
            <p className="text-foreground/85 leading-relaxed">
                Sold whole and made from scratch. Grab one for the table, or a few for the party.
            </p>
        </div>
    )
    const details = (
        <div className="space-y-4">
            <FlavorLine items={group.items} />
            <p className="font-serif text-xl text-brand-espresso">{priceLine(group.items)}</p>
            {extras.length > 0 && (
                <p className="text-sm text-muted-foreground -mt-2">
                    {extras.map((x) => `Add ${x.name} for ${money(x.price)}`).join(" · ")}
                </p>
            )}
            <p className="text-sm text-muted-foreground">10 days’ notice · 50% deposit holds your date · Delivery or pickup</p>
            <div className="pt-1">
                <Link
                    href="/menu?tab=desserts&d=cheesecakes"
                    className="inline-flex items-center justify-center gap-3 h-12 px-6 rounded-lg bg-primary text-primary-foreground font-mono text-xs uppercase tracking-[0.18em] hover:bg-primary/90 transition-colors"
                >
                    Order a cheesecake <span aria-hidden="true">→</span>
                </Link>
            </div>
        </div>
    )

    // With a photo: photo on one side, everything else on the other.
    // Without one: the words on one side, the flavors and price on the other.
    return photo ? (
        <div className="grid md:grid-cols-[0.9fr_1.1fr] bg-muted rounded-[22px] overflow-hidden">
            <div className="aspect-[4/3] md:aspect-auto md:min-h-[340px] bg-brand-latte">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={sized(photo.url, 1200)} alt={photo.alt} loading="lazy" className="w-full h-full object-cover" />
            </div>
            <div className="p-6 md:p-10 flex flex-col justify-center space-y-4">
                {intro}
                {details}
            </div>
        </div>
    ) : (
        <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-center bg-muted rounded-[22px] p-6 md:p-10">
            {intro}
            {details}
        </div>
    )
}

export default CheesecakeCard
