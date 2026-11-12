import React from 'react'
import { Input } from "@/components/ui/input";

const Newsletter = () => {
    return (
        <section className="bg-muted border-t border-border">
            <div className="container mx-auto px-4 py-16 md:py-20">
                <div className="max-w-2xl mx-auto text-center space-y-4">
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-brand-heading">■ Join the list</p>
                    <h2 className="font-serif font-medium text-4xl md:text-5xl text-brand-heading text-balance">
                        Get <em className="italic">$10 off</em> your first order
                    </h2>
                    <p className="text-lg text-foreground/85">
                        The weekly menu, new cake designs and little deals, straight to your inbox.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-2">
                        <label htmlFor="newsletter-email" className="sr-only">Email address</label>
                        <Input
                            id="newsletter-email"
                            type="email"
                            placeholder="Your email"
                            className="h-12 bg-background flex-1"
                        />
                        <button
                            type="button"
                            className="h-12 px-6 rounded-lg bg-primary text-primary-foreground font-mono text-xs uppercase tracking-[0.18em] hover:bg-primary/90 transition-colors"
                        >
                            Subscribe
                        </button>
                    </div>
                    <p className="text-sm text-muted-foreground">Unsubscribe anytime.</p>
                </div>
            </div>
        </section>
    )
}

export default Newsletter
