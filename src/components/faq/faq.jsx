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
        category: "Orders & Delivery",
        questions: [
            {
                q: "How does delivery work?",
                a: "We deliver fresh meals to your door every Monday and Tuesday between 10 AM and 7 PM. You can select your preferred delivery day and time window during checkout. All deliveries are made in eco-friendly, insulated packaging to maintain freshness.",
            },
            {
                q: "What if I'm not home for delivery?",
                a: "Our insulated packaging keeps meals fresh for up to 8 hours. You can also provide delivery instructions during checkout, such as leaving the package at your doorstep or with a neighbor.",
            },
            {
                q: "Can I change my delivery address?",
                a: "Yes! You can update your delivery address in your account settings at any time. Changes must be made at least 48 hours before your next scheduled delivery.",
            },
        ],
    },
    {
        category: "Meal Plans & Pricing",
        questions: [
            {
                q: "How much do meals cost?",
                a: "Individual meals range from $7.99 to $14.99 depending on the item. Our subscription plans offer better value, starting at $79.99 per week with savings up to 10% for monthly subscribers.",
            },
            {
                q: "Can I customize my meal selection?",
                a: "Before each delivery, you'll receive an email allowing you to select exactly which meals you want from our full menu. You have complete control over your meal choices.",
            },
            {
                q: "Are there options for dietary restrictions?",
                a: "Yes! We offer vegetarian, vegan, gluten-free, and dairy-free options. You can filter meals by dietary preference when selecting your items. All allergen information is clearly listed on each meal.",
            },
        ],
    },
    {
        category: "Subscriptions",
        questions: [
            {
                q: "How do subscriptions work?",
                a: "Choose a plan (Weekly, Bi-Weekly, or Monthly), and you'll receive regular deliveries based on your schedule. You can skip, pause, or cancel anytime without penalties. You'll be billed automatically before each delivery.",
            },
            {
                q: "Can I skip a delivery?",
                a: "Yes! You can skip any delivery up to 5 days before your scheduled delivery date through your account dashboard. There are no limits on how many deliveries you can skip.",
            },
            {
                q: "How do I cancel my subscription?",
                a: "You can cancel anytime from your account settings. There are no cancellation fees or penalties. We'll be sad to see you go, but you're always welcome back!",
            },
        ],
    },
    {
        category: "Food Quality & Safety",
        questions: [
            {
                q: "Are ingredients organic?",
                a: "Yes! We source 100% organic ingredients from certified farms. We partner with over 30 local organic farms to ensure the highest quality and freshness.",
            },
            {
                q: "How long do meals stay fresh?",
                a: "Meals stay fresh for 5-7 days when refrigerated properly. Each meal is labeled with preparation and best-by dates. Our cold-pressed juices are best consumed within 3-4 days.",
            },
            {
                q: "How are meals prepared?",
                a: "All meals are prepared in our certified commercial kitchen by professional chefs. We follow strict food safety protocols and prepare meals fresh daily for delivery.",
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
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    Frequently Asked Questions
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                    Find answers to common questions about our meals, delivery, and
                    subscriptions
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
                        <h2 className="text-2xl font-bold mb-6">{category.category}</h2>
                        <Accordion type="single" collapsible className="space-y-4">
                            {category.questions.map((faq, idx) => (
                                <AccordionItem
                                    key={idx}
                                    value={`${category.category}-${idx}`}
                                    className="border border-border rounded-lg px-6"
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
