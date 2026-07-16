// components/account/active-subscription.js
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";

const ActiveSubscription = ({ subscription, onPause, onResume, onSkip ,loading }) => {
    if (loading) {
        return (
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Active Subscription</CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center py-6">
                    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                </CardContent>
            </Card>
        );
    }

    if (!subscription) {
        return (
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Active Subscription</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground text-sm">No active subscription.</p>
                    <Button className="mt-4" asChild>
                        <a href="/subscriptions">Explore Plans</a>
                    </Button>
                </CardContent>
            </Card>
        );
    }

    const freqLabel =
        subscription.frequency.charAt(0).toUpperCase() + subscription.frequency.slice(1);

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle> {freqLabel} Plan</CardTitle>
                <Badge className="bg-primary">
                    {subscription.status === "active" ? "Active" : subscription.status}
                </Badge>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <div>
                        <p className="text-sm text-muted-foreground">Next Delivery</p>
                        <p className="font-semibold">
                            {subscription.next_delivery_date
                                ? new Date(subscription.next_delivery_date).toLocaleDateString("en-US", {
                                    weekday: "long",
                                    month: "short",
                                    day: "numeric",
                                })
                                : "—"}
                        </p>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => onSkip(subscription.id)} >
                        Skip
                    </Button>
                </div>
                <div className="flex gap-3">
                    {subscription.status === "active" ? (
                        <Button
                            variant="outline"
                            className="flex-1 bg-transparent"
                            onClick={() => onPause(subscription.id)}
                        >
                            Pause Subscription
                        </Button>
                    ) : subscription.status === "paused" ? (
                        <Button
                            variant="outline"
                            className="flex-1 bg-transparent"
                            onClick={() => onResume(subscription.id)}
                        >
                            Resume Subscription
                        </Button>
                    ) : null}
                </div>
            </CardContent>
        </Card>
    );
};

export default ActiveSubscription;