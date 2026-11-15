import Link from "next/link"
import { Navigation } from "@/components/nav"
import { Footer } from "@/components/footer"
import { Cashy, Sparkles } from "@/components/ui/cashy"

export const metadata = {
    title: "Page not found - Ash's Cravings",
    robots: { index: false },
}

export default function NotFound() {
    return (
        <div className="min-h-screen">
            <Navigation />
            <section className="container mx-auto px-4 py-16 md:py-24 text-center">
                <div className="relative mx-auto mb-6 w-44">
                    <Sparkles className="absolute -top-3 left-1/2 w-52 -translate-x-1/2" />
                    <Cashy className="relative w-36 mx-auto" title="Cashy the toy poodle" />
                </div>
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-brand-heading">
                    <span className="text-brand-matcha">■</span> Page not found
                </p>
                <h1 className="font-serif font-medium text-4xl md:text-6xl text-brand-heading mt-3 mb-4">
                    Oops, this page <em className="italic text-brand-tobacco">wandered off</em>
                </h1>
                <p className="text-lg text-foreground/80 max-w-md mx-auto mb-8">
                    Even Cashy couldn&apos;t sniff it out. Let&apos;s get you back to the good stuff.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
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
            </section>
            <Footer />
        </div>
    )
}
