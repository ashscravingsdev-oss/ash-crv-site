"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchProducts } from "@/store/productSlice"
import { isMenuProduct } from "@/lib/special-orders"
import { isTreat } from "@/lib/treats"
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

    // Only what's on the menu right now (a product that's turned off never shows)
    const featuredProducts = products.filter((p) => p.is_active !== false && isMenuProduct(p) && !isTreat(p)).slice(0, 3)
    // Show placeholders until the first fetch finishes, instead of flashing "no products"
    const showSkeleton = loading || (products.length === 0 && !error)

    return (
        <section className="container mx-auto px-4 pt-16 md:pt-24 pb-16 md:pb-24">
            <div className="flex flex-wrap items-end justify-between gap-4 mb-8 md:mb-10">
                <div className="space-y-2">
                    <p className="font-serif italic text-xl md:text-2xl text-brand-tobacco"><span aria-hidden="true" className="not-italic text-brand-matcha text-[0.55em] align-[0.2em] mr-2">■</span>This week’s menu</p>
                    <h2 className="font-serif font-medium text-4xl md:text-5xl text-brand-heading">
                        Fresh <em className="italic text-brand-tobacco">picks</em>
                    </h2>
                    <p className="text-lg text-foreground/80 leading-relaxed max-w-xl">
                        Order by Sunday, and I&apos;ll cook it fresh for Tuesday, delivery or pickup.
                    </p>
                </div>
                <p className="font-serif italic text-lg text-brand-espresso bg-brand-matcha-light rounded-full px-4 py-1.5">
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
