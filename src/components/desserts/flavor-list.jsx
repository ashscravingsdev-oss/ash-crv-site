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

/** A dessert's flavors as one easy line, like a bakery menu: "Banana Cream · Tiramisu · …" */
export const FlavorLine = ({ items, className = "" }) => (
    <p className={`text-[15px] leading-7 text-foreground/75 ${className}`}>
        {items.map((p, i) => (
            <span key={p.id || p.name}>
                <span className="whitespace-nowrap">
                    {flavorLabel(p)}
                    {p.is_holiday && <em className="ml-1 text-[13px] text-[#9A3B31]">holiday</em>}
                    {i < items.length - 1 && <span aria-hidden="true" className="ml-2 text-brand-tobacco/50">·</span>}
                </span>{" "}
            </span>
        ))}
    </p>
)
