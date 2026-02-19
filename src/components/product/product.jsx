"use client"

import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Minus, Plus, ShoppingCart, Heart, LoaderCircle, Check, ShoppingBag } from "lucide-react"
import Link from "next/link"
import ProductImages from './product-images'
import ProductNutrition from './product-nutrition'
import ProductInfo from './product-info'
import SEO from '../seo'
import { fetchProductBySlug } from '@/store/productSlice'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, updateCartItem, fetchCart } from '@/store/cartSlice'
// import { toast } from 'react-hot-toast'
import { motion, AnimatePresence } from 'framer-motion'

const relatedProducts = [
    {
        id: "3",
        name: "Power Protein Pack",
        price: 14.99,
        image: "/protein-meal-prep-salmon-sweet-potato.jpg",
        slug: "power-protein-pack"
    },
    {
        id: "5",
        name: "Asian Fusion Bowl",
        price: 13.99,
        image: "/asian-teriyaki-bowl.jpg",
        slug: "asian-fusion-bowl"
    },
    {
        id: "6",
        name: "Breakfast Power Bowl",
        price: 11.99,
        image: "/breakfast-power-bowl.jpg",
        slug: "breakfast-power-bowl"
    },
]

const Product = ({ slug }) => {
    const dispatch = useDispatch()
    const {
        product,
        loading: productLoading
    } = useSelector((state) => state.products)

    const { cart, itemLoading } = useSelector((state) => state.cart)

    const [quantity, setQuantity] = useState(1)
    const [selectedAddons, setSelectedAddons] = useState([])
    const [isAdding, setIsAdding] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)

    // Find if product is already in cart
    const cartItem = cart?.items?.find(item =>
        item.product_id === product?.id && item.product_id !== null
    )
    const isInCart = !!cartItem

    // Initialize selected addons from cart if product exists
    useEffect(() => {
        if (cartItem?.addon_ids) {
            setSelectedAddons(cartItem.addon_ids)
        }
    }, [cartItem])

    // Initialize quantity from cart if product exists
    useEffect(() => {
        if (cartItem?.quantity) {
            setQuantity(cartItem.quantity)
        }
    }, [cartItem])

    useEffect(() => {
        if (slug) {
            dispatch(fetchProductBySlug(slug))
        }
    }, [dispatch, slug])

    // Fetch cart on mount
    useEffect(() => {
        const getSessionId = () => {
            let sessionId = localStorage.getItem('session_id')
            if (!sessionId) {
                sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
                localStorage.setItem('session_id', sessionId)
            }
            return sessionId
        }

        const token = localStorage.getItem('token')
        const params = token ? {} : { session_id: getSessionId() }
        dispatch(fetchCart(params))
    }, [dispatch])

    const handleAddonToggle = (addonId) => {
        setSelectedAddons((prev) =>
            prev.includes(addonId)
                ? prev.filter((id) => id !== addonId)
                : [...prev, addonId]
        )
    }

    const getTotalPrice = () => {
        if (!product) return "0.00"

        let total = product.price * quantity
        selectedAddons.forEach((addonId) => {
            const addon = product.addons?.find((a) => a.id === addonId)
            if (addon) total += addon.price * quantity
        })
        return total.toFixed(2)
    }

    const handleAddToCart = async () => {
        if (!cart?.id) {
            toast.error("Cart not initialized")
            return
        }

        if (!product) return

        setIsAdding(true)

        try {
            const result = await dispatch(addToCart({
                cart_id: cart.id,
                product_id: product.id,
                addon_ids: selectedAddons,
                quantity: quantity
            })).unwrap()

            setShowSuccess(true)
            toast.success(
                <div>
                    <p className="font-semibold">{quantity} × {product.name} added to cart!</p>
                    {selectedAddons.length > 0 && (
                        <p className="text-xs mt-1">+ {selectedAddons.length} add-on(s)</p>
                    )}
                </div>,
                { icon: '🛒', duration: 3000 }
            )

            setTimeout(() => {
                setShowSuccess(false)
            }, 2000)

        } catch (error) {
            console.error("Failed to add to cart:", error)
            toast.error(error?.message || "Failed to add item to cart")
        } finally {
            setIsAdding(false)
        }
    }

    const handleUpdateCart = async () => {
        if (!cartItem) return

        setIsAdding(true)

        try {
            await dispatch(updateCartItem({
                id: cartItem.id,
                updateData: {
                    quantity: quantity,
                    addon_ids: selectedAddons
                }
            })).unwrap()

            toast.success("Cart updated successfully!")
            setShowSuccess(true)

            setTimeout(() => {
                setShowSuccess(false)
            }, 2000)

        } catch (error) {
            console.error("Failed to update cart:", error)
            toast.error(error?.message || "Failed to update cart")
        } finally {
            setIsAdding(false)
        }
    }

    if (productLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <LoaderCircle className="w-12 h-12 text-primary animate-spin" />
            </div>
        )
    }

    if (!product) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
                <Button asChild>
                    <Link href="/menu">Browse Products</Link>
                </Button>
            </div>
        )
    }

    return (
        <>
            <SEO
                title={`${product.name} - FreshPrep`}
                description={product.description}
                keywords={[product.name, product.category, "healthy meal"]}
                image={product.image}
                url={`/menu/${product.slug}`}
            />
            <div className="container mx-auto px-4 py-8">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                    <Link href="/" className="hover:text-foreground">
                        Home
                    </Link>
                    <span>/</span>
                    <Link href="/menu" className="hover:text-foreground">
                        Menu
                    </Link>
                    <span>/</span>
                    <span className="text-foreground">{product.name}</span>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 mb-16">
                    <ProductImages product={product} />

                    <div className="space-y-6">
                        <ProductInfo product={product} />

                        {/* In Cart Indicator */}
                        {isInCart && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-green-500/10 border border-green-500/20 rounded-lg p-3"
                            >
                                <div className="flex items-center gap-2 text-green-600">
                                    <ShoppingBag className="h-5 w-5" />
                                    <span className="font-medium">
                                        Already in cart (Quantity: {cartItem.quantity})
                                    </span>
                                </div>
                            </motion.div>
                        )}

                        {/* Add-ons */}
                        {product.addons && product.addons.length > 0 && (
                            <div>
                                <h3 className="font-semibold mb-3">Customize Your Meal</h3>
                                <p className="text-sm text-muted-foreground mb-3">
                                    Select add-ons to enhance your meal
                                </p>
                                <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                                    {product.addons.map((addon) => {
                                        const isSelected = selectedAddons.includes(addon.id)
                                        return (
                                            <motion.div
                                                key={addon.id}
                                                className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-all ${isSelected
                                                        ? 'border-primary bg-primary/5'
                                                        : 'border-border hover:border-primary/50'
                                                    }`}
                                                onClick={() => handleAddonToggle(addon.id)}
                                            >
                                                <div className="flex items-center gap-3 flex-1">
                                                    <Checkbox
                                                        id={addon.id}
                                                        checked={isSelected}
                                                        onCheckedChange={() => handleAddonToggle(addon.id)}
                                                        className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                                                    />
                                                    <Label
                                                        htmlFor={addon.id}
                                                        className="cursor-pointer flex-1"
                                                    >
                                                        <div>
                                                            <span className="font-medium">{addon.name}</span>
                                                            {addon.description && (
                                                                <p className="text-xs text-muted-foreground mt-1">
                                                                    {addon.description}
                                                                </p>
                                                            )}
                                                        </div>
                                                    </Label>
                                                </div>
                                                <span className="font-semibold text-primary whitespace-nowrap ml-4">
                                                    +${addon.price}
                                                </span>
                                            </motion.div>
                                        )
                                    })}
                                </div>
                            </div>
                        )}

                        <Separator />

                        {/* Quantity and Price */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <span className="font-semibold">Quantity:</span>
                                <div className="flex items-center border border-border rounded-lg">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        disabled={quantity <= 1 || isAdding}
                                        className="hover:bg-transparent"
                                    >
                                        <Minus className="h-4 w-4" />
                                    </Button>
                                    <span className="w-12 text-center font-semibold">{quantity}</span>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => setQuantity(quantity + 1)}
                                        disabled={isAdding}
                                        className="hover:bg-transparent"
                                    >
                                        <Plus className="h-4 w-4" />
                                    </Button>
                                </div>

                                {/* Selected Addons Count */}
                                {selectedAddons.length > 0 && (
                                    <span className="text-sm text-muted-foreground">
                                        +{selectedAddons.length} add-on(s)
                                    </span>
                                )}
                            </div>

                            {/* Price Breakdown */}
                            <div className="bg-muted/30 rounded-lg p-4 space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span>Base Price ({product.name})</span>
                                    <span>${(product.price * quantity).toFixed(2)}</span>
                                </div>

                                {selectedAddons.map(addonId => {
                                    const addon = product.addons?.find(a => a.id === addonId)
                                    if (!addon) return null
                                    return (
                                        <div key={addonId} className="flex justify-between text-sm text-muted-foreground">
                                            <span className="pl-4">+ {addon.name} (x{quantity})</span>
                                            <span>+${(addon.price * quantity).toFixed(2)}</span>
                                        </div>
                                    )
                                })}

                                <Separator className="my-2" />

                                <div className="flex items-center justify-between text-2xl font-bold">
                                    <span>Total:</span>
                                    <span className="text-primary">${getTotalPrice()}</span>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="flex-1"
                                >
                                    <Button
                                        size="lg"
                                        className="w-full relative"
                                        onClick={isInCart ? handleUpdateCart : handleAddToCart}
                                        disabled={isAdding || showSuccess || itemLoading}
                                    >
                                        {isAdding ? (
                                            <>
                                                <LoaderCircle className="mr-2 h-5 w-5 animate-spin" />
                                                {isInCart ? 'Updating...' : 'Adding...'}
                                            </>
                                        ) : showSuccess ? (
                                            <>
                                                <Check className="mr-2 h-5 w-5" />
                                                Added!
                                            </>
                                        ) : isInCart ? (
                                            <>
                                                <ShoppingBag className="mr-2 h-5 w-5" />
                                                Update Cart
                                            </>
                                        ) : (
                                            <>
                                                <ShoppingCart className="mr-2 h-5 w-5" />
                                                Add to Cart
                                            </>
                                        )}
                                    </Button>
                                </motion.div>
                                <Button
                                    size="lg"
                                    variant="outline"
                                    disabled={isAdding}
                                >
                                    <Heart className={`h-5 w-5 ${false ? 'fill-red-500 text-red-500' : ''}`} />
                                </Button>
                            </div>

                            {/* Quick Actions */}
                            {!isInCart && (
                                <div className="flex gap-2 pt-2">
                                    {[1, 2, 3].map((qty) => (
                                        <Button
                                            key={qty}
                                            variant="outline"
                                            size="sm"
                                            className="flex-1"
                                            onClick={async () => {
                                                setQuantity(qty)
                                                if (cart?.id) {
                                                    setIsAdding(true)
                                                    try {
                                                        await dispatch(addToCart({
                                                            cart_id: cart.id,
                                                            product_id: product.id,
                                                            addon_ids: selectedAddons,
                                                            quantity: qty
                                                        })).unwrap()
                                                        toast.success(`${qty} × ${product.name} added!`)
                                                        setShowSuccess(true)
                                                        setTimeout(() => setShowSuccess(false), 2000)
                                                    } catch (error) {
                                                        toast.error(error?.message)
                                                    } finally {
                                                        setIsAdding(false)
                                                    }
                                                }
                                            }}
                                            disabled={isAdding}
                                        >
                                            {qty}
                                        </Button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Ingredients & Allergens */}
                <ProductNutrition product={product} />

                {/* Related Products - Static for now */}
                <div className="mt-16">
                    <h2 className="text-3xl font-bold mb-8">You might also like</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {relatedProducts.map((relatedProduct) => (
                            <Link key={relatedProduct.id} href={`/menu/${relatedProduct.slug}`}>
                                <Card className="overflow-hidden hover:shadow-lg transition-shadow group">
                                    <div className="aspect-square overflow-hidden">
                                        <img
                                            src={relatedProduct.image || "/placeholder.svg"}
                                            alt={relatedProduct.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                    <CardContent className="p-6">
                                        <h3 className="text-xl font-semibold mb-2">{relatedProduct.name}</h3>
                                        <div className="flex items-center justify-between">
                                            <span className="text-2xl font-bold">${relatedProduct.price.toFixed(2)}</span>
                                            <Button variant="outline" size="sm">
                                                View Details
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Product