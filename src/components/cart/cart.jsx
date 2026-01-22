"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

const initialCartItems = [
    {
        id: "1",
        name: "Mediterranean Bowl",
        description: "Grilled chicken, quinoa, roasted vegetables",
        price: 12.99,
        quantity: 2,
        image: "/mediterranean-bowl-with-chicken-quinoa-vegetables.jpg",
    },
    {
        id: "2",
        name: "Green Detox Juice",
        description: "Kale, cucumber, green apple, lemon",
        price: 8.99,
        quantity: 1,
        image: "/green-detox-juice-cold-pressed.jpg",
    },
    {
        id: "3",
        name: "Power Protein Pack",
        description: "Grilled salmon, sweet potato, broccoli",
        price: 14.99,
        quantity: 1,
        image: "/protein-meal-prep-salmon-sweet-potato.jpg",
    },
]

const Cart = () => {
    const [cartItems, setCartItems] = useState(initialCartItems)
    const [promoCode, setPromoCode] = useState("")
    const [promoApplied, setPromoApplied] = useState(false)

    const updateQuantity = (id, newQuantity) => {
        if (newQuantity < 1) return
        setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
    }

    const removeItem = (id) => {
        setCartItems(cartItems.filter((item) => item.id !== id))
    }

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const deliveryFee = subtotal > 50 ? 0 : 5.99
    const discount = promoApplied ? subtotal * 0.1 : 0
    const tax = (subtotal - discount) * 0.08
    const total = subtotal + deliveryFee - discount + tax

    const applyPromo = () => {
        if (promoCode.toLowerCase() === "welcome10") {
            setPromoApplied(true)
        }
    }

    if (cartItems.length === 0) {
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
                    {cartItems.map((item) => (
                        <Card key={item.id}>
                            <CardContent className="p-6">
                                <div className="flex gap-4">
                                    <div className="w-24 h-24 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                                        <img
                                            src={item.image || "/placeholder.svg"}
                                            alt={item.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between gap-4 mb-2">
                                            <div>
                                                <h3 className="font-semibold text-lg">{item.name}</h3>
                                                <p className="text-sm text-muted-foreground">{item.description}</p>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => removeItem(item.id)}
                                                className="flex-shrink-0"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                        <div className="flex items-center justify-between mt-4">
                                            <div className="flex items-center border border-border rounded-lg">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    disabled={item.quantity <= 1}
                                                >
                                                    <Minus className="h-4 w-4" />
                                                </Button>
                                                <span className="w-12 text-center font-semibold">{item.quantity}</span>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                >
                                                    <Plus className="h-4 w-4" />
                                                </Button>
                                            </div>
                                            <span className="text-xl font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}

                    {/* Upsell Suggestions */}
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

                            {/* Promo Code */}
                            <div>
                                <label className="text-sm font-medium mb-2 block">Promo Code</label>
                                <div className="flex gap-2">
                                    <Input
                                        placeholder="Enter code"
                                        value={promoCode}
                                        onChange={(e) => setPromoCode(e.target.value)}
                                        disabled={promoApplied}
                                    />
                                    <Button onClick={applyPromo} disabled={promoApplied}>
                                        {promoApplied ? "Applied" : "Apply"}
                                    </Button>
                                </div>
                                {promoApplied && <p className="text-sm text-primary mt-2">10% discount applied!</p>}
                            </div>

                            <Separator />

                            {/* Price Breakdown */}
                            <div className="space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Subtotal</span>
                                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Delivery Fee</span>
                                    <span className="font-medium">{deliveryFee === 0 ? "FREE" : `$${deliveryFee.toFixed(2)}`}</span>
                                </div>
                                {promoApplied && (
                                    <div className="flex justify-between text-sm text-primary">
                                        <span>Discount (10%)</span>
                                        <span>-${discount.toFixed(2)}</span>
                                    </div>
                                )}
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Tax</span>
                                    <span className="font-medium">${tax.toFixed(2)}</span>
                                </div>
                            </div>

                            <Separator />

                            <div className="flex justify-between text-lg font-bold">
                                <span>Total</span>
                                <span>${total.toFixed(2)}</span>
                            </div>

                            {deliveryFee > 0 && (
                                <p className="text-xs text-muted-foreground">
                                    Add ${(50 - subtotal).toFixed(2)} more for free delivery!
                                </p>
                            )}

                            <Button size="lg" className="w-full" asChild>
                                <Link href="/checkout">Proceed to Checkout</Link>
                            </Button>

                            <Button size="lg" variant="outline" className="w-full bg-transparent" asChild>
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
