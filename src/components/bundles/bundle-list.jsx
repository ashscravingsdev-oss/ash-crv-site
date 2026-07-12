"use client"

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, ShoppingCart, Loader2, Plus, Minus, ShoppingBag } from "lucide-react"
import Link from "next/link"
import { useDispatch, useSelector } from "react-redux"
import { addToCart, } from "@/store/cartSlice"

const BundleList = ({ bundle }) => {
    const dispatch = useDispatch()
    const [isAdding, setIsAdding] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)
    const [quantity, setQuantity] = useState(1)

    // Get cart from Redux
    const { cart, itemLoading } = useSelector(state => state.cart)

    // Find if bundle is in cart
    const cartItem = cart?.items?.find(item =>
        item.bundle_id === bundle.id && item.bundle_id !== null
    )
    const isInCart = !!cartItem

    const handleAddToCart = async (e) => {
        e.preventDefault()
        e.stopPropagation()

        if (!cart?.id) {
            toast.error("Cart not initialized")
            return
        }

        if (quantity < 1) return

        setIsAdding(true)

        try {
            await dispatch(addToCart({
                cart_id: cart.id,
                bundle_id: bundle.id,
                quantity: quantity
            })).unwrap()

            setShowSuccess(true)
            // toast.success(`${quantity} × ${bundle.name} added to cart!`, {
            //     icon: '📦',
            //     duration: 2000
            // })

            setTimeout(() => {
                setShowSuccess(false)
                setQuantity(1)
            }, 2000)

        } catch (error) {
            console.error("Failed to add bundle to cart:", error)
            toast.error(error?.message || "Failed to add bundle to cart")
        } finally {
            setIsAdding(false)
        }
    }

    return (
        <Card key={bundle.id} className="overflow-hidden hover:shadow-lg transition-shadow h-full ">
            <div className="aspect-video overflow-hidden relative">
                <img
                    src={bundle.image || "/wellness-bundle.jpg"}
                    alt={bundle.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                {/* <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">
                    Save ${bundle.savings}
                </Badge> */}
            </div>
            <CardHeader>
                <div className='flex justify-between items-center'>
                    <CardTitle className="text-2xl">{bundle.name}</CardTitle>
                    {isInCart && (
                        <Badge variant="outline" className="text-xs border-green-500 text-green-500 mt-2">
                            In Cart ({cartItem.quantity})
                        </Badge>
                    )}
                </div>
                <p className="text-muted-foreground">{bundle.description}</p>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Price */}
                <div className="flex items-end gap-3">
                    <span className="text-4xl font-bold">${bundle.price}</span>
                    {/* <span className="text-lg text-muted-foreground line-through mb-1">${bundle.originalPrice}</span> */}
                </div>

                {/* Items Included */}
                <div>
                    <h4 className="font-semibold mb-3">What's Included:</h4>
                    <ul className="space-y-2">
                        {bundle.products.map((item, idx) => (

                            <li key={idx} className="flex items-start gap-2 text-sm tracking-wide uppercase">
                                <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                <span>
                                    {item.BundleItem.quantity || 1}x {item.name}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Features */}
                {/* <div>
                    <h4 className="font-semibold mb-3">Bundle Benefits:</h4>
                    <div className="flex flex-wrap gap-2">
                        {bundle.features.map((feature) => (
                            <Badge key={feature} variant="secondary">
                                {feature}
                            </Badge>
                        ))}
                    </div>
                </div> */}

                {/* Actions */}
                <div className="flex gap-3 pt-4">
                    <Button
                        onClick={handleAddToCart}
                        disabled={isAdding || showSuccess || itemLoading}
                        className={`
                        w-full relative
                         ${showSuccess ? 'bg-green-600 hover:bg-green-700' : ''}
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
                </div>
            </CardContent>
        </Card>
    )
}

export default BundleList
