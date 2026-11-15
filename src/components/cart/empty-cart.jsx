import Link from "next/link"
import CravingPicks from "@/components/shared/craving-picks"

/** Shown on the cart and checkout pages when there's nothing in the cart */
export default function EmptyCart() {
    return (
        <section className="container mx-auto px-4 pt-12 pb-4 md:pt-20">
            <div className="max-w-4xl mx-auto">
                <div className="text-center space-y-3 mb-8 md:mb-10">
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-brand-heading">
                        <span className="text-brand-matcha">■</span> Your cart
                    </p>
                    <h1 className="font-serif font-medium text-5xl md:text-6xl text-brand-heading">
                        Nothing here <em className="italic text-brand-tobacco">yet</em>
                    </h1>
                    <p className="text-lg text-foreground/80">Let&apos;s fix that. Here&apos;s where to start:</p>
                </div>
                <CravingPicks />
                <p className="text-center text-sm text-muted-foreground mt-8">
                    Looking for something special?{" "}
                    <Link href="/contact" className="underline underline-offset-4 hover:text-foreground">Message me</Link>
                </p>
            </div>
        </section>
    )
}
