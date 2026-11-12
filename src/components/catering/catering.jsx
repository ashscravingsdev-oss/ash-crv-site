"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import InquiryForm from "./inquiry-form";
import CateringGallery from "./catering-gallery";
import FactStrip from "@/components/ui/fact-strip";

// Gentle fade-up as each section scrolls into view (same as the About page)
const reveal = {
    initial: { opacity: 0, y: 12 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: 0.35 },
};

const facts = [
    { value: "3 weeks", label: "to plan ahead" },
    { value: "50%", label: "holds your date" },
    { value: "Set up", label: "& ready to serve" },
];

const occasions = [
    {
        title: "Birthdays & celebrations",
        text: "First birthdays, milestone parties and everything in between. I'll build a spread around your theme and your guest list.",
        photo: "/gallery/events/birthdays.jpg",
        alt: "Fruit display with watermelon, pineapple, grapes and strawberries",
        position: "object-center",
    },
    {
        title: "Showers & private parties",
        text: "Baby showers, bridal showers, graduations and backyard nights. It feels homemade, and you don't lift a finger.",
        photo: "/gallery/events/showers.jpg",
        alt: "Charcuterie cups with Ash's Cravings stickers at a baby shower",
        position: "object-center",
    },
    {
        title: "Office mornings & lunches",
        text: "Breakfast burritos, sandwich trays and easy bites your team will actually look forward to.",
        photo: "/gallery/events/office.jpg",
        alt: "Basket of turkey sandwiches with arugula on toasted bread",
        position: "object-center",
    },
];

const favorites = [
    {
        name: "Breakfast burritos",
        text: "Fluffy eggs, potatoes, sautéed peppers and onions, and lots of cheese, made from scratch.",
    },
    {
        name: "Sandwich trays",
        text: "Chipotle Chicken Club · Pesto Caprese Ciabatta · Turkey Provolone",
    },
    {
        name: "Charcuterie cups",
        text: "Meats, cheeses, crackers and fruit, each in its own little cup.",
    },
    {
        name: "Grazing spreads",
        text: "Fresh veggies, dips, cheeses and fruit, styled for the table.",
    },
    {
        name: "Little bites",
        text: "Caprese skewers · deviled eggs · bruschetta · crostini",
    },
    {
        name: "Dessert tables",
        text: "Chocolate strawberries, mini cheesecakes, cupcakes and more.",
        href: "/custom-cakes#desserts",
    },
];

