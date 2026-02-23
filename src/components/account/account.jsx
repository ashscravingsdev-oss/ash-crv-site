'use client'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, Calendar, Settings, LogOut } from "lucide-react";
import Link from "next/link";
import ActiveSubscription from './active-subscription'
import QuickActions from './quick-actions'
import AccountInfo from './account-info'
import Layout from './layout'
import Cookies from "js-cookie";

const recentOrders = [

    {
        id: "#FP-2024-12345",
        date: "Dec 20, 2024",
        status: "Delivered",
        total: 53.95,
        items: 4,
    },
    {
        id: "#FP-2024-12340",
        date: "Dec 13, 2024",
        status: "Delivered",
        total: 49.96,
        items: 3,
    },
    {
        id: "#FP-2024-12335",
        date: "Dec 6, 2024",
        status: "Delivered",
        total: 67.94,
        items: 5,
    },
];

const activeSubscription = {
    plan: "Bi-Weekly Plan",
    nextDelivery: "Dec 27, 2024",
    status: "Active",
};

const quickStats = [
    {
        id: "total-orders",
        icon: Package,
        value: "12",
        label: "Total Orders",
        color: "bg-primary/10",
        iconColor: "text-primary"
    },
    {
        id: "next-delivery",
        icon: Calendar,
        value: "Dec 27",
        label: "Next Delivery",
        color: "bg-primary/10",
        iconColor: "text-primary"
    },
    {
        id: "subscription-status",
        icon: Settings,
        value: "Active",
        label: "Subscription",
        color: "bg-primary/10",
        iconColor: "text-primary"
    }
]
const Account = () => {
    const token = Cookies.get('accessToken')
    const user = JSON.parse(Cookies.get('user') || 'null');
    console.log(token, user);

    return (
        <Layout title="  Dashboard"
            description="Overview of your subscription, upcoming deliveries, and recent activity.">
            <div className="lg:col-span-3">
                {/* Quick Stats */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    {quickStats.map((stat) => {
                        const Icon = stat.icon
                        return (
                            <Card key={stat.id}>
                                <CardContent className="pt-6">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center`}>
                                            <Icon className={`h-6 w-6 ${stat.iconColor}`} />
                                        </div>
                                        <div>
                                            <p className="text-2xl font-bold">{stat.value}</p>
                                            <p className="text-sm text-muted-foreground">{stat.label}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Active Subscription */}
                        <ActiveSubscription activeSubscription={activeSubscription} />

                        {/* Recent Orders */}
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle>Recent Orders</CardTitle>
                                <Button variant="ghost" size="sm" asChild>
                                    <Link href="/orders">View All</Link>
                                </Button>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {recentOrders.map((order) => (
                                    <div
                                        key={order.id}
                                        className="flex items-center justify-between p-4 border border-border rounded-lg"
                                    >
                                        <div>
                                            <p className="font-semibold">{order.id}</p>
                                            <p className="text-sm text-muted-foreground">
                                                {order.date} • {order.items} items
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-semibold">${order.total}</p>
                                            <Badge variant="secondary" className="mt-1">
                                                {order.status}
                                            </Badge>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <QuickActions />
                        <AccountInfo />
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Account
