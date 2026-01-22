import React from 'react'
import { Card, CardContent, } from "@/components/ui/card"
const SubscriptionsBenefits = ({ benefit }) => {
    return (
        <Card key={benefit.title} className="text-center hover:scale-105 transition-transform duration-300">
            <CardContent className="pt-8">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
            </CardContent>
        </Card>
    )
}

export default SubscriptionsBenefits
