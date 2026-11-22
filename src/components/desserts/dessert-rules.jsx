/**
 * The dessert rules, said once at the top of the desserts (on the Cakes &
 * Desserts page and the Menu's Desserts tab) instead of under every list.
 */
const CHEESECAKES = "Cheesecakes are 8″ and sold whole"
const RULES = [
    "2 dozen minimum per flavor",
    "One flavor per dozen",
    CHEESECAKES,
    "10 days’ notice",
    "50% deposit holds your date",
    "Delivery or pickup",
]

// cheesecakes={false} where the cheesecakes have their own card (Cakes & Desserts page)
const DessertRules = ({ className = "", cheesecakes = true }) => (
    <div className={`rounded-2xl bg-brand-latte/35 px-5 py-4 ${className}`}>
        <p className="font-serif italic text-lg text-brand-tobacco">Good to know</p>
        <ul className="mt-1.5 grid sm:grid-cols-2 gap-x-6 gap-y-1 text-[15px] leading-relaxed text-foreground/85">
            {RULES.filter((r) => cheesecakes || r !== CHEESECAKES).map((r) => (
                <li key={r} className="flex gap-2.5">
                    <span aria-hidden="true" className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-tobacco/60" />
                    {r}
                </li>
            ))}
        </ul>
    </div>
)

export default DessertRules
