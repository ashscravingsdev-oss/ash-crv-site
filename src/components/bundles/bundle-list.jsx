import React from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check } from "lucide-react"
import Link from "next/link"

const BundleList = ({ bundle }) => {
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
                <CardTitle className="text-2xl">{bundle.name}</CardTitle>
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
                    <Button className="flex-1" asChild>
                        <Link href="/cart">Add to Cart</Link>
                    </Button>
                    <Button variant="outline" asChild>
                        <Link href="#" >Details</Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default BundleList
