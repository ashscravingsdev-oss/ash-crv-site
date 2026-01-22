import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

const AccountInfo = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Account Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">john.doe@example.com</p>
                </div>
                <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium">(555) 123-4567</p>
                </div>
                <div>
                    <p className="text-sm text-muted-foreground">
                        Delivery Address
                    </p>
                    <p className="font-medium">
                        123 Main St, San Francisco, CA 94102
                    </p>
                </div>
                <Button
                    variant="outline"
                    size="sm"
                    className="w-full bg-transparent"
                    asChild
                >
                    <Link href="/account/profile">Edit Information</Link>
                </Button>
            </CardContent>
        </Card>
    )
}

export default AccountInfo
