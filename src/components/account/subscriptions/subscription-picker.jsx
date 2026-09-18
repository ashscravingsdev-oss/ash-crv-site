"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, PackageX } from "lucide-react";
import Link from "next/link";
import Layout from "@/components/account/layout";
import SubscriptionPicksCard from "./subscription-picks-card";
import { fetchUserSubscriptions } from "@/store/dashboardSlice";
import { fetchActiveCutoff } from "@/store/subscriptionSelectionSlice";

const SubscriptionPicker = () => {
    const dispatch = useDispatch();
    const {
        subscriptions,
        loading: { subscriptions: loading },
    } = useSelector((state) => state.dashboard);

    useEffect(() => {
        dispatch(fetchUserSubscriptions());
        dispatch(fetchActiveCutoff());
    }, [dispatch]);

    return (
        <Layout
            title="Pick Your Meals"
            description="Choose what fills your build-your-own bundles each cycle, or let us repeat your last order."
        >
            <div className="lg:col-span-3 space-y-6">
                {loading ? (
                    <div className="flex justify-center py-12">
                        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                    </div>
                ) : subscriptions && subscriptions.length > 0 ? (
                    subscriptions.map((subscription) => (
                        <SubscriptionPicksCard key={subscription.id} subscription={subscription} />
                    ))
                ) : (
                    <Card>
                        <CardContent className="text-center py-12">
                            <PackageX className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                            <p className="text-lg font-medium mb-2">No subscriptions yet</p>
                            <p className="text-muted-foreground mb-6">
                                Start a subscription to pick your meals each cycle.
                            </p>
                            <Button asChild>
                                <Link href="/subscriptions">View Plans</Link>
                            </Button>
                        </CardContent>
                    </Card>
                )}
            </div>
        </Layout>
    );
};

export default SubscriptionPicker;
