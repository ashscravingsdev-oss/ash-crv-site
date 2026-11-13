import Link from "next/link"

const AnnouncementBar = () => {
    return (
        <div className="bg-brand-sand text-brand-heading border-b border-border">
            <div className="container mx-auto px-4 py-2 flex flex-wrap justify-center gap-x-8 gap-y-1 font-mono text-[11px] sm:text-xs uppercase tracking-[0.18em] text-center">
                <Link href="/christmas" className="hover:underline underline-offset-4"><span className="text-brand-matcha">■</span> Christmas mini cakes now booking →</Link>
                <span className="hidden sm:inline"><span className="text-brand-matcha">■</span> Delivery every Monday &amp; Tuesday</span>
                <span className="hidden md:inline"><span className="text-brand-matcha">■</span> Meal prep orders close Sunday night</span>
            </div>
        </div>
    )
}

export default AnnouncementBar
