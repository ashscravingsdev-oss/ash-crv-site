"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, Calendar, Settings, Loader2 } from "lucide-react";
import Link from "next/link";
import Cookies from "js-cookie";
import Layout from "./layout";
import ActiveSubscription from "./active-subscription";
import QuickActions from "./quick-actions";
import AccountInfo from "./account-info";
import {
    fetchDashboardStats,
    fetchUserOrders,
    fetchUserSubscriptions,
    pauseUserSubscription,
    skipUserSubscription,
    resumeUserSubscription,
    unskipUserSubscription,
} from "@/store/dashboardSlice";
import { toast } from "sonner"


const Account = () => {
    const dispatch = useDispatch();
    const {
        stats,
        orders,
        subscriptions,
        loading: { stats: statsLoading, orders: ordersLoading, subscriptions: subsLoading },
        error,
    } = useSelector((state) => state.dashboard);

    const userCookie = Cookies.get("user");
    const currentUser = userCookie ? JSON.parse(userCookie) : null;

    useEffect(() => {
        dispatch(fetchDashboardStats());
        dispatch(fetchUserOrders({ limit: 3 }));
        dispatch(fetchUserSubscriptions());
    }, [dispatch]);

    // Quick stats
    const quickStats = [
        {
            id: "total-orders",
            icon: Package,
            value: stats?.totalOrders ?? 0,
            label: "Total Orders",
            color: "bg-primary/10",
            iconColor: "text-primary",
        },
        {
            id: "next-delivery",
            icon: Calendar,
            value: stats?.nextDelivery
                ? new Date(stats.nextDelivery).toLocaleDateString("en-US", { month: "short", day: "numeric" })
                : "—",
            label: "Next Delivery",
            color: "bg-primary/10",
            iconColor: "text-primary",
        },
        {
            id: "subscription-status",
            icon: Settings,
            value: stats?.activeSubscription ? "Active" : "Inactive",
            label: "Subscription",
            color: "bg-primary/10",
            iconColor: "text-primary",
        },
    ];

    const handlePause = async (subId) => {
        try {
            await dispatch(pauseUserSubscription(subId)).unwrap();
            dispatch(fetchUserSubscriptions());
            dispatch(fetchDashboardStats());
            toast.success("Subscription paused");
        } catch (err) {
            toast.error(err?.message || "Failed to pause subscription");
        }
    };

    const handleResume = async (subId) => {
        try {
            await dispatch(resumeUserSubscription(subId)).unwrap();
            dispatch(fetchUserSubscriptions());
            dispatch(fetchDashboardStats());
            toast.success("Subscription resumed");
        } catch (err) {
            toast.error(err?.message || "Failed to resume subscription");
        }
    };

    const handleSkip = async (subId) => {
        try {
            await dispatch(skipUserSubscription(subId)).unwrap();
            dispatch(fetchUserSubscriptions());
            dispatch(fetchDashboardStats());
            toast.success("Next delivery skipped");
        } catch (err) {
            toast.error(err?.message || "Failed to skip delivery");
        }
    };

    const handleUnskip = async (subId) => {
        try {
            await dispatch(unskipUserSubscription(subId)).unwrap();
            dispatch(fetchUserSubscriptions());
            dispatch(fetchDashboardStats());
            toast.success("Skipped delivery restored");
        } catch (err) {
            toast.error(err?.message || "Failed to undo skip");
        }
    };
    return (
        <Layout
            title="Dashboard"
            description="Overview of your subscription, upcoming deliveries, and recent activity."
        >
            <div className="lg:col-span-3">
                {/* Quick Stats */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    {quickStats.map((stat) => {
                        const Icon = stat.icon;
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
                        );
                    })}
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* All Subscriptions */}
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle>Your Subscriptions</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {subsLoading ? (
                                    <div className="flex justify-center py-6">
                                        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                                    </div>
                                ) : subscriptions && subscriptions.length > 0 ? (
                                    subscriptions.map((sub) => (
                                        <ActiveSubscription
                                            key={sub.id}
                                            subscription={sub}
                                            onPause={handlePause}
                                            onResume={handleResume}
                                            onSkip={handleSkip}
                                            onUnskip={handleUnskip}
                                        />
                                    ))
                                ) : (
                                    <div className="text-center py-4 text-muted-foreground">
                                        No subscriptions yet.
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Recent Orders */}
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle>Recent Orders</CardTitle>
                                <Button variant="ghost" size="sm" asChild>
                                    <Link href="/account/orders">View All</Link>
                                </Button>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {ordersLoading ? (
                                    <div className="text-center py-4 text-muted-foreground">Loading recent orders...</div>
                                ) : orders && orders.length > 0 ? (
                                    orders.slice(0, 3).map((order) => (
                                        <div
                                            key={order.id}
                                            className="flex items-center justify-between p-4 border border-border rounded-lg"
                                        >
                                            <div>
                                                <p className="font-semibold">#{order.order_number}</p>
                                                <p className="text-sm text-muted-foreground">
                                                    {new Date(order.createdAt).toLocaleDateString("en-US", {
                                                        month: "short",
                                                        day: "numeric",
                                                    })}{" "}
                                                    • {order.items?.length || 0} items
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-semibold">
                                                    ${Number(order.total_amount).toFixed(2)}
                                                </p>
                                                <Badge variant="secondary" className="mt-1">
                                                    {order.status}
                                                </Badge>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-4 text-muted-foreground">No orders yet.</div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <QuickActions />
                        <AccountInfo user={currentUser} />
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Account;