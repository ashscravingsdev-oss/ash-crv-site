import ProductItem from "./product-item"

/** The treats that are always on the menu, in their own section at the end of it */
const SweetCravings = ({ treats = [], className = "" }) => {
    if (!treats.length) return null

    return (
        <section aria-labelledby="sweet-cravings-heading" className={className}>
            <div className="mb-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-brand-heading">
                    <span className="text-brand-matcha">■</span> Always on the menu
                </p>
                <h2 id="sweet-cravings-heading" className="font-serif font-medium text-3xl md:text-4xl text-brand-heading mt-1">
                    Sweet <em className="italic text-brand-tobacco">Cravings</em>
                </h2>
                <p className="text-muted-foreground mt-1">A little something sweet to add to your order.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {treats.map((product) => (
                    <ProductItem key={product.id} product={product} />
                ))}
            </div>
        </section>
    )
}

export default SweetCravings
