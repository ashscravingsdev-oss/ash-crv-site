"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, ShoppingCart, Repeat, Truck, Pause, X, Clock } from "lucide-react"
import Link from "next/link"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion"
import { fadeUp, fadeIn } from "@/lib/animations"

const faqs = [
    {
        id: "choose-meals",
        question: "How do I choose my meals every week?",
        answer: "Before each delivery cycle, you’ll receive a reminder to visit your customer dashboard. There you can add, remove, or swap any meals and juices from our live menu—or leave your previous selection as is."
    },
    {
        id: "billing",
        question: "When am I billed for my subscription?",
        answer: "To give our kitchen time to source the freshest ingredients, we bill every Saturday at 8:05 PM—right after our 8:00 PM cutoff. This ensures your order is locked in and ready to be prepped for Monday or Tuesday delivery."
    },
    {
        id: "skip-week",
        question: "Can I skip a week if I am traveling?",
        answer: "Absolutely. In your account dashboard, just tap \"Skip Next Delivery\" before the Saturday 8:00 PM cutoff. You won’t be charged, and your subscription will resume automatically with the following delivery."
    },
    {
        id: "delivery-days",
        question: "What are your delivery days and times?",
        answer: "We deliver every Monday and Tuesday, between 10:00 AM and 7:00 PM. When you set up your subscription, you’ll choose your preferred day and a one‑hour delivery window."
    },
    {
        id: "minimum-order",
        question: "Is there a minimum number of items I must order?",
        answer: "No minimum. Your subscription is based entirely on whatever you add to your cart. Order a single juice or a week’s worth of meals—the choice is yours."
    },
    {
        id: "cancel",
        question: "How do I cancel my subscription?",
        answer: "Just head to your account dashboard and tap \"Cancel Subscription\". It takes effect immediately, and you’ll never be charged again."
    }
]

const steps = [
    {
        icon: ShoppingCart,
        title: "Fill Your Cart with What You Crave",
        description: "Browse our entire menu of chef‑crafted meals and cold‑pressed juices. Pick as many or as few as you like—every box is 100% custom."
    },
    {
        icon: Repeat,
        title: "Subscribe at Checkout",
        description: "When you’re ready to check out, simply select your preferred frequency—Weekly, Bi‑Weekly, or Monthly. Your order will repeat automatically, on your schedule."
    },
    {
        icon: Truck,
        title: "Fresh, Automated Delivery",
        description: "We deliver every Monday & Tuesday, 10 AM – 7 PM. Orders placed before Saturday 8:00 PM arrive the following week. No effort, no stress—just fresh food at your door."
    }
];

const Subscriptions = () => {
    return (
        <motion.div
            initial="initial"
            animate="animate"
            variants={fadeIn}
            className="pt-8"
        >
            {/* ============ HERO SECTION ============ */}
            <motion.div variants={fadeUp} className="text-center mb-16 container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <Badge className="mb-4">Subscribe & Save</Badge>
                </motion.div>

                <motion.h1
                    variants={fadeUp}
                    className="text-4xl md:text-5xl font-bold mb-4 text-balance"
                >
                    Eat What You Love. Every Week.
                </motion.h1>

                <motion.p
                    variants={fadeUp}
                    className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8"
                >
                    Build your perfect box from our full menu—meals, juices, and snacks. Toggle "Subscribe" at checkout to lock in your favorites and never miss a delivery. No rigid plans. Just your favorite food, delivered fresh weekly.
                </motion.p>

                <motion.div variants={fadeUp}>
                    <Button size="lg" asChild>
                        <Link href="/menu">Explore Menu & Subscribe</Link>
                    </Button>
                </motion.div>
            </motion.div>

            {/* ============ HOW IT WORKS ============ */}
            <motion.div
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeUp}
                className="mb-20 container mx-auto px-4"
            >
                <motion.h2
                    variants={fadeUp}
                    className="text-3xl font-bold text-center mb-12"
                >
                    How It Works
                </motion.h2>

                <div className="grid md:grid-cols-3 gap-8">
                    {steps.map((step, index) => (
                        <motion.div
                            key={step.title}
                            variants={fadeUp}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.15 }}
                            className="text-center"
                        >
                            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                                <step.icon className="h-8 w-8 text-primary" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                            <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* ============ VALUE PROPOSITION ============ */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mb-20 container mx-auto px-4"
            >
                <Card className="bg-muted/50">
                    <CardContent className="p-8 md:p-12 text-center">
                        <h2 className="text-3xl font-bold mb-6">Fresh Food, Without the Fuss</h2>
                        <div className="grid md:grid-cols-2 gap-8 text-left">
                            <div>
                                <h3 className="text-xl font-semibold mb-2">Always on Your Schedule</h3>
                                <p className="text-muted-foreground">
                                    Set your preferred delivery day and time, and we'll handle the rest. Your custom box arrives like clockwork—pause, skip, or adjust anytime.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-2">Set It and Forget It</h3>
                                <p className="text-muted-foreground">
                                    Never worry about placing an order again. Your favorite meals and juices arrive automatically, so you can focus on eating well.
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            {/* ============ CUSTOMER CONTROL ============ */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mb-20 container mx-auto px-4 text-center"
            >
                <h2 className="text-3xl font-bold mb-6">You're Always in Charge</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-white rounded-xl p-6 shadow-sm border">
                        <X className="h-10 w-10 text-primary mx-auto mb-4" />
                        <h4 className="font-semibold mb-2">No Commitments</h4>
                        <p className="text-sm text-muted-foreground">Cancel anytime directly from your account—no fees, no questions.</p>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-sm border">
                        <Pause className="h-10 w-10 text-primary mx-auto mb-4" />
                        <h4 className="font-semibold mb-2">Total Flexibility</h4>
                        <p className="text-sm text-muted-foreground">Pause or skip any delivery before the Saturday 8:00 PM cutoff. Your subscription waits until you're ready.</p>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-sm border">
                        <Repeat className="h-10 w-10 text-primary mx-auto mb-4" />
                        <h4 className="font-semibold mb-2">Change Meals in Seconds</h4>
                        <p className="text-sm text-muted-foreground">Log in to your customer dashboard and swap menu items for the upcoming delivery. It's as easy as editing a playlist.</p>
                    </div>
                </div>
            </motion.div>

            {/* ============ FAQ SECTION ============ */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mb-20 container mx-auto px-4"
            >
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-center">Frequently Asked Questions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Accordion type="single" collapsible className="space-y-4">
                            {faqs.map((faq, index) => (
                                <motion.div
                                    key={faq.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <AccordionItem
                                        value={faq.id}
                                        className="border rounded-lg px-6"
                                    >
                                        <AccordionTrigger className="text-left hover:no-underline group">
                                            <motion.span
                                                whileHover={{ x: 5 }}
                                                className="font-semibold group-hover:text-primary transition-colors"
                                            >
                                                {faq.question}
                                            </motion.span>
                                        </AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground leading-relaxed">
                                            {faq.answer}
                                        </AccordionContent>
                                    </AccordionItem>
                                </motion.div>
                            ))}
                        </Accordion>
                    </CardContent>
                </Card>
            </motion.div>

            {/* ============ LOWER CTA ============ */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6 }}
            >
                <Card className="bg-primary rounded-none text-primary-foreground border-none overflow-hidden">
                    <motion.div
                        whileHover={{ scale: 1.01 }}
                        transition={{ duration: 0.3 }}
                    >
                        <CardContent className="p-8 md:p-16 text-center">
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                            >
                                <h2 className="text-3xl font-bold mb-4 text-balance">
                                    Prefer to Try Us First?
                                </h2>
                            </motion.div>

                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="text-lg text-primary-foreground/90 mb-6 max-w-2xl mx-auto"
                            >
                                No subscription needed. Order a one‑time box and taste the difference. You can always subscribe later at checkout.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3, type: "spring" }}
                            >
                                <Button size="lg" variant="secondary" asChild>
                                    <Link href="/menu">Order One‑Time Meals</Link>
                                </Button>
                            </motion.div>
                        </CardContent>
                    </motion.div>
                </Card>
            </motion.div>
        </motion.div>
    )
}

export default Subscriptions