import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Calendar, Settings } from "lucide-react";
import Link from "next/link";
const QuickActions = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent"
                    asChild
                >
                    <Link href="/account/orders">
                        <Package className="h-4 w-4 mr-2" />
                        Order History
                    </Link>
                </Button>
                <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent"
                    asChild
                >
                    <Link href="/account/profile">
                        <Settings className="h-4 w-4 mr-2" />
                        Account Settings
                    </Link>
                </Button>
            </CardContent>
        </Card>
    )
}

export default QuickActions
