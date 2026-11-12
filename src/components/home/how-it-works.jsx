import React from 'react'

const steps = [
    { number: "01", title: "Pick your meals", description: "Mix and match from this week’s menu. Order by Monday." },
    { number: "02", title: "I cook it fresh", description: "Everything is made from scratch, with love." },
    { number: "03", title: "Delivered Tuesday", description: "Ready to heat and enjoy all week long." },
]

const HowItWorks = () => {
    return (
        <section className="container mx-auto px-4 pt-16 md:pt-24 pb-8">
            <div className="text-center mb-10 md:mb-12 space-y-2">
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-brand-heading">■ How it works</p>
                <h2 className="font-serif font-medium text-4xl md:text-5xl text-brand-heading">
                    Fresh meals, <em className="italic">no stress</em>
                </h2>
            </div>

            <div className="grid md:grid-cols-3 border-y border-border">
                {steps.map((step, i) => (
                    <div
                        key={step.number}
                        className={`px-6 md:px-8 py-8 space-y-2 ${i < steps.length - 1 ? "border-b md:border-b-0 md:border-r border-dashed border-border" : ""}`}
                    >
                        <p className="font-serif italic text-5xl leading-none text-brand-tobacco">{step.number}</p>
                        <h3 className="font-serif text-2xl md:text-[1.75rem] font-semibold text-brand-espresso">{step.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default HowItWorks
