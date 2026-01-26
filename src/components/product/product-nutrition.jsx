import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
const ProductNutrition = ({ product }) => {
    return (
        <div className="grid md:grid-cols-2 gap-6 mb-16">
            <Card className='hover:scale-105 transition-transform duration-300'>
                <CardHeader>
                    <CardTitle>Ingredients</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">
                        {product.ingredients_text || "No ingredients info available."}
                    </p>
                </CardContent>
            </Card>

            <Card className='hover:scale-105 transition-transform duration-300'>
                <CardHeader>
                    <CardTitle>Allergen Information</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">
                        {product.allergens_text || "No allergens info available."}
                    </p>
                </CardContent>
            </Card>

        </div>
    )
}

export default ProductNutrition
