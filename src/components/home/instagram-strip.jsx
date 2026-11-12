const photos = [
    { src: "/gallery/catering/catering-02.jpg", alt: "Avocado and tomato toasts for an event" },
    { src: "/gallery/cakes/cake-17.jpg", alt: "Cupcake flower bouquet" },
    { src: "/gallery/desserts/dessert-boxes-1.jpg", alt: "Dessert boxes with chocolate-covered strawberries and mini cheesecakes" },
    { src: "/gallery/cakes/cake-27.jpg", alt: "Strawberry-topped celebration cake" },
    { src: "/gallery/cakes/cake-01.jpg", alt: "White cake with pink and red rosettes" },
    { src: "/gallery/cakes/cake-39.jpg", alt: "Cake topped with cherries" },
]

const IG_URL = "https://www.instagram.com/ashscravings"

const InstagramStrip = () => {
    return (
        <section className="py-12 md:py-16">
            <div className="container mx-auto px-4 flex items-end justify-between gap-4 mb-5">
                <div>
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-brand-heading"><span className="text-brand-matcha">■</span> Follow along</p>
                    <a href={IG_URL} target="_blank" rel="noopener noreferrer" className="font-serif font-medium text-3xl md:text-4xl text-brand-heading hover:text-brand-tobacco transition-colors">
                        @ashscravings
                    </a>
                </div>
                <a href={IG_URL} target="_blank" rel="noopener noreferrer" className="shrink-0 font-mono text-xs uppercase tracking-[0.18em] text-brand-espresso border-b border-dashed border-brand-tobacco pb-0.5">
                    Instagram →
                </a>
            </div>

            {/* One row: swipe on phones, six across on bigger screens */}
            <div className="flex md:grid md:grid-cols-6 gap-2 overflow-x-auto md:overflow-visible snap-x snap-mandatory scroll-px-4 md:scroll-px-0 px-4 md:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {photos.map((photo) => (
                    <a
                        key={photo.src}
                        href={IG_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group shrink-0 w-[42vw] sm:w-[28vw] md:w-auto aspect-square overflow-hidden rounded-xl md:rounded-none snap-start bg-muted"
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={photo.src}
                            alt={photo.alt}
                            loading="lazy"
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                    </a>
                ))}
            </div>
        </section>
    )
}

export default InstagramStrip
