"use client"

import { motion } from "framer-motion"

// Real messages from Ash's clients, copied word for word from her DMs.
// To add one, paste it in as another line (keep their words and emojis).
const messages = [
    "The Spicy Beef bowl was FREAKING AMAZING!!!! I wish that bowl was never ending lmao 😂",
    "Food is bomb! I love the chia puddings 👏🏽",
    "The Carbonara was honest to God some of the best I've had!! 🔥🔥🔥🔥🔥",
    "I couldn't wait I'm eating the Mac and meatballs 😭🔥 fire talent",
    "Chia pudding was freaking DELICIOUS!!!! I could dive into a whole bucket of that!!! 😍😋🔥",
    "I had the beef bowl today at work and I was blown away.",
    "Sooo good! 5 stars ⭐",
    "The Salmon and rice bowl 👌🏼 very good",
    "I enjoyed the Chia pudding yesterday and the garlic shrimp.",
]

const Reviews = () => {
    return (
        <section className="bg-muted">
            <div className="container mx-auto px-4 py-16 md:py-20">
                <div className="text-center mb-10 md:mb-12">
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-brand-heading mb-3">
                        <span className="text-brand-matcha">■</span> Kind words
                    </p>
                    <h2 className="font-serif font-medium text-4xl md:text-5xl text-brand-heading">
                        Straight from <em className="italic text-brand-tobacco">the DMs</em>
                    </h2>
                    <p className="text-muted-foreground mt-3">Real messages from real clients ♡</p>
                </div>

                <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 md:gap-5 max-w-5xl mx-auto">
                    {messages.map((text, i) => (
                        <motion.figure
                            key={text}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.3, delay: (i % 3) * 0.06 }}
                            className="break-inside-avoid mb-4 md:mb-5"
                        >
                            <blockquote className="rounded-[22px] rounded-bl-md bg-card border border-border px-5 py-4 text-[17px] leading-relaxed text-foreground/90 shadow-[0_1px_0_rgba(0,0,0,0.03)]">
                                {text}
                            </blockquote>
                        </motion.figure>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Reviews
