"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Layout from "./layout"

const orders = [
    {
        id: "#FP-2024-12345",
        date: "Dec 20, 2024",
        status: "Delivered",
        total: 53.95,
        items: [
            { name: "Mediterranean Bowl", quantity: 2 },
            { name: "Green Detox Juice", quantity: 1 },
            { name: "Power Protein Pack", quantity: 1 },
        ],
    },
    {
        id: "#FP-2024-12340",
        date: "Dec 13, 2024",
        status: "Delivered",
        total: 49.96,
        items: [
            { name: "Asian Fusion Bowl", quantity: 2 },
            { name: "Berry Smoothie", quantity: 2 },
        ],
    },
    {
        id: "#FP-2024-12335",
        date: "Dec 6, 2024",
        status: "Delivered",
        total: 67.94,
        items: [
            { name: "Power Protein Pack", quantity: 3 },
            { name: "Green Detox Juice", quantity: 2 },
        ],
    },
]
const Orders = () => {
    return (
        <Layout title="  Orders"
            description="View your order history, order details, and delivery status.">
            <div className="lg:col-span-3 space-y-6">
                {orders.map((order) => (
                    <Card key={order.id}>
                        <CardContent className="p-6">
                            <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="text-xl font-semibold">{order.id}</h3>
                                        <Badge variant={order.status === "Delivered" ? "secondary" : "default"}>{order.status}</Badge>
                                    </div>
                                    <p className="text-sm text-muted-foreground">{order.date}</p>
                                </div>
                                <div className="text-left md:text-right">
                                    <p className="text-2xl font-bold">${order.total}</p>
                                    <p className="text-sm text-muted-foreground">{order.items.length} items</p>
                                </div>
                            </div>

                            <div className="space-y-2 mb-6">
                                {order.items.map((item, idx) => (
                                    <div key={idx} className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">
                                            {item.quantity}x {item.name}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="flex gap-3">
                                <Button variant="outline" asChild>
                                    <Link href={`#`}>View Details</Link>
                                </Button>
                                <Button variant="outline">Reorder</Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </Layout>
    )
}

export default Orders
