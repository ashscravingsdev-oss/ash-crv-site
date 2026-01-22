import React from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Sparkles } from "lucide-react"
import Link from "next/link"
const SubscriptionsPlans = ({ plan }) => {
    return (
        <Card
            key={plan.id}
            className={`relative hover:scale-105 transition-transform duration-300 ${plan.popular ? "shadow-lg scale-105" : ""}`}
        >
            {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground px-4 py-1">
                        <Sparkles className="h-3 w-3 mr-1 inline" />
                        Most Popular
                    </Badge>
                </div>
            )}
            <CardHeader className="text-center pb-8 ">
                <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
                <div className="mt-6">
                    <div className="flex items-end justify-center gap-2">
                        <span className="text-5xl font-bold">${plan.price}</span>
                        <span className="text-muted-foreground mb-2">/{plan.interval}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">${plan.pricePerMeal} per meal</p>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                            <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{feature}</span>
                        </li>
                    ))}
                </ul>
                <Button className="w-full" variant={plan.popular ? "default" : "outline"} size="lg" asChild>
                    <Link href="/checkout">Select Plan</Link>
                </Button>
            </CardContent>
        </Card>
    )
}

export default SubscriptionsPlans
