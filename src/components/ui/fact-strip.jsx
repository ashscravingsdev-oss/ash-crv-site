/**
 * Three quick facts under a page's hero: a big serif value with a small
 * label underneath, divided by thin lines (no boxes).
 * facts: [{ value: "3 weeks", label: "to plan ahead" }]
 */
const FactStrip = ({ facts, className = "" }) => (
    <dl className={`grid grid-cols-3 divide-x divide-brand-espresso/15 border-y border-brand-espresso/15 ${className}`}>
        {facts.map((f) => (
            <div key={f.label} className="flex flex-col-reverse items-center text-center gap-1 px-2 sm:px-6 py-5 md:py-6">
                <dt className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.14em] text-brand-heading leading-snug">
                    {f.label}
                </dt>
                <dd className="font-serif text-[1.7rem] sm:text-4xl md:text-[2.6rem] leading-none text-brand-espresso">
                    {f.value}
                </dd>
            </div>
        ))}
    </dl>
)

export default FactStrip
