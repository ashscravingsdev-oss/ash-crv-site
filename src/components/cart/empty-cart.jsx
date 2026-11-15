import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Cashy, Sparkles } from "@/components/ui/cashy"

/** Shown on the cart and checkout pages when there's nothing in the cart */
export default function EmptyCart({ className = "pt-16" }) {
    return (
        <div className={`container mx-auto px-4 ${className}`}>
            <Card className="max-w-md mx-auto text-center px-8 py-12">
                <div className="relative mx-auto mb-5 w-36">
                    <Sparkles className="absolute -top-3 left-1/2 w-44 -translate-x-1/2" />
                    <Cashy className="relative w-28 mx-auto" title="Cashy the toy poodle" />
                </div>
                <h2 className="font-serif font-medium text-3xl text-brand-heading mb-2">Your cart is empty</h2>
                <p className="text-muted-foreground mb-7">Cashy checked twice! Let&apos;s find you something good.</p>
                <Button asChild>
                    <Link href="/menu">Browse the menu</Link>
                </Button>
            </Card>
        </div>
    )
}
