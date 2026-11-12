const items = ["Meal prep", "Cakes & desserts", "Events", "Private chef", "Made fresh, with love"]

// A slow, endless ribbon of words. Each half holds the list twice so it always fills wide screens.
const Half = ({ hidden }) => (
    <div className="flex shrink-0 items-center" aria-hidden={hidden}>
        {[...items, ...items].map((text, i) => (
            <span key={i} className="flex items-center whitespace-nowrap">
                <span className="px-6 md:px-8">{text}</span>
                <span className="text-brand-latte/70 text-base">✦</span>
            </span>
        ))}
    </div>
)

const MochaBand = () => {
    return (
        <div className="bg-brand-mocha text-brand-cream overflow-hidden py-3 md:py-4">
            <p className="sr-only">{items.join(", ")}</p>
            <div className="flex w-max animate-marquee motion-reduce:animate-none font-serif italic text-xl md:text-2xl" aria-hidden="true">
                <Half />
                <Half hidden />
            </div>
        </div>
    )
}

export default MochaBand
