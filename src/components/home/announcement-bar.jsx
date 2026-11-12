const AnnouncementBar = () => {
    return (
        <div className="bg-brand-sand text-brand-heading border-b border-border">
            <div className="container mx-auto px-4 py-2 flex flex-wrap justify-center gap-x-8 gap-y-1 font-mono text-[11px] sm:text-xs uppercase tracking-[0.18em] text-center">
                <span>■ Christmas mini cakes now booking</span>
                <span className="hidden sm:inline">■ Order by Monday, delivered Tuesday</span>
                <span className="hidden md:inline">■ Made fresh in Eastvale, CA</span>
            </div>
        </div>
    )
}

export default AnnouncementBar
