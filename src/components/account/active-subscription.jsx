import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const ActiveSubscription = ({ activeSubscription }) => {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Active Subscription</CardTitle>
                <Badge className="bg-primary">Active</Badge>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="font-semibold text-lg">
                            {activeSubscription.plan}
                        </p>
                        <p className="text-sm text-muted-foreground">
                            14 meals every 2 weeks
                        </p>
                    </div>
                    <p className="text-2xl font-bold">$149.99</p>
                </div>
                <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <div>
                        <p className="text-sm text-muted-foreground">
                            Next Delivery
                        </p>
                        <p className="font-semibold">
                            {activeSubscription.nextDelivery}
                        </p>
                    </div>
                    <Button variant="outline" size="sm">
                        Skip
                    </Button>
                </div>
                <div className="flex gap-3">
                    <Button
                        variant="outline"
                        className="flex-1 bg-transparent"
                        asChild
                    >
                        <Link href="/subscriptions">Change Plan</Link>
                    </Button>
                    <Button variant="outline" className="flex-1 bg-transparent">
                        Pause Subscription
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default ActiveSubscription
