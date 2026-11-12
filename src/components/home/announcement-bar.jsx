const AnnouncementBar = () => {
    return (
        <div className="bg-brand-matcha-light text-brand-espresso">
            <div className="container mx-auto px-4 py-2 flex flex-wrap justify-center gap-x-8 gap-y-1 font-mono text-[11px] sm:text-xs uppercase tracking-[0.18em] text-center">
                <span><span className="text-brand-matcha-dark">■</span> Christmas mini cakes now booking</span>
                <span className="hidden sm:inline"><span className="text-brand-matcha-dark">■</span> Delivery every Monday &amp; Tuesday</span>
                <span className="hidden md:inline"><span className="text-brand-matcha-dark">■</span> Made fresh in Eastvale, CA</span>
            </div>
        </div>
    )
}

export default AnnouncementBar
