"use client"

import React, { use, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Minus, Plus, ShoppingCart, Heart, } from "lucide-react"
import Link from "next/link"
import ProductImages from './product-images'
import ProductNutrition from './product-nutrition'
import ProductInfo from './product-info'
import SEO from '../seo'
// Mock product data - in a real app, this would come from an API
const getProduct = (id) => {
    const products = {
        "1": {
            id: "1",
            name: "Mediterranean Bowl",
            category: "Meal Prep",
            description:
                "A delicious and nutritious bowl featuring grilled chicken, fluffy quinoa, roasted vegetables, and creamy hummus. Perfect for a balanced, protein-rich meal.",
            price: 12.99,
            image: "/mediterranean-bowl-with-chicken-quinoa-vegetables.jpg",
            images: [
                "/mediterranean-bowl-with-chicken-quinoa-vegetables.jpg",
                "/mediterranean-bowl-with-chicken-quinoa-vegetables.jpg",
            ],
            calories: 450,
            protein: 35,
            carbs: 42,
            fat: 15,
            ingredients: [
                "Grilled chicken breast",
                "Organic quinoa",
                "Roasted bell peppers",
                "Cherry tomatoes",
                "Red onions",
                "Cucumber",
                "House-made hummus",
                "Olive oil",
                "Lemon juice",
                "Fresh herbs",
            ],
            allergens: ["Sesame"],
            addons: [
                { id: "extra-protein", name: "Extra Protein (Chicken)", price: 3.99 },
                { id: "avocado", name: "Fresh Avocado", price: 2.49 },
                { id: "feta", name: "Feta Cheese", price: 1.99 },
            ],
        },
    }
    return products[id] || products["1"]
}

const relatedProducts = [
    {
        id: "3",
        name: "Power Protein Pack",
        price: 14.99,
        image: "/protein-meal-prep-salmon-sweet-potato.jpg",
    },
    {
        id: "5",
        name: "Asian Fusion Bowl",
        price: 13.99,
        image: "/asian-teriyaki-bowl.jpg",
    },
    {
        id: "6",
        name: "Breakfast Power Bowl",
        price: 11.99,
        image: "/breakfast-power-bowl.jpg",
    },
]
const Product = ({ params }) => {
    const resolvedParams = use(params)
    const product = getProduct(resolvedParams.id)
    const [quantity, setQuantity] = useState(1)
    const [selectedAddons, setSelectedAddons] = useState([])

    const handleAddonToggle = (addonId) => {
        setSelectedAddons((prev) => (prev.includes(addonId) ? prev.filter((id) => id !== addonId) : [...prev, addonId]))
    }

    const getTotalPrice = () => {
        let total = product.price * quantity
        selectedAddons.forEach((addonId) => {
            const addon = product.addons.find((a) => a.id === addonId)
            if (addon) total += addon.price * quantity
        })
        return total.toFixed(2)
    }
    return (
        <>
            <SEO
                title={`${product.name} - FreshPrep`}
                description={product.description}
                keywords={[product.name, product.category, "healthy meal"]}
                image={product.image}
                url={`/menu/${product.id}`}
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

                        {/* Add-ons */}
                        {product.addons && product.addons.length > 0 && (
                            <div>
                                <h3 className="font-semibold mb-3">Add Extra</h3>
                                <div className="space-y-3">
                                    {product.addons.map((addon) => (
                                        <div
                                            key={addon.id}
                                            className="flex items-center justify-between p-3 border border-border rounded-lg"
                                        >
                                            <div className="flex items-center gap-3">
                                                <Checkbox
                                                    id={addon.id}
                                                    checked={selectedAddons.includes(addon.id)}
                                                    onCheckedChange={() => handleAddonToggle(addon.id)}
                                                />
                                                <Label htmlFor={addon.id} className="cursor-pointer">
                                                    {addon.name}
                                                </Label>
                                            </div>
                                            <span className="font-semibold">+${addon.price.toFixed(2)}</span>
                                        </div>
                                    ))}
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
                                        disabled={quantity <= 1}
                                    >
                                        <Minus className="h-4 w-4" />
                                    </Button>
                                    <span className="w-12 text-center font-semibold">{quantity}</span>
                                    <Button variant="ghost" size="icon" onClick={() => setQuantity(quantity + 1)}>
                                        <Plus className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>

                            <div className="flex items-center justify-between text-3xl font-bold">
                                <span>Total:</span>
                                <span>${getTotalPrice()}</span>
                            </div>

                            <div className="flex gap-3">
                                <Button size="lg" className="flex-1" asChild>
                                    <Link href="/cart">
                                        <ShoppingCart className="h-5 w-5 mr-2" />
                                        Add to Cart
                                    </Link>
                                </Button>
                                <Button size="lg" variant="outline">
                                    <Heart className="h-5 w-5" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Ingredients & Allergens */}
                <ProductNutrition product={product} />

                {/* Related Products */}
                <div>
                    <h2 className="text-3xl font-bold mb-8">You might also like</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {relatedProducts.map((relatedProduct) => (
                            <Link key={relatedProduct.id} href={`/menu/${relatedProduct.id}`}>
                                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                                    <div className="aspect-square overflow-hidden">
                                        <img
                                            src={relatedProduct.image || "/placeholder.svg"}
                                            alt={relatedProduct.name}
                                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                    <CardContent className="p-6">
                                        <h3 className="text-xl font-semibold mb-2">{relatedProduct.name}</h3>
                                        <div className="flex items-center justify-between">
                                            <span className="text-2xl font-bold">${relatedProduct.price.toFixed(2)}</span>
                                            <Button>View</Button>
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
