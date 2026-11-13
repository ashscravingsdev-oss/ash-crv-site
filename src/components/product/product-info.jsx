
import React from 'react'
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Flame, Drumstick } from "lucide-react"

const ProductInfo = ({ product }) => {
    const n = product.nutrition_info || {}
    // Only show nutrition when Ash has filled it in (many items are still all zeros)
    const hasNutrition = Number(n.calories) > 0

    return (
        <>
            <div>
                {product.category?.name && (
                    <Badge variant="secondary" className="mb-3">
                        {product.category.name}
                    </Badge>
                )}
                <h1 className="text-4xl font-bold mb-4 text-balance">{product.name}</h1>
                <p className="text-lg text-muted-foreground leading-relaxed">{product.description}</p>
            </div>

            {hasNutrition && (
                <>
                    <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-2">
                            <Flame className="h-4 w-4 text-primary" />
                            <span>{n.calories} cal</span>
                        </div>
                        {Number(n.protein) > 0 && (
                            <div className="flex items-center gap-2">
                                <Drumstick className="h-4 w-4 text-primary" />
                                <span>{n.protein}g protein</span>
                            </div>
                        )}
                    </div>

                    <Separator />

                    <div>
                        <h3 className="font-semibold mb-3">Nutritional Information</h3>
                        <div className="grid grid-cols-4 gap-4">
                            <div className="text-center p-3 bg-muted rounded-lg">
                                <p className="text-2xl font-bold">{n.calories}</p>
                                <p className="text-sm text-muted-foreground">Calories</p>
                            </div>
                            <div className="text-center p-3 bg-muted rounded-lg">
                                <p className="text-2xl font-bold">{n.protein ?? 0}g</p>
                                <p className="text-sm text-muted-foreground">Protein</p>
                            </div>
                            <div className="text-center p-3 bg-muted rounded-lg">
                                <p className="text-2xl font-bold">{n.carbs ?? 0}g</p>
                                <p className="text-sm text-muted-foreground">Carbs</p>
                            </div>
                            <div className="text-center p-3 bg-muted rounded-lg">
                                <p className="text-2xl font-bold">{n.fat ?? 0}g</p>
                                <p className="text-sm text-muted-foreground">Fat</p>
                            </div>
                        </div>
                    </div>
                </>
            )}

            <Separator />
        </>
    )
}

export default ProductInfo
