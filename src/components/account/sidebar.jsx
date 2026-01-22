'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
    UserCircle,
    Package2,
    HomeIcon,
} from "lucide-react"

const Sidebar = () => {
    const pathname = usePathname()

    const isActive = (path, exact = false) => {
        if (exact) return pathname === path
        return pathname === path || pathname.startsWith(`${path}/`)
    }

    return (
        <Card className="lg:col-span-1 ">
            <CardContent className="p-6">
                <div className="space-y-1">
                    {/* Dashboard */}
                    <Button
                        asChild
                        variant="ghost"
                        className={`w-full justify-start gap-2 ${isActive("/account", true)
                            ? "bg-primary text-primary-foreground hover:bg-primary hover:text-white"
                            : "text-muted-foreground hover:text-foreground"
                            }`}
                    >
                        <Link href="/account">
                            <HomeIcon className="h-4 w-4" />
                            Dashboard
                        </Link>
                    </Button>

                    {/* Profile */}
                    <Button
                        asChild
                        variant="ghost"
                        className={`w-full justify-start gap-2 ${isActive("/account/profile")
                            ? "bg-primary text-primary-foreground hover:bg-primary hover:text-white"
                            : "text-muted-foreground hover:text-foreground"
                            }`}
                    >
                        <Link href="/account/profile">
                            <UserCircle className="h-4 w-4" />
                            Profile
                        </Link>
                    </Button>

                    {/* Orders */}
                    <Button
                        asChild
                        variant="ghost"
                        className={`w-full justify-start gap-2 ${isActive("/account/orders")
                            ? "bg-primary text-primary-foreground hover:bg-primary hover:text-white"
                            : "text-muted-foreground hover:text-foreground"
                            }`}
                    >
                        <Link href="/account/orders">
                            <Package2 className="h-4 w-4" />
                            Orders
                        </Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default Sidebar
