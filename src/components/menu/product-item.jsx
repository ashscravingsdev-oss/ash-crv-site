"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { motion } from "framer-motion"
import { useDispatch, useSelector } from "react-redux"
import { addToCart } from "@/store/cartSlice"
import { useState } from "react"
import { ShoppingCart, Loader2, Check } from "lucide-react"
import { toast } from "sonner"
import { bestSellerLabel } from "@/lib/menu-pins"

const ProductItem = ({ product }) => {
    const dispatch = useDispatch()
    const [isAdding, setIsAdding] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)

    // Get cart from Redux to check if product already in cart
    const { cart, itemLoading } = useSelector(state => state.cart)

    const handleAddToCart = async (e) => {
        e.preventDefault() // Prevent navigation to product page
        e.stopPropagation() // Stop event bubbling

        if (!cart?.id) {
            // toast.error("Cart not initialized")
            return
        }

        setIsAdding(true)

        try {
            const result = await dispatch(addToCart({
                cart_id: cart.id,
                product_id: product.id,
                quantity: 1
            })).unwrap()

            // Show success state
            setShowSuccess(true)
            // toast.success(`${product.name} added to cart!`, {
            //     icon: '🛒',
            //     duration: 2000
            // })

            // Reset success state after 2 seconds
            setTimeout(() => {
                setShowSuccess(false)
            }, 2000)

        } catch (error) {
            console.error("Failed to add to cart:", error)

            // Handle inventory errors
            if (typeof error === "string" || error?.message) {
                toast.error(typeof error === "string" ? error : error.message)
            } else {
                toast.error("Failed to add item to cart")
            }
        } finally {
            setIsAdding(false)
        }
    }

    // Check if product is already in cart
  const cartItem = cart?.items?.find(item =>
        item.product_id === product.id && item.product_id !== null
    )
    const isInCart = !!cartItem
    const badge = bestSellerLabel(product)

    return (
        <Link href={`/menu/${product.slug}`}>
            <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="h-full"
            >
                <Card className="relative overflow-hidden rounded-2xl hover:shadow-lg transition-shadow h-full">
                    {badge && (
                        <span className="absolute top-3 left-3 z-10 rounded-full bg-brand-matcha-light text-brand-espresso px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em] shadow-md">
                            ★ {badge}
                        </span>
                    )}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                        className="aspect-square overflow-hidden relative"
                    >
                        <img
                            src={product.image_url || "/placeholder.svg"}
                            alt={product.name}
                            className="w-full h-full object-cover"
                        />
                    </motion.div>

                    <CardContent className="p-6">
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            className="flex items-center gap-2 mb-2"
                        >
                            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-brand-heading">
                                <span className="text-brand-matcha">■</span> {product.category?.name || "Menu"}
                            </span>

                            {isInCart && (
                                <Badge variant="outline" className="text-xs border-green-500 text-green-500">
                                    In Cart ({cartItem.quantity})
                                </Badge>
                            )}
                        </motion.div>

                        <motion.h3
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.15 }}
                            className="font-serif text-2xl font-semibold leading-tight mb-2 text-brand-espresso"
                        >
                            {product.name}
                        </motion.h3>

                        <motion.p
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-muted-foreground text-sm mb-4 leading-relaxed line-clamp-2"
                        >
                            {product.description}
                        </motion.p>

                        {(Number(product.nutrition_info?.calories) > 0 || Number(product.nutrition_info?.protein) > 0) && (
                            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                                {Number(product.nutrition_info?.calories) > 0 && <span>{product.nutrition_info.calories} cal</span>}
                                {Number(product.nutrition_info?.protein) > 0 && <span>{product.nutrition_info.protein}g protein</span>}
                            </div>
                        )}

                        <motion.div
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="flex items-center justify-between pt-3 border-t border-dashed border-border"
                            onClick={(e) => e.preventDefault()} // Prevent link click on price/button area
                        >
                            <span className="font-serif text-3xl font-semibold text-brand-espresso">${Number(product.price) % 1 === 0 ? Number(product.price) : product.price}</span>

                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Button
                                    onClick={handleAddToCart}
                                    disabled={
                                        isAdding ||
                                        showSuccess ||
                                        itemLoading ||
                                        product.inventory?.stock_quantity === 0
                                    }
                                    className={`
                                        relative min-w-[120px] font-mono text-xs uppercase tracking-[0.12em]
                                        ${showSuccess ? 'bg-green-600 hover:bg-green-700' : ''}
                                        ${product.inventory?.stock_quantity === 0 ? 'opacity-50 cursor-not-allowed' : ''}
                                    `}
                                >
                                    {isAdding ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Adding...
                                        </>
                                    ) : showSuccess ? (
                                        <>
                                            <Check className="mr-2 h-4 w-4" />
                                            Added!
                                        </>
                                    ) : product.inventory?.stock_quantity === 0 ? (
                                        "Out of Stock"
                                    ) : isInCart ? (
                                        <>
                                            <ShoppingCart className="mr-2 h-4 w-4" />
                                            Add More
                                        </>
                                    ) : (
                                        <>
                                            <ShoppingCart className="mr-2 h-4 w-4" />
                                            Add to Cart
                                        </>
                                    )}
                                </Button>
                            </motion.div>
                        </motion.div>
                    </CardContent>
                </Card>
            </motion.div>
        </Link>
    )
}

export default ProductItem