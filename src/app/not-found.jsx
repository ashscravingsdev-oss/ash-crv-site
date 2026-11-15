import Link from "next/link"
import { Navigation } from "@/components/nav"
import { Footer } from "@/components/footer"
import CravingPicks from "@/components/shared/craving-picks"

export const metadata = {
    title: "Page not found - Ash's Cravings",
    robots: { index: false },
}

export default function NotFound() {
    return (
        <div className="min-h-screen">
            <Navigation />
            <section className="container mx-auto px-4 pt-12 pb-4 md:pt-20">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center space-y-3 mb-8 md:mb-10">
                        <p className="font-mono text-xs uppercase tracking-[0.18em] text-brand-heading">
                            <span className="text-brand-matcha">■</span> Page not found
                        </p>
                        <h1 className="font-serif font-medium text-5xl md:text-6xl text-brand-heading text-balance">
                            This page isn&apos;t <em className="italic text-brand-tobacco">on the menu</em>
                        </h1>
                        <p className="text-lg text-foreground/80">
                            I couldn&apos;t find what you were looking for, but these are fresh:
                        </p>
                    </div>
                    <CravingPicks />
                    <p className="text-center mt-8">
                        <Link
                            href="/"
                            className="font-mono text-xs uppercase tracking-[0.18em] text-brand-espresso underline-offset-4 hover:underline"
                        >
                            ← Back to home
                        </Link>
                    </p>
                </div>
            </section>
            <Footer />
        </div>
    )
}
