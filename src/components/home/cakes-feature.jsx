import Link from "next/link";

const CakesFeature = () => {
    return (
        <section className="bg-muted">
            <div className="container mx-auto px-4 py-16 md:py-24 grid lg:grid-cols-[1fr_1.25fr] gap-10 lg:gap-14 items-center">
                <div className="space-y-5">
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-brand-heading"><span className="text-brand-matcha">■</span> Custom cakes</p>
                    <h2 className="font-serif font-medium text-5xl md:text-6xl leading-[0.98] text-brand-heading">
                        Cakes made to <em className="italic text-brand-tobacco">wow</em>
                    </h2>
                    <p className="text-lg text-foreground/85 leading-relaxed max-w-md">
                        Made from scratch and decorated by hand, down to the last little pearl. Tell me your idea and I’ll bring it to life.
                    </p>
                    <div className="border-t border-dashed border-brand-tobacco max-w-md">
                        <div className="flex justify-between py-3 border-b border-dashed border-brand-tobacco">
                            <span>6” custom cakes</span>
                            <span className="font-mono text-sm">from $125</span>
                        </div>
                        <div className="flex justify-between py-3 border-b border-dashed border-brand-tobacco">
                            <span>Tasting box, 4 flavors</span>
                            <span className="font-mono text-sm">$55</span>
                        </div>
                    </div>
                    <Link
                        href="/custom-cakes"
                        className="inline-flex items-center gap-3 h-12 px-6 rounded-lg bg-primary text-primary-foreground font-mono text-xs uppercase tracking-[0.18em] hover:bg-primary/90 transition-colors"
                    >
                        Request a cake <span aria-hidden="true">→</span>
                    </Link>
                </div>

                <div className="grid grid-cols-2 gap-3 md:gap-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src="/gallery/cakes/cake-37.jpg"
                        alt="Vintage-piped cake topped with cherries and red bows"
                        loading="lazy"
                        className="row-span-2 w-full h-full min-h-[320px] md:min-h-[460px] object-cover rounded-2xl"
                    />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src="/gallery/cakes/cake-22.jpg"
                        alt="Red and green Christmas mini cakes"
                        loading="lazy"
                        className="w-full aspect-square object-cover rounded-2xl"
                    />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src="/gallery/cakes/cake-43.jpg"
                        alt="Close-up of a vintage-piped engagement cake"
                        loading="lazy"
                        className="w-full aspect-square object-cover rounded-2xl"
                    />
                </div>
            </div>
        </section>
    )
}

export default CakesFeature
