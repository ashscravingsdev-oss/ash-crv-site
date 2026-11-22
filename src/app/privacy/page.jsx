import Policy from "@/components/policy"
import SEO from "@/components/seo"

const UPDATED = "November 17, 2026"

const intro = [
    "I only collect what I need to take your order, get it to you and answer your messages. I don't sell your information, and I don't run ads that follow you around.",
    "Ash's Cravings is me, Ash. When this page says \"I\", \"me\" or \"my\", it means Ash's Cravings.",
]

const sections = [
    {
        heading: "What I collect",
        blocks: [
            {
                list: [
                    ["When you order or make an account:", " your name, email, phone number, delivery address, what you ordered, and anything you tell me, like an allergy or where to leave your order."],
                    ["When you pay:", " your card details go straight to Square, my payment processor. I never see or store your full card number. For subscriptions and deposits, Square keeps your card on file so later charges can go through."],
                    ["When you send me a message:", " what you write and how to reach you."],
                    ["When you visit:", " the basic technical details every website receives, like your IP address and browser type, and simple counts of which pages get visited. The visit counts don't use cookies and don't identify you."],
                ],
            },
        ],
    },
    {
        heading: "How I use it",
        blocks: [
            {
                list: [
                    "To make, deliver and bill your order",
                    "To email or text you about your order: receipts, your pickup address, a reminder to pick your meals, or a question",
                    "To answer your messages",
                    "To keep the records a business has to keep, like sales and taxes",
                    "To keep the site working and safe",
                ],
            },
            { p: "I'll only send you news and offers if you ask for them, and you can stop them anytime." },
        ],
    },
    {
        heading: "Who else sees it",
        blocks: [
            { p: "Only the services I use to run the business, and only so they can do their job:" },
            {
                list: [
                    "Square, to process payments",
                    "The companies that host my website and its database",
                    "The services that send order emails and alerts, and deliver your form messages to my inbox",
                    "A mapping service that looks up your address and works out the delivery fee",
                ],
            },
            { p: "I'll also share information if the law requires it. I never sell or rent your information to anyone." },
        ],
    },
    {
        heading: "Cookies",
        blocks: [
            { p: "My site uses a few small cookies and your browser's storage to keep you signed in and remember your cart. Square's payment form may set its own cookies to keep payments secure. There are no advertising cookies." },
        ],
    },
    {
        heading: "Do Not Track",
        blocks: [
            { p: "My site doesn't track you across other websites, so it works the same whether or not your browser sends a \"Do Not Track\" signal." },
        ],
    },
    {
        heading: "How long I keep it",
        blocks: [
            { p: "I keep your account and order history while you have an account, and for as long as I need them for my business and tax records. If you ask me to delete your account, I'll delete what I'm not required to keep." },
        ],
    },
    {
        heading: "Your choices",
        blocks: [
            {
                list: [
                    ["See, fix or delete your information:", " email me and I'll take care of it."],
                    ["Update your details:", " you can change them in your account."],
                    ["Stop news and offers:", " just reply to any of my emails or tell me. I'll still contact you about orders you place."],
                ],
            },
        ],
    },
    {
        heading: "Keeping it safe",
        blocks: [
            { p: "The site uses a secure connection, passwords are stored in scrambled form, and card payments are handled by Square. No website can promise perfect security. If something ever happens that affects your information, I'll tell you." },
        ],
    },
    {
        heading: "Kids",
        blocks: [{ p: "My site is for adults. I don't knowingly collect information from children under 13." }],
    },
    {
        heading: "Changes",
        blocks: [{ p: "If I change this policy, I'll post the new version here with a new date." }],
    },
    {
        heading: "Questions",
        blocks: [{ p: "Email Ashscravings@gmail.com or call 951-224-7740." }],
    },
]

export default function PrivacyPage() {
    return (
        <>
            <SEO
                title="Privacy Policy - Ash's Cravings"
                description="What Ash's Cravings collects when you order, how it's used, and who else sees it."
                keywords={["privacy policy", "Ash's Cravings"]}
                url="/privacy"
            />
            <Policy title="Privacy Policy" updated={UPDATED} intro={intro} sections={sections} />
        </>
    )
}
