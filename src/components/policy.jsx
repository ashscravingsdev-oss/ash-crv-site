import { Footer } from "@/components/footer"
import { Navigation } from "@/components/nav"

// One layout for the Privacy and Terms pages. Each page passes plain data:
//   sections: [{ heading, blocks: [{ p: "text" } | { list: ["text", ["Bold lead-in:", " the rest"]] }] }]
const Line = ({ line }) =>
    Array.isArray(line) ? (
        <>
            <strong className="text-foreground">{line[0]}</strong>
            {line[1]}
        </>
    ) : (
        line
    )

export default function Policy({ title, updated, intro = [], sections = [] }) {
    return (
        <div className="min-h-screen">
            <Navigation />
            <div className="container mx-auto px-4 pt-12 pb-16 max-w-3xl">
                <h1 className="text-4xl font-bold text-foreground mb-2">{title}</h1>
                <p className="text-muted-foreground mb-8">Last updated: {updated}</p>

                {intro.map((text) => (
                    <p key={text} className="text-foreground/90 text-lg leading-relaxed mb-4">
                        {text}
                    </p>
                ))}

                {sections.map((section) => (
                    <section key={section.heading} className="mt-10">
                        <h2 className="text-2xl font-semibold text-foreground mb-4">{section.heading}</h2>
                        {section.blocks.map((block, i) =>
                            block.list ? (
                                <ul key={i} className="list-disc pl-6 text-muted-foreground space-y-2 mb-4 leading-relaxed">
                                    {block.list.map((line, j) => (
                                        <li key={j}>
                                            <Line line={line} />
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p key={i} className="text-muted-foreground leading-relaxed mb-4">
                                    <Line line={block.p} />
                                </p>
                            )
                        )}
                    </section>
                ))}
            </div>
            <Footer />
        </div>
    )
}
