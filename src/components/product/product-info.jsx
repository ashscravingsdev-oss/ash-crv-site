
import React from 'react'
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Star, Leaf, Flame, Drumstick } from "lucide-react"
const ProductInfo = ({ product }) => {
    return (
        <>
            <div>
                <Badge variant="secondary" className="mb-3">
                    {product.category}
                </Badge>
                <h1 className="text-4xl font-bold mb-4 text-balance">{product.name}</h1>
                <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i}className="h-5 w-5 fill-amber-500 text-amber-500" />
                        ))}
                    </div>
                    <span className="text-md text-muted-foreground">(128 reviews)</span>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">{product.description}</p>
            </div>

            <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                    <Flame className="h-4 w-4 text-primary" />
                    <span>{product.calories} cal</span>
                </div>
                <div className="flex items-center gap-2">
                    <Drumstick className="h-4 w-4 text-primary" />
                    <span>{product.protein}g protein</span>
                </div>
                <div className="flex items-center gap-2">
                    <Leaf className="h-4 w-4 text-primary" />
                    <span>Organic</span>
                </div>
            </div>

            <Separator />

            <div>
                <h3 className="font-semibold mb-3">Nutritional Information</h3>
                <div className="grid grid-cols-4 gap-4">
                    <div className="text-center p-3 bg-muted rounded-lg">
                        <p className="text-2xl font-bold">{product.calories}</p>
                        <p className="text-sm text-muted-foreground">Calories</p>
                    </div>
                    <div className="text-center p-3 bg-muted rounded-lg">
                        <p className="text-2xl font-bold">{product.protein}g</p>
                        <p className="text-sm text-muted-foreground">Protein</p>
                    </div>
                    <div className="text-center p-3 bg-muted rounded-lg">
                        <p className="text-2xl font-bold">{product.carbs}g</p>
                        <p className="text-sm text-muted-foreground">Carbs</p>
                    </div>
                    <div className="text-center p-3 bg-muted rounded-lg">
                        <p className="text-2xl font-bold">{product.fat}g</p>
                        <p className="text-sm text-muted-foreground">Fat</p>
                    </div>
                </div>
            </div>

            <Separator /></>
    )
}

export default ProductInfo
