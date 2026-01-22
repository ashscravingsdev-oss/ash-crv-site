"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Calendar, Pause, X, Sparkles } from "lucide-react"
import Link from "next/link"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import SubscriptionsPlans from './subscriptions-plans'
import SubscriptionsBenefits from './subscriptions-benefits'
import { motion } from "framer-motion"
import { fadeUp, fadeIn, scaleUp } from "@/lib/animations"
const plans = [
    {
        id: "weekly",
        name: "Weekly Plan",
        description: "Perfect for trying us out",
        price: 79.99,
        pricePerMeal: 11.43,
        interval: "week",
        meals: 7,
        popular: false,
        features: [
            "7 meals per week",
            "Choose from full menu",
            "Free delivery",
            "Skip or pause anytime",
            "Change meals weekly",
            "Cancel anytime",
        ],
    },
    {
        id: "biweekly",
        name: "Bi-Weekly Plan",
        description: "Most popular choice",
        price: 149.99,
        pricePerMeal: 10.71,
        interval: "2 weeks",
        meals: 14,
        popular: true,
        features: [
            "14 meals per 2 weeks",
            "Priority menu access",
            "Free delivery",
            "Skip or pause anytime",
            "Flexible scheduling",
            "5% discount applied",
            "Cancel anytime",
        ],
    },
    {
        id: "monthly",
        name: "Monthly Plan",
        description: "Best value for committed users",
        price: 279.99,
        pricePerMeal: 9.99,
        interval: "month",
        meals: 28,
        popular: false,
        features: [
            "28 meals per month",
            "VIP menu access",
            "Free priority delivery",
            "Skip or pause anytime",
            "Personalized recommendations",
            "10% discount applied",
            "Exclusive member perks",
            "Cancel anytime",
        ],
    },
]

const benefits = [
    {
        title: "Flexible Scheduling",
        description: "Choose your delivery days and times. We deliver Monday-Tuesday, 10 AM - 7 PM.",
        icon: Calendar,
    },
    {
        title: "Pause Anytime",
        description: "Going on vacation? Pause your subscription and resume whenever you're ready.",
        icon: Pause,
    },
    {
        title: "No Commitment",
        description: "Cancel your subscription at any time with no hidden fees or penalties.",
        icon: X,
    },
]
const faqs = [
    {
        id: "change-plan",
        question: "Can I change my subscription plan?",
        answer: "Yes! You can upgrade or downgrade your plan at any time. Changes will take effect on your next billing cycle."
    },
    {
        id: "skip-week",
        question: "What if I need to skip a week?",
        answer: "No problem! You can skip any delivery up to 5 days before your scheduled delivery date through your account dashboard."
    },
    {
        id: "cancel",
        question: "How do I cancel my subscription?",
        answer: "You can cancel anytime from your account settings. There are no cancellation fees or penalties."
    },
    {
        id: "customize-meals",
        question: "Can I customize my meals each week?",
        answer: "Before each delivery, you'll be able to select exactly which meals you want from our full menu."
    },
    {
        id: "delivery-days",
        question: "What are the delivery days and times?",
        answer: "We deliver Monday through Tuesday, between 10 AM and 7 PM. You can choose your preferred delivery window in your account settings."
    },
    {
        id: "payment-methods",
        question: "What payment methods do you accept?",
        answer: "We accept all major credit cards (Visa, MasterCard, American Express), Apple Pay, and Google Pay."
    }
]
const Subscriptions = () => {

    return (
        <motion.div
            initial="initial"
            animate="animate"
            variants={fadeIn}
            className="pt-8"
        >
            {/* Header */}
            <motion.div
                variants={fadeUp}
                className="text-center mb-12 container mx-auto px-4"
            >
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <Badge className="mb-4">Save up to 10%</Badge>
                </motion.div>

                <motion.h1
                    variants={fadeUp}
                    className="text-4xl md:text-5xl font-bold mb-4 text-balance"
                >
                    Choose Your Subscription Plan
                </motion.h1>

                <motion.p
                    variants={fadeUp}
                    className="text-lg text-muted-foreground max-w-2xl mx-auto"
                >
                    Subscribe and save on delicious, healthy meals delivered to your door. Flexible plans that fit your
                    lifestyle.
                </motion.p>
            </motion.div>

            {/* Pricing Cards */}
            <motion.div
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, amount: 0.2 }}
                variants={{
                    animate: {
                        transition: {
                            staggerChildren: 0.1
                        }
                    }
                }}
                className="grid md:grid-cols-3 gap-8 mb-16 md:mb-24 container mx-auto px-4"
            >
                {plans.map((plan, index) => (
                    <motion.div
                        key={plan.id}
                        variants={scaleUp}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -5 }}
                    >
                        <SubscriptionsPlans plan={plan} />
                    </motion.div>
                ))}
            </motion.div>

            {/* Benefits Section */}
            <motion.div
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                variants={fadeUp}
                className="mb-16 md:mb-24 container mx-auto px-4"
            >
                <motion.h2
                    variants={fadeUp}
                    className="text-3xl font-bold text-center mb-12"
                >
                    Subscription Benefits
                </motion.h2>

                <motion.div
                    className="grid md:grid-cols-3 gap-8"
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={{
                        animate: {
                            transition: {
                                staggerChildren: 0.1
                            }
                        }
                    }}
                >
                    {benefits.map((benefit, index) => (
                        <motion.div
                            key={benefit.title}
                            variants={fadeUp}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <SubscriptionsBenefits benefit={benefit} />
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>

            {/* FAQ Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mb-16 md:mb-24 container mx-auto px-4"
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

            {/* CTA */}
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
                                    Not ready to subscribe?
                                </h2>
                            </motion.div>

                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="text-lg text-primary-foreground/90 mb-6 max-w-2xl mx-auto"
                            >
                                Not ready to commit? Try our one-time meals and enjoy the same chef-crafted, nutritious dishes—no subscription required.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3, type: "spring" }}
                            >
                                <Button size="lg" variant="secondary" asChild>
                                    <Link href="/menu">Order One-Time Meals</Link>
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
