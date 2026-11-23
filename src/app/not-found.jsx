import Link from "next/link"
import { Navigation } from "@/components/nav"
import { Footer } from "@/components/footer"

export const metadata = {
    title: "Page not found - Ash's Cravings",
    robots: { index: false },
}

export default function NotFound() {
    return (
        <div className="min-h-screen">
            <Navigation />
            <section className="container mx-auto px-4 py-20 md:py-32">
                <div className="max-w-2xl mx-auto text-center space-y-4">
                    <p className="font-serif italic text-xl md:text-2xl text-brand-tobacco">
                        <span aria-hidden="true" className="not-italic text-brand-matcha text-[0.55em] align-[0.2em] mr-2">■</span>
                        Page not found
                    </p>
                    <h1 className="font-serif font-semibold text-5xl md:text-6xl text-brand-heading text-balance">
                        This page isn&apos;t <em className="italic font-medium text-brand-tobacco">on the menu</em>
                    </h1>
                    <p className="text-lg text-foreground/80">
                        I couldn&apos;t find what you were looking for.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                        <Link
                            href="/menu"
                            className="inline-flex items-center justify-center gap-3 h-12 px-6 rounded-lg bg-primary text-primary-foreground font-mono text-xs uppercase tracking-[0.18em] hover:bg-primary/90 transition-colors"
                        >
                            See the menu <span aria-hidden="true">→</span>
                        </Link>
                        <Link
                            href="/"
                            className="inline-flex items-center justify-center gap-3 h-12 px-6 rounded-lg border border-primary text-primary font-mono text-xs uppercase tracking-[0.18em] hover:bg-primary/5 transition-colors"
                        >
                            Go home
                        </Link>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}
