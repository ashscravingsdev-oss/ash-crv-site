"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Minus, Plus, Trash2, ShoppingBag, Loader2, Tag, XCircle } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
    fetchCart,
    updateCartItem,
    removeFromCart,
    calculateCartTotals
} from "@/store/cartSlice"
import { motion, AnimatePresence } from "framer-motion"
import Cookies from "js-cookie";
import { toast } from "sonner"

const Cart = () => {
    const dispatch = useDispatch()
    const [promoCode, setPromoCode] = useState("")
    const [updatingId, setUpdatingId] = useState(null)
    const [isApplyingPromo, setIsApplyingPromo] = useState(false)

    // Get cart state from Redux
    const {
        cart,
        items,
        loading,
        itemLoading,
        subtotal,
        taxTotal,
        coupon,
        couponDiscount,
    } = useSelector(state => state.cart)

    const sessionId = Cookies.get('session_id')

    // Fetch cart on mount
    useEffect(() => {
        const token = localStorage.getItem('token')
        const params = token ? {} : { session_id: sessionId }
        dispatch(fetchCart(params))
    }, [dispatch, sessionId])

    // Calculate totals when cart changes
    useEffect(() => {
        if (cart?.id) {
            dispatch(calculateCartTotals(cart.id))
        }
    }, [cart, dispatch])


    const updateQuantity = async (itemId, newQuantity) => {
        if (newQuantity < 1) return

        setUpdatingId(itemId)

        try {
            await dispatch(updateCartItem({
                id: itemId,
                updateData: { quantity: newQuantity }
            })).unwrap()

            if (cart?.id) {
                dispatch(calculateCartTotals(cart.id))
            }
        } catch (error) {
            toast.error(error?.message || "Failed to update quantity")
        } finally {
            setUpdatingId(null)
        }
    }

    const removeItem = async (itemId) => {
        setUpdatingId(itemId)

        try {
            await dispatch(removeFromCart(itemId)).unwrap()
            toast.success("Item removed from cart")

            if (cart?.id) {
                dispatch(calculateCartTotals(cart.id))
            }
        } catch (error) {
            toast.error(error?.message || "Failed to remove item")
        } finally {
            setUpdatingId(null)
        }
    }

    const validateCoupon = async () => {
        if (!promoCode.trim()) {
            toast.error("Please enter a coupon code")
            return
        }

        setIsApplyingPromo(true)

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/coupons/validate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    code: promoCode.trim(),
                    user_id: sessionId || null,
                    cart_id: cart?.id || null,
                    order_amount: subtotal
                })
            })

            const data = await response.json()

            if (data.valid) {
                toast.success(`Coupon applied! ${data.message}`)
                setPromoCode("")
                // Refresh totals from backend (which now includes the coupon)
                if (cart?.id) {
                    dispatch(calculateCartTotals(cart.id))
                }
            } else {
                toast.error(data.message || "Invalid coupon code")
            }
        } catch (error) {
            console.error("Error validating coupon:", error)
            toast.error("Failed to validate coupon")
        } finally {
            setIsApplyingPromo(false)
        }
    }


    const removeCoupon = () => {
        setAppliedCoupon(null)
        setCouponDiscount(0)
        setCouponError("")
        toast.success("Coupon removed")
    }

    const total = subtotal + taxTotal - couponDiscount

    const getDiscountSummary = () => {
        if (!coupon) return null
        switch (coupon.type) {
            case 'percentage':
                return `${coupon.value}% off`
            case 'fixed':
                return `$${coupon.value} off`
            default:
                return 'Discount applied'
        }
    }

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-16">
                <Card className="max-w-md mx-auto text-center p-12">
                    <Loader2 className="h-16 w-16 text-muted-foreground mx-auto mb-4 animate-spin" />
                    <h2 className="text-2xl font-bold mb-2">Loading your cart...</h2>
                    <p className="text-muted-foreground">Please wait while we fetch your items</p>
                </Card>
            </div>
        )
    }

    if (!items || items.length === 0) {
        return (
            <div className="container mx-auto px-4 py-16">
                <Card className="max-w-md mx-auto text-center p-12">
                    <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
                    <p className="text-muted-foreground mb-6">Add some delicious meals to get started!</p>
                    <Button asChild>
                        <Link href="/menu">Browse Menu</Link>
                    </Button>
                </Card>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 pt-8">
            <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-4">
                    <AnimatePresence>
                        {items.map((item) => {
                            const isUpdating = updatingId === item.id
                            const itemTotal = (item.product?.price || item.bundle?.price || 0) * item.quantity

                            return (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, x: -100 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Card>
                                        <CardContent className="p-6">
                                            <div className="flex gap-4">
                                                <div className="w-24 h-24 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                                                    <img
                                                        src={item.product?.image_url || item.bundle?.image || "/placeholder.svg"}
                                                        alt={item.product?.name || item.bundle?.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex justify-between gap-4 mb-2">
                                                        <div>
                                                            <h3 className="font-semibold text-lg">
                                                                {item.product?.name || item.bundle?.name}
                                                            </h3>
                                                            <p className="text-sm text-muted-foreground">
                                                                {item.product?.description || item.bundle?.description}
                                                            </p>
                                                            {item.addon_ids && item.addon_ids.length > 0 && (
                                                                <p className="text-xs text-primary mt-1">
                                                                    + Add-ons: {item.addon_ids.length} selected
                                                                </p>
                                                            )}
                                                        </div>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() => removeItem(item.id)}
                                                            disabled={isUpdating}
                                                            className="flex-shrink-0"
                                                        >
                                                            {isUpdating ? (
                                                                <Loader2 className="h-4 w-4 animate-spin" />
                                                            ) : (
                                                                <Trash2 className="h-4 w-4" />
                                                            )}
                                                        </Button>
                                                    </div>
                                                    <div className="flex items-center justify-between mt-4">
                                                        <div className="flex items-center border border-border rounded-lg">
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                                disabled={item.quantity <= 1 || isUpdating}
                                                            >
                                                                <Minus className="h-4 w-4" />
                                                            </Button>
                                                            <span className="w-12 text-center font-semibold">
                                                                {item.quantity}
                                                            </span>
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                                disabled={isUpdating}
                                                            >
                                                                <Plus className="h-4 w-4" />
                                                            </Button>
                                                        </div>
                                                        <span className="text-xl font-bold">
                                                            ${itemTotal.toFixed(2)}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            )
                        })}
                    </AnimatePresence>

                    {/* Upsell Suggestions - Static for now */}
                    <Card className="bg-muted border-none">
                        <CardContent className="p-6">
                            <h3 className="font-semibold mb-4">You might also like</h3>
                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { name: "Berry Smoothie", price: 7.99, image: "/berry-smoothie-bowl.jpg" },
                                    { name: "Asian Fusion Bowl", price: 13.99, image: "/asian-teriyaki-bowl.jpg" },
                                ].map((product) => (
                                    <div key={product.name} className="flex gap-3 items-center">
                                        <div className="w-16 h-16 rounded-lg overflow-hidden bg-background">
                                            <img
                                                src={product.image || "/placeholder.svg"}
                                                alt={product.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium text-sm">{product.name}</p>
                                            <p className="text-sm text-muted-foreground">${product.price}</p>
                                        </div>
                                        <Button size="sm" variant="outline">
                                            Add
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                    <Card className="sticky top-20">
                        <CardContent className="p-6 space-y-4">
                            <h3 className="text-xl font-bold">Order Summary</h3>

                            <Separator />

                            <div>
                                <label className="text-sm font-medium mb-2 block">Promo Code</label>

                                {coupon ? (   // ← use Redux coupon
                                    <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <Tag className="h-4 w-4 text-green-600" />
                                                <div>
                                                    <p className="font-medium text-green-600">{coupon.code}</p>
                                                    <p className="text-xs text-green-600/70">
                                                        {getDiscountSummary()}
                                                    </p>
                                                </div>
                                            </div>
                                            {/* <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={removeCoupon}
                                                className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-500/20"
                                            >
                                                <XCircle className="h-4 w-4" />
                                            </Button> */}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-2">
                                        <div className="flex gap-2">
                                            <Input
                                                placeholder="Enter code"
                                                value={promoCode}
                                                onChange={(e) => setPromoCode(e.target.value)}
                                            />
                                            <Button
                                                onClick={validateCoupon}
                                                disabled={isApplyingPromo || !promoCode.trim()}
                                            >
                                                {isApplyingPromo ? (
                                                    <Loader2 className="h-4 w-4 animate-spin" />
                                                ) : (
                                                    "Apply"
                                                )}
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Price Breakdown – already using couponDiscount from Redux */}
                            <div className="space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Subtotal</span>
                                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                                </div>
                                {coupon && (   // ← show when coupon exists
                                    <div className="flex justify-between text-sm text-green-600">
                                        <span>Discount ({coupon.type === 'percentage' ? `${coupon.value}%` : `$${coupon.value}`})</span>
                                        <span>-${couponDiscount.toFixed(2)}</span>
                                    </div>
                                )}
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Tax</span>
                                    <span className="font-medium">${taxTotal.toFixed(2)}</span>
                                </div>
                            </div>

                            <Separator />

                            <div className="flex justify-between text-lg font-bold">
                                <span>Total</span>
                                <span>${total.toFixed(2)}</span>
                            </div>

                            <Button
                                size="lg"
                                className="w-full"
                                asChild
                                disabled={itemLoading}
                            >
                                <Link href="/checkout">Proceed to Checkout</Link>
                            </Button>

                            <Button
                                size="lg"
                                variant="outline"
                                className="w-full bg-transparent"
                                asChild
                            >
                                <Link href="/menu">Continue Shopping</Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default Cart