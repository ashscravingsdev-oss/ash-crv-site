"use client";

import { Navigation } from "@/components/nav";
import { Footer } from "@/components/footer";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

const faqs = [
    {
        category: "Meal Prep & Delivery",
        questions: [
            {
                q: "When do you deliver?",
                a: "I deliver every Monday and Tuesday. You'll pick your day and delivery window at checkout. Order by Sunday to get your meals that Monday or Tuesday.",
            },
            {
                q: "Is there a delivery fee? Can I pick up instead?",
                a: "Delivery has a fee based on your address, and you'll see it at checkout before you pay. You can also pick up your order. Just message me and we'll set it up.",
            },
            {
                q: "What if I'm not home for delivery?",
                a: "No problem! Message me before your delivery day and tell me where to leave your meals. Just pop them in the fridge as soon as you can.",
            },
            {
                q: "How long do meals stay fresh?",
                a: "Your meals are best within 3 to 4 days in the fridge.",
            },
            {
                q: "How do I reheat my meals?",
                a: "The microwave works perfect, about 2 minutes. My favorite way is in my mini oven or the air fryer.",
            },
            {
                q: "Can I make swaps or work around allergies?",
                a: "Yes! No rice, extra veggies, extra protein, just tell me what you like. If you have an allergy, let me know when you order and I'll work around it. Everything is made in my kitchen, so if your allergy is severe, please message me first so we can talk it through.",
            },
            {
                q: "How much do meals cost?",
                a: "Meals are $17 each, or mix and match 5 for $80 or 10 for $160.",
            },
        ],
    },
    {
        category: "Subscriptions",
        questions: [
            {
                q: "How do subscriptions work?",
                a: "Subscriptions are for bundles. Pick a bundle and how often (every week or every 2 weeks), then pick new meals from your account each week before the Sunday cutoff. If you don't pick, I'll repeat your last picks and swap anything that's off the menu for a chef's choice.",
            },
            {
                q: "Can I skip a week?",
                a: "Of course! Skip it from your account before Sunday and you won't be charged that week.",
            },
            {
                q: "How do I stop my subscription?",
                a: "Pause it anytime from your account. No fees and no hard feelings, and it stays paused until you resume. You're always welcome back!",
            },
        ],
    },
    {
        category: "Cakes & Desserts",
        questions: [
            {
                q: "How far ahead should I order a cake?",
                a: "At least 1 week ahead. The sooner you reach out, the better, so I can save your date.",
            },
            {
                q: "How much are custom cakes?",
                a: "My 6\" cakes start at $125. The final price depends on the size, design, flavors and fillings. I'll send you a quote with a private link to order, no account needed.",
            },
            {
                q: "Do you sell desserts by the dozen?",
                a: "Yes! Cookies, mini cupcakes, cheesecakes, brownies, chocolate strawberries and dessert cups, from $44 a dozen. Each flavor is a 2 dozen minimum, and I need 10 days' notice. You can order them right on the Cakes & Desserts page or the Menu.",
            },
        ],
    },
    {
        category: "Events & Private Chef",
        questions: [
            {
                q: "How far ahead should I book an event?",
                a: "At least 3 weeks ahead, so I have time to plan your menu and shop for everything.",
            },
            {
                q: "How do I book an event or a private chef night?",
                a: "Fill out the request form on my Events page and I'll get back to you with a custom quote. A 50% deposit holds your date.",
            },
            {
                q: "What's included with a private chef night?",
                a: "I bring all the groceries, cook right in your kitchen and clean up after, so all you have to do is enjoy. I can cook for up to 10 guests, and I'll serve on your plates and dishes.",
            },
            {
                q: "How much is a private chef night?",
                a: "Every dinner is different! Send me a request with your date, how many guests and what you're craving, and I'll put together your quote.",
            },
        ],
    },
    {
        category: "Payments & Cancellations",
        questions: [
            {
                q: "How can I pay?",
                a: "On the website, you pay by card at checkout. For cakes, desserts, events and private chef nights, I take card, Zelle or a payment link, whatever's easiest for you.",
            },
            {
                q: "Do I need to pay a deposit?",
                a: "For cakes, desserts, events and private chef nights, a 50% deposit holds your date. For cakes and desserts you order on the site, the rest is charged automatically to the same card on your date. If anything changes, I'll refund the difference.",
            },
            {
                q: "What if I need to cancel?",
                a: "Meal prep: you can change or cancel anytime before Sunday. After that, I've already shopped for your meals, so I can't refund that week. Cakes, desserts, events and private chef nights: your deposit holds your date and isn't refundable, since I turn other orders away for you. If you cancel at least 7 days before, I'll happily move your deposit to a new date one time. Life happens, so just talk to me!",
            },
        ],
    },
];
const FAQ = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredFaqs = faqs
        .map((category) => ({
            ...category,
            questions: category.questions.filter(
                (q) =>
                    q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    q.a.toLowerCase().includes(searchQuery.toLowerCase())
            ),
        }))
        .filter((category) => category.questions.length > 0);

    return (
        <div className="container mx-auto px-4 pt-8">
            {/* Header */}
            <div className="text-center mb-12">
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-brand-heading mb-3"><span className="text-brand-matcha">■</span> FAQ</p>
                <h1 className="font-serif font-medium text-5xl md:text-6xl text-brand-heading mb-4">
                    Questions? <em className="italic text-brand-tobacco">I&apos;ve got you</em>
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                    Everything you might want to know before you order. Can&apos;t find your answer? Just message me.
                </p>

                {/* Search */}
                <div className="relative max-w-md mx-auto">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                        type="text"
                        placeholder="Search questions..."
                        className="pl-10"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {/* FAQ Sections */}
            <div className="max-w-3xl mx-auto space-y-12">
                {filteredFaqs.map((category) => (
                    <div key={category.category}>
                        <h2 className="font-serif font-medium text-3xl md:text-4xl text-brand-heading mb-6">{category.category}</h2>
                        <Accordion type="single" collapsible className="space-y-4">
                            {category.questions.map((faq, idx) => (
                                <AccordionItem
                                    key={idx}
                                    value={`${category.category}-${idx}`}
                                    className="border border-border rounded-lg px-6 bg-card"
                                >
                                    <AccordionTrigger className="text-left hover:no-underline">
                                        <span className="font-semibold">{faq.q}</span>
                                    </AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground leading-relaxed">
                                        {faq.a}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                ))}

                {filteredFaqs.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-lg text-muted-foreground">
                            No questions found. Try a different search term.
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default FAQ
