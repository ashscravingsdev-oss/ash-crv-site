import { REHEAT_STEPS, needsReheat, notesFor } from "@/lib/reheat"

/** "How to reheat" on each meal's page, with any extra note for that dish */
export default function ReheatCard({ product }) {
    if (!needsReheat(product)) return null
    const notes = notesFor(product)

    return (
        <section aria-labelledby="reheat-heading" className="rounded-[18px] bg-muted p-6 md:p-8 mb-16">
            <p id="reheat-heading" className="font-mono text-xs uppercase tracking-[0.18em] text-brand-heading mb-5">
                <span className="text-brand-matcha">■</span> How to reheat
            </p>
            <ol className="grid gap-5 md:grid-cols-3">
                {REHEAT_STEPS.map((s, i) => (
                    <li key={s.title} className="flex gap-4">
                        <span className="font-mono text-xs tracking-[0.14em] text-brand-tobacco pt-1.5">0{i + 1}</span>
                        <div>
                            <p className="font-serif text-2xl font-semibold leading-tight text-brand-espresso">{s.title}</p>
                            <p className="text-muted-foreground mt-0.5">{s.text}</p>
                        </div>
                    </li>
                ))}
            </ol>
            {notes.length > 0 && (
                <div className="mt-6 pt-5 border-t border-brand-tobacco/20 space-y-1.5">
                    {notes.map((n) => (
                        <p key={n.key} className="text-foreground/85">
                            <span className="font-semibold text-brand-espresso">{n.label}:</span> {n.text}
                        </p>
                    ))}
                </div>
            )}
        </section>
    )
}