const Catering = () => {
    return (
        <>
            {/* Hero */}
            <section className="container mx-auto px-4 pt-10 pb-14 md:pt-14 md:pb-20">
                <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25 }}
                        className="space-y-5"
                    >
                        <p className="font-mono text-xs uppercase tracking-[0.18em] text-brand-heading">
                            <span className="text-brand-matcha">■</span> Events &amp; private chef
                        </p>
                        <h1 className="font-serif font-medium text-[3.25rem] leading-[0.98] sm:text-6xl lg:text-7xl text-brand-heading">
                            Made to <em className="italic text-brand-tobacco">gather around</em>
                        </h1>
                        <p className="text-lg md:text-xl text-foreground/85 leading-relaxed max-w-xl">
                            Breakfast burritos, sandwich trays, little bites and dessert tables, made from scratch and set
                            up pretty for your party, shower or office.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 pt-2">
                            <a
                                href="#request-a-quote"
                                className="inline-flex items-center justify-center gap-3 h-12 px-6 rounded-lg bg-primary text-primary-foreground font-mono text-xs uppercase tracking-[0.18em] hover:bg-primary/90 transition-colors"
                            >
                                Plan my event <span aria-hidden="true">→</span>
                            </a>
                            <a
                                href="#private-chef"
                                className="inline-flex items-center justify-center gap-3 h-12 px-6 rounded-lg border border-primary text-primary font-mono text-xs uppercase tracking-[0.18em] hover:bg-primary/5 transition-colors"
                            >
                                Book a chef night <span aria-hidden="true">→</span>
                            </a>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="grid grid-cols-5 grid-rows-2 gap-3 aspect-[5/4]"
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/gallery/catering/catering-17.jpg" alt="Bridal shower table with greenery, a welcome mirror and trays of bites" className="col-span-3 row-span-2 w-full h-full object-cover object-[30%_center] rounded-[18px]" />
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/gallery/catering/catering-15.jpg" alt="Smoked salmon bites on little gold forks" className="col-span-2 w-full h-full object-cover rounded-[18px]" />
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/gallery/catering/catering-16.jpg" alt="Platters of crostini topped with tomatoes and herbs" className="col-span-2 w-full h-full object-cover rounded-[18px]" />
                    </motion.div>
                </div>

                {/* Quick facts */}
                <FactStrip facts={facts} className="mt-12" />
            </section>

            {/* Occasions */}
            <section className="bg-muted">
                <div className="container mx-auto px-4 py-16 md:py-20">
                    <motion.div {...reveal} className="text-center mb-10 md:mb-12">
                        <p className="font-mono text-xs uppercase tracking-[0.18em] text-brand-heading mb-3">
                            <span className="text-brand-matcha">■</span> For every occasion
                        </p>
                        <h2 className="font-serif font-medium text-4xl md:text-5xl text-brand-heading">
                            Whatever you&apos;re <em className="italic text-brand-tobacco">celebrating</em>
                        </h2>
                    </motion.div>
                    <div className="grid md:grid-cols-3 gap-8 md:gap-6 lg:gap-10">
                        {occasions.map((o, i) => (
                            <motion.article key={o.title} {...reveal} transition={{ duration: 0.35, delay: i * 0.08 }} className="space-y-4">
                                <div className="aspect-[4/5] rounded-[18px] overflow-hidden bg-brand-latte">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={o.photo} alt={o.alt} loading="lazy" className={`w-full h-full object-cover ${o.position} hover:scale-105 transition-transform duration-500`} />
                                </div>
                                <h3 className="font-serif text-3xl leading-tight text-brand-espresso">{o.title}</h3>
                                <p className="text-foreground/80 leading-relaxed">{o.text}</p>
                            </motion.article>
                        ))}
                    </div>
                </div>
            </section>

            {/* Past events */}
            <section className="container mx-auto px-4 pt-16 md:pt-20">
                <CateringGallery />
            </section>

            {/* Crowd favorites */}
            <section className="container mx-auto px-4 py-16 md:py-20">
                <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-16">
                    <motion.div {...reveal} className="space-y-4 lg:sticky lg:top-28 self-start">
                        <p className="font-mono text-xs uppercase tracking-[0.18em] text-brand-heading">
                            <span className="text-brand-matcha">■</span> On the menu
                        </p>
                        <h2 className="font-serif font-medium text-4xl md:text-5xl text-brand-heading">
                            A few <em className="italic text-brand-tobacco">crowd favorites</em>
                        </h2>
                        <p className="text-lg text-foreground/85 leading-relaxed">
                            Every menu is made for your event, so mix and match or ask me for something special.
                        </p>
                        <div className="pt-2">
                            <a
                                href="#request-a-quote"
                                className="inline-flex items-center justify-center gap-3 h-12 px-6 rounded-lg bg-primary text-primary-foreground font-mono text-xs uppercase tracking-[0.18em] hover:bg-primary/90 transition-colors"
                            >
                                Plan my event <span aria-hidden="true">→</span>
                            </a>
                        </div>
                    </motion.div>
                    <motion.ul {...reveal} className="grid sm:grid-cols-2 gap-x-10 border-t border-brand-espresso/25">
                        {favorites.map((f) => (
                            <li key={f.name} className="border-b border-dashed border-border py-5">
                                <p className="font-serif text-2xl md:text-[1.7rem] leading-tight text-brand-espresso">{f.name}</p>
                                <p className="mt-1.5 text-[15px] leading-relaxed italic text-foreground/70">{f.text}</p>
                                {f.href && (
                                    <Link href={f.href} className="inline-block mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-brand-tobacco underline underline-offset-4">
                                        See desserts →
                                    </Link>
                                )}
                            </li>
                        ))}
                    </motion.ul>
                </div>
            </section>

            {/* Private chef (new, trying it out) */}
            <section className="container mx-auto px-4 pb-16 md:pb-20">
                <motion.div
                    id="private-chef"
                    {...reveal}
                    className="scroll-mt-24 grid md:grid-cols-2 bg-muted rounded-[22px] overflow-hidden"
                >
                    <div className="aspect-[4/3] md:aspect-auto md:min-h-[420px] bg-brand-latte">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="/gallery/catering/catering-03.jpg"
                            alt="Meatballs and baked mac and cheese cooking on the stove"
                            loading="lazy"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="p-6 md:p-10 lg:p-12 flex flex-col justify-center space-y-4">
                        <p className="font-mono text-xs uppercase tracking-[0.18em] text-brand-heading">
                            <span className="text-brand-matcha">■</span> New · Private chef
                        </p>
                        <h2 className="font-serif font-medium text-4xl md:text-5xl leading-[1.05] text-brand-heading">
                            Your own chef, <em className="italic text-brand-tobacco">for the night</em>
                        </h2>
                        <p className="text-foreground/85 leading-relaxed">
                            I come to your home, cook in your kitchen and make a dinner just for you and your people.
                            Date nights, birthdays, family dinners, a night in with the girls. Tell me what you&apos;re
                            craving and I&apos;ll build the menu around it.
                        </p>
                        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-brand-heading leading-relaxed">
                            Up to 10 guests · I bring the groceries · I clean up after
                        </p>
                        <div className="pt-2">
                            <a
                                href="#request-a-quote"
                                className="inline-flex items-center justify-center gap-3 h-12 px-6 rounded-lg bg-primary text-primary-foreground font-mono text-xs uppercase tracking-[0.18em] hover:bg-primary/90 transition-colors"
                            >
                                Book a chef night <span aria-hidden="true">→</span>
                            </a>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Request form */}
            <section id="request-a-quote" className="scroll-mt-24 bg-muted">
                <div className="container mx-auto px-4 py-16 md:py-20">
                    <InquiryForm />
                </div>
            </section>
        </>
    );
};

export default Catering;
