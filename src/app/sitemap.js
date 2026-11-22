import { isMenuProduct } from "@/lib/special-orders"

// The address Google should use (ashscravings.com sends people here)
const SITE = "https://www.ashscravings.com"

// Pages people can find on Google. Cart, checkout, account and login pages are left out on purpose.
const PAGES = [
    { path: "/", priority: 1, changeFrequency: "weekly" },
    { path: "/menu", priority: 0.9, changeFrequency: "weekly" },
    { path: "/custom-cakes", priority: 0.9, changeFrequency: "monthly" },
    { path: "/christmas", priority: 0.8, changeFrequency: "weekly" },
    { path: "/events", priority: 0.8, changeFrequency: "monthly" },
    { path: "/bundles", priority: 0.7, changeFrequency: "weekly" },
    { path: "/subscriptions", priority: 0.7, changeFrequency: "monthly" },
    { path: "/about", priority: 0.7, changeFrequency: "monthly" },
    { path: "/faq", priority: 0.6, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.6, changeFrequency: "yearly" },
    { path: "/privacy", priority: 0.2, changeFrequency: "yearly" },
    { path: "/terms", priority: 0.2, changeFrequency: "yearly" },
]

// Rebuilt at most once a day, so new menu items show up on their own
export const revalidate = 86400

// Each meal on the menu has its own page (/menu/<name>)
async function menuItems() {
    const api = process.env.NEXT_PUBLIC_BACKEND_URL
    if (!api) return []
    try {
        const res = await fetch(`${api}/products?order_type=meal_prep&limit=100`, {
            next: { revalidate },
            signal: AbortSignal.timeout(30000), // the server may need a moment to wake up
        })
        if (!res.ok) return []
        const data = await res.json()
        const products = Array.isArray(data) ? data : data.products || []
        return products
            .filter((p) => p.slug && p.is_active !== false && isMenuProduct(p))
            .map((p) => ({
                url: `${SITE}/menu/${p.slug}`,
                lastModified: p.updatedAt || p.updated_at || undefined,
                changeFrequency: "weekly",
                priority: 0.6,
            }))
    } catch {
        return [] // the main pages still go out if the menu can't be reached
    }
}

export default async function sitemap() {
    const now = new Date()
    const pages = PAGES.map((p) => ({
        url: `${SITE}${p.path === "/" ? "" : p.path}`,
        lastModified: now,
        changeFrequency: p.changeFrequency,
        priority: p.priority,
    }))
    return [...pages, ...(await menuItems())]
}
