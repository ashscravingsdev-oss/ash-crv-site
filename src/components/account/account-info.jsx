import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

const AccountInfo = ({ user }) => {
    // Default fallback if no user
    const displayEmail = user?.email || "No email provided";
    const displayPhone = user?.phone || "Not set";
    const displayAddress = user?.address || "No address on file";

    return (
        <Card>
            <CardHeader>
                <CardTitle>Account Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{displayEmail}</p>
                </div>
                <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium">{displayPhone}</p>
                </div>
                <Button variant="outline" size="sm" className="w-full bg-transparent" asChild>
                    <Link href="/account/profile">Edit Information</Link>
                </Button>
            </CardContent>
        </Card>
    );
};

export default AccountInfo;