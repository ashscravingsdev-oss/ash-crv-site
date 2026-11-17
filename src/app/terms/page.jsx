import Policy from "@/components/policy"
import SEO from "@/components/seo"

const UPDATED = "November 17, 2026"

const intro = [
    "Ash's Cravings is me, Ash. I make meal prep, cakes, desserts and food for events in Eastvale, CA. When this page says \"I\", \"me\" or \"my\", it means Ash's Cravings.",
    "By ordering from me or using my website, you agree to these terms. If I change them, I'll post the new version here with a new date.",
]

const sections = [
    {
        heading: "1. Your account",
        blocks: [
            {
                list: [
                    "Give me correct details (name, phone, address) so I can reach you and find you.",
                    "Keep your password private, and tell me if you think someone else has used your account.",
                    "You must be 18 or older to order.",
                    "I can refuse or cancel an order, or close an account, at my discretion. For example, if an item runs out, a price was listed wrong, or a payment looks like fraud. If I cancel an order you've paid for, I'll refund it.",
                ],
            },
        ],
    },
    {
        heading: "2. Ordering and paying",
        blocks: [
            {
                list: [
                    "Prices are in US dollars and can change. You pay the price shown when you order, plus any delivery fee and tax shown at checkout.",
                    "On the website you pay by card, through Square. For cakes, desserts, events and private chef nights, I also take Zelle or a payment link.",
                    "Meal prep is made to order for Tuesdays. Order before the Sunday cutoff shown at checkout to get your meals that Tuesday.",
                    "I may change or stop offering any part of what I sell at any time.",
                ],
            },
        ],
    },
    {
        heading: "3. Deposits",
        blocks: [
            {
                list: [
                    "Cakes, desserts, events and private chef nights need a 50% deposit to hold your date.",
                    "For cakes and desserts ordered on the site, the rest is charged automatically to the same card on your date.",
                    "Deposits aren't refundable, because I turn other orders away to hold your date. If you cancel at least 7 days before your date, I'll move your deposit to a new date one time.",
                ],
            },
        ],
    },
    {
        heading: "4. Subscriptions",
        blocks: [
            {
                list: [
                    "A subscription repeats your bundle every week or every 2 weeks until you pause or stop it.",
                    "Your card on file is charged automatically for each order, after the Sunday cutoff for that week.",
                    "To skip a week or pause, do it from your account before the Sunday cutoff and you won't be charged for that week.",
                    "Anything else you add when you subscribe, like a treat or a single meal, comes with your first order only.",
                    "If I change what a subscription costs or how it works, I'll let you know at least 30 days ahead.",
                ],
            },
        ],
    },
    {
        heading: "5. Delivery and pickup",
        blocks: [
            {
                list: [
                    "I deliver within my delivery area. The fee depends on your address, and you'll see it at checkout before you pay.",
                    "Pickup is free and is in Eastvale. I'll text you the address after you order.",
                    "Delivery windows are my best estimate. Traffic and weather can change them.",
                    "Please give me the right address and be there for your delivery, or tell me where to leave it. I'm not responsible for an order left where you asked, or for an order that goes wrong because the address was wrong.",
                    "If you miss your delivery or pickup, message me within 24 hours. Whether I can refund or redeliver is up to me, and it may cost extra.",
                ],
            },
        ],
    },
    {
        heading: "6. Changes, cancellations and refunds",
        blocks: [
            {
                list: [
                    ["Meal prep:", " you can change or cancel before the Sunday cutoff. After that I've already shopped for your meals, so that week can't be refunded."],
                    ["Cakes, desserts, events and private chef nights:", " see Deposits above."],
                    ["Something wrong with your order?", " Tell me within 24 hours of getting it. I'll look into it and may offer a refund, a credit or a replacement."],
                    "Approved refunds go back to your original payment method, usually within 5 to 10 business days.",
                ],
            },
        ],
    },
    {
        heading: "7. Food safety and allergies",
        blocks: [
            {
                list: [
                    "Keep your food in the fridge and enjoy meals within 3 to 4 days. Once your order is delivered or picked up, storing it safely is up to you.",
                    "Everything is made in my kitchen, which handles common allergens including nuts, dairy, eggs, soy, wheat and shellfish. I can't promise any item is free of traces of them.",
                    "Read the ingredients and allergen notes before you order. If you have an allergy, tell me when you order. If it's severe, message me first so we can talk it through.",
                ],
            },
        ],
    },
    {
        heading: "8. My content",
        blocks: [
            { p: "The photos, recipes, text and logo on my site belong to Ash's Cravings. Please don't copy or reuse them without asking me first." },
        ],
    },
    {
        heading: "9. Limitation of liability",
        blocks: [
            { p: "To the fullest extent permitted by law, Ash's Cravings is not liable for any indirect, incidental, special, consequential or punitive damages arising out of or relating to your use of my services, including:" },
            {
                list: [
                    "Loss of profits, revenue or business opportunities",
                    "Food allergies or adverse reactions",
                    "Foodborne illness or food poisoning",
                    "Delivery delays or missed deliveries",
                    "Loss or spoilage of food products",
                ],
            },
            { p: "My total liability for any claim arising out of or relating to these terms or my services will not exceed the amount you paid for the specific order the claim is about." },
        ],
    },
    {
        heading: "10. Indemnification",
        blocks: [
            { p: "You agree to indemnify, defend and hold harmless Ash's Cravings, its affiliates, officers, directors, employees and agents from any claims, liabilities, damages, losses and expenses arising out of or related to your use of my services, your violation of these terms, or your violation of any rights of another party." },
        ],
    },
    {
        heading: "11. Disputes",
        blocks: [
            {
                list: [
                    ["Talk to me first.", " If you have a problem, please message me so we can try to work it out."],
                    ["Binding arbitration.", " Any dispute that can't be resolved informally will be resolved through binding arbitration under the rules of the American Arbitration Association. The arbitration will take place in California, and judgment on the award may be entered in any court having jurisdiction."],
                    ["Class action waiver.", " Any arbitration or proceeding is limited to the dispute between you and Ash's Cravings individually. You waive any right to take part in a class action lawsuit or class-wide arbitration."],
                ],
            },
        ],
    },
    {
        heading: "12. Governing law",
        blocks: [
            { p: "These terms are governed by the laws of California, without regard to its conflict of law provisions. Any legal action relating to your use of my services must be brought in state or federal court in California." },
        ],
    },
    {
        heading: "13. If part of these terms doesn't hold up",
        blocks: [
            { p: "If any part of these terms is found to be unenforceable, that part will be limited or removed to the smallest extent needed, and the rest stays in effect." },
        ],
    },
    {
        heading: "14. Contact",
        blocks: [{ p: "Email Ashscravings@gmail.com or call 951-224-7740. Serving Eastvale, CA." }],
    },
]

export default function TermsPage() {
    return (
        <>
            <SEO
                title="Terms of Service - Ash's Cravings"
                description="The terms for ordering from Ash's Cravings: orders, deposits, subscriptions, delivery and pickup, cancellations and refunds."
                keywords={["terms of service", "Ash's Cravings"]}
                url="/terms"
            />
            <Policy title="Terms of Service" updated={UPDATED} intro={intro} sections={sections} />
        </>
    )
}
