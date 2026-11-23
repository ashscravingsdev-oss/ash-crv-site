"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { fadeUp } from "@/lib/animations"
import ContactForm from "./contact-form"

const EMAIL = "Ashscravings@gmail.com"
const PHONE = "951-224-7740"

// The quickest way in for the bigger asks, so they land on the right form
const shortcuts = [
    { label: "Request a cake", href: "/custom-cakes#request" },
    { label: "Plan an event", href: "/events#request-a-quote" },
    { label: "Find a quick answer", href: "/faq" },
]

const Contact = () => (
    <section className="container mx-auto px-4 pt-10 pb-16 md:pt-14 md:pb-24">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16 items-start">
            <motion.div initial="initial" animate="animate" variants={fadeUp} className="space-y-6 max-w-xl">
                <p className="font-serif italic text-xl md:text-2xl text-brand-tobacco">
                    <span aria-hidden="true" className="not-italic text-brand-matcha text-[0.55em] align-[0.2em] mr-2">■</span>
                    Contact
                </p>
                <h1 className="font-serif font-semibold text-[3.25rem] leading-[0.98] sm:text-6xl text-brand-heading">
                    Say <em className="italic font-medium text-brand-tobacco">hello</em>
                </h1>
                <p className="text-lg md:text-xl text-foreground/85 leading-relaxed">
                    Questions, special requests, or just want to say hi? Send me a message and I&apos;ll get back to you
                    soon.
                </p>

                <dl className="border-t border-brand-tobacco/20">
                    <div className="flex items-baseline justify-between gap-4 border-b border-brand-tobacco/20 py-4">
                        <dt className="font-serif italic text-lg text-brand-tobacco">Email</dt>
                        <dd>
                            <a href={`mailto:${EMAIL}`} className="text-brand-espresso hover:underline underline-offset-4">
                                {EMAIL}
                            </a>
                        </dd>
                    </div>
                    <div className="flex items-baseline justify-between gap-4 border-b border-brand-tobacco/20 py-4">
                        <dt className="font-serif italic text-lg text-brand-tobacco">Instagram</dt>
                        <dd>
                            <a
                                href="https://www.instagram.com/ashscravings"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-brand-espresso hover:underline underline-offset-4"
                            >
                                @ashscravings
                            </a>
                        </dd>
                    </div>
                    <div className="flex items-baseline justify-between gap-4 border-b border-brand-tobacco/20 py-4">
                        <dt className="font-serif italic text-lg text-brand-tobacco">Phone</dt>
                        <dd>
                            <a href={`tel:${PHONE}`} className="text-brand-espresso hover:underline underline-offset-4">
                                {PHONE}
                            </a>
                        </dd>
                    </div>
                    <div className="flex items-baseline justify-between gap-4 border-b border-brand-tobacco/20 py-4">
                        <dt className="font-serif italic text-lg text-brand-tobacco">Serving</dt>
                        <dd className="text-brand-espresso">Eastvale, CA</dd>
                    </div>
                </dl>

                <div className="space-y-2 pt-2">
                    <p className="font-serif italic text-lg text-brand-tobacco">Looking for something specific?</p>
                    <ul className="space-y-1.5">
                        {shortcuts.map((s) => (
                            <li key={s.href}>
                                <Link href={s.href} className="text-brand-espresso border-b border-dashed border-brand-tobacco hover:border-solid">
                                    {s.label} →
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.05 }}
            >
                <ContactForm />
            </motion.div>
        </div>
    </section>
)

export default Contact
