"use client";

import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Repeat, Lock, Clock } from "lucide-react";
import { toast } from "sonner";
import BundleLinePicker from "./bundle-line-picker";
import { fetchSelectionState, repeatLastOrder } from "@/store/subscriptionSelectionSlice";

/** Mirrors the backend's isPastCutoff() - a client-side pre-check only; the PUT/POST endpoints remain the source of truth. */
function isPastCutoffNow(rule) {
    if (!rule) return false;
    const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    const now = new Date();
    if (days[now.getDay()] !== rule.cutoff_day?.toLowerCase()) return false;
    const [h, m, s] = (rule.cutoff_time || "0:0:0").split(":").map(Number);
    const cutoffMoment = new Date(now);
    cutoffMoment.setHours(h, m, s || 0, 0);
    return now >= cutoffMoment;
}

const SubscriptionPicksCard = ({ subscription }) => {
    const dispatch = useDispatch();
    const { selectionBySubscription, cutoff, repeating } = useSelector((state) => state.subscriptionSelection);
    const [forceLocked, setForceLocked] = useState(false);

    const subState = selectionBySubscription[subscription.id];
    const isRepeating = !!repeating[subscription.id];

    useEffect(() => {
        dispatch(fetchSelectionState(subscription.id));
    }, [dispatch, subscription.id]);

    const clockLocked = isPastCutoffNow(cutoff.rule);
    const locked = clockLocked || forceLocked || !!subState?.lockConflict || subscription.status !== "active";

    const freqLabel = subscription.frequency
        ? subscription.frequency.charAt(0).toUpperCase() + subscription.frequency.slice(1)
        : "";
    const nextDeliveryLabel = subscription.next_delivery_date
        ? new Date(subscription.next_delivery_date).toLocaleDateString("en-US", {
              weekday: "long",
              month: "short",
              day: "numeric",
          })
        : "—";

    const refreshAfterLockConflict = () => {
        setForceLocked(true);
        dispatch(fetchSelectionState(subscription.id));
    };

    const handleRepeatLast = async () => {
        try {
            await dispatch(repeatLastOrder(subscription.id)).unwrap();
            toast.success("You're all set - we'll repeat your last order for the upcoming cycle");
        } catch (err) {
            if (err?.status === 409) {
                toast.error("Picks just locked for this cycle.");
                refreshAfterLockConflict();
            } else {
                toast.error(err?.message || "Failed to reset to your last order");
            }
        }
    };

    return (
        <Card>
            <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-2">
                <CardTitle>{freqLabel} Plan</CardTitle>
                <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Next delivery: {nextDeliveryLabel}</span>
                    {locked ? (
                        <Badge variant="outline" className="gap-1">
                            <Lock className="h-3 w-3" /> Locked
                        </Badge>
                    ) : cutoff.rule ? (
                        <Badge variant="outline" className="gap-1">
                            <Clock className="h-3 w-3" /> Editable until {cutoff.rule.display_value}
                        </Badge>
                    ) : null}
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                {subscription.status !== "active" ? (
                    <p className="text-sm text-muted-foreground">
                        This subscription is {subscription.status} - resume it from the dashboard to pick your meals.
                    </p>
                ) : (
                    <>
                        <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                            <div>
                                <p className="font-medium">Not picking this cycle?</p>
                                <p className="text-sm text-muted-foreground">
                                    We'll repeat your last order automatically either way - tap this to confirm it now.
                                </p>
                            </div>
                            <Button variant="outline" onClick={handleRepeatLast} disabled={locked || isRepeating}>
                                {isRepeating ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                    <>
                                        <Repeat className="h-4 w-4 mr-2" /> Repeat Last Order
                                    </>
                                )}
                            </Button>
                        </div>

                        {subState?.loading ? (
                            <div className="flex justify-center py-8">
                                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                            </div>
                        ) : subState?.error ? (
                            <p className="text-sm text-destructive">{subState.error}</p>
                        ) : !subState?.lines?.length ? (
                            <p className="text-sm text-muted-foreground">
                                This subscription has no build-your-own bundle items to pick.
                            </p>
                        ) : (
                            <div className="space-y-4">
                                {subState.lines.map((line) => (
                                    <BundleLinePicker
                                        key={line.source_order_item_id}
                                        subscriptionId={subscription.id}
                                        line={line}
                                        locked={locked}
                                        onLockedByServer={refreshAfterLockConflict}
                                    />
                                ))}
                            </div>
                        )}
                    </>
                )}
            </CardContent>
        </Card>
    );
};

export default SubscriptionPicksCard;
