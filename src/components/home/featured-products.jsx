"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux"
import { fetchProducts } from "@/store/productSlice"
import ProductItem from "@/components/menu/product-item"
import Link from "next/link";
import { motion } from "framer-motion"
import { fadeUp } from "@/lib/animations"

export default function FeaturedProducts() {
    const dispatch = useDispatch()
    const { products, loading } = useSelector((state) => state.products)

    // Fetch products only if not already loaded (or re-fetch every mount)
    useEffect(() => {
        if (products.length === 0) {
            dispatch(fetchProducts())
        }
    }, [dispatch, products.length])

    // Take only the first 3 products
    const featuredProducts = products.slice(0, 3)

    return (
        <section className="bg-muted py-16 md:py-24">
            <div className="container mx-auto px-4">
                <motion.div
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Fresh Picks for You</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Our chef‑crafted meals and cold‑pressed juices, delivered to your door.
                    </p>
                </motion.div>

                {/* Product Grid – same styling as Menu */}
                {loading ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="animate-pulse bg-muted rounded-xl h-80" />
                        ))}
                    </div>
                ) : featuredProducts.length > 0 ? (
                    <motion.div
                        initial="initial"
                        animate="animate"
                        variants={{
                            animate: {
                                transition: {
                                    staggerChildren: 0.1,
                                },
                            },
                        }}
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {featuredProducts.map((product, index) => (
                            <motion.div
                                key={product.id}
                                variants={fadeUp}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                layout
                            >
                                <ProductItem product={product} />
                            </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-muted-foreground">No products available at the moment.</p>
                    </div>
                )}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="text-center mt-8"
                >
                    <Button size="lg" variant="outline" asChild>
                        <Link href="/menu">View Full Menu</Link>
                    </Button>
                </motion.div>
            </div>
        </section>
    )
}