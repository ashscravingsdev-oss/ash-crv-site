import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
const ProductNutrition = ({product}) => {
    return (
        <div className="grid md:grid-cols-2 gap-6 mb-16">
            <Card className='hover:scale-105 transition-transform duration-300'>
                <CardHeader>
                    <CardTitle>Ingredients</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="grid grid-cols-2 gap-2">
                        {product.ingredients.map((ingredient, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-sm">
                                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                                {ingredient}
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>

            <Card className='hover:scale-105 transition-transform duration-300'>
                <CardHeader>
                    <CardTitle>Allergen Information</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground mb-2">Contains:</p>
                    <div className="flex flex-wrap gap-2">
                        {product.allergens.map((allergen) => (
                            <Badge key={allergen} variant="outline">
                                {allergen}
                            </Badge>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default ProductNutrition
