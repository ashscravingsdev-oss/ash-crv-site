import { flavorLabel } from "@/lib/special-orders"

// "Apple Crumble (holiday)" in a flavor dropdown
export const flavorOption = (p) => `${flavorLabel(p)}${p?.is_holiday ? " (holiday)" : ""}`

/** A dessert's flavors written out like a menu card, with holiday flavors marked. */
export const FlavorList = ({ items, className = "", as: Tag = "p" }) => (
    <Tag className={`italic leading-relaxed text-foreground/70 ${className}`}>
        {items.map((p, i) => (
            <span key={p.id || p.name}>
                {i > 0 && " · "}
                {flavorLabel(p)}
                {p.is_holiday && (
                    <span className="not-italic ml-1.5 inline-block rounded-full bg-[#B0473B]/10 px-2 py-px align-[1px] text-[11px] text-[#9A3B31]">
                        holiday
                    </span>
                )}
            </span>
        ))}
    </Tag>
)

/** A dessert's flavors as small soft tags (the Cakes & Desserts page). */
export const FlavorTags = ({ items, className = "" }) => (
    <span className={`flex flex-wrap gap-1.5 ${className}`}>
        {items.map((p) => (
            <span
                key={p.id || p.name}
                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[13px] ${
                    p.is_holiday ? "bg-[#B0473B]/10 text-[#9A3B31]" : "bg-brand-latte/60 text-foreground/80"
                }`}
            >
                {flavorLabel(p)}
                {p.is_holiday && <span className="ml-1 text-[11px]">· holiday</span>}
            </span>
        ))}
    </span>
)
