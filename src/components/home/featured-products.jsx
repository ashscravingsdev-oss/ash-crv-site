"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchProducts } from "@/store/productSlice"
import ProductItem from "@/components/menu/product-item"
import Link from "next/link";

export default function FeaturedProducts() {
    const dispatch = useDispatch()
    const { products, loading, error } = useSelector((state) => state.products)

    useEffect(() => {
        if (products.length === 0) {
            dispatch(fetchProducts({ order_type: 'meal_prep', limit: 100 }))
        }
    }, [dispatch, products.length])

    const featuredProducts = products.slice(0, 3)
    // Show placeholders until the first fetch finishes, instead of flashing "no products"
    const showSkeleton = loading || (products.length === 0 && !error)

    return (
        <section className="container mx-auto px-4 pt-12 pb-16 md:pb-24">
            <div className="flex flex-wrap items-end justify-between gap-4 mb-8 md:mb-10">
                <div className="space-y-2">
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-brand-heading"><span className="text-brand-matcha">■</span> This week’s menu</p>
                    <h2 className="font-serif font-medium text-4xl md:text-5xl text-brand-heading">
                        Fresh <em className="italic text-brand-tobacco">picks</em>
                    </h2>
                </div>
                <p className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.14em] text-brand-espresso bg-brand-matcha-light rounded-full px-4 py-2">
                    $17 each · 5 for $80 · 10 for $160
                </p>
            </div>

            {showSkeleton ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="animate-pulse bg-muted rounded-2xl h-96" />
                    ))}
                </div>
            ) : featuredProducts.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {featuredProducts.map((product) => (
                        <ProductItem key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12">
                    <p className="text-muted-foreground">This week’s menu is coming soon.</p>
                </div>
            )}

            <div className="text-center mt-10">
                <Link
                    href="/menu"
                    className="inline-flex items-center gap-3 h-12 px-6 rounded-lg border border-primary text-primary font-mono text-xs uppercase tracking-[0.18em] hover:bg-primary/5 transition-colors"
                >
                    View full menu <span aria-hidden="true">→</span>
                </Link>
            </div>
        </section>
    )
}
