// Desserts, cakes and custom items ("special orders"): picked for a date, 50% deposit
// today, the rest charged on the delivery date. They check out separately from
// weekly meal prep.

export const DEPOSIT_RATE = 0.5
export const FREE_DELIVERY_MILES = 15
export const DESSERT_MIN_DOZENS = 2
export const DEFAULT_LEAD_DAYS = 10

// The order Ash lists her desserts in
export const DESSERT_ORDER = [
    "Dessert Cups",
    "Cookies",
    "Cheesecakes",
    "Mini Cupcakes",
    "Brownies",
    "Chocolate Strawberries",
]

export const isSpecialProduct = (p) => p?.order_type === "special_order"
export const isSpecialItem = (item) => isSpecialProduct(item?.product)
export const cartIsSpecial = (items = []) => items.length > 0 && items.some(isSpecialItem)
export const cartHasDeposit = (items = []) => items.some((i) => i?.product?.payment_plan === "deposit")

export const leadDaysFor = (items = []) =>
    Math.max(0, ...items.map((i) => parseInt(i?.product?.lead_time_days, 10) || 0))

// 'YYYY-MM-DD' in the shop's time zone, `days` from today
export const dateFromToday = (days = 0) => {
    const today = new Intl.DateTimeFormat("en-CA", {
        timeZone: "America/Los_Angeles", year: "numeric", month: "2-digit", day: "2-digit",
    }).format(new Date())
    const d = new Date(`${today}T12:00:00Z`)
    d.setUTCDate(d.getUTCDate() + days)
    return d.toISOString().split("T")[0]
}

export const weekdayOf = (dateStr) =>
    new Date(`${dateStr}T12:00:00Z`).toLocaleDateString("en-US", { weekday: "long", timeZone: "UTC" }).toLowerCase()

export const prettyDate = (dateStr) =>
    dateStr
        ? new Date(`${String(dateStr).slice(0, 10)}T12:00:00Z`).toLocaleDateString("en-US", {
              weekday: "long", month: "long", day: "numeric", timeZone: "UTC",
          })
        : ""

export const money = (n) => {
    const v = Math.round(Number(n || 0) * 100) / 100
    return `$${v % 1 === 0 ? v : v.toFixed(2)}`
}

// "Red Velvet Cookies" → "Red Velvet" for the flavor chips
const SUFFIXES = ["Mini Cheesecakes", "Cheesecakes", "Mini Cupcakes", "Dessert Cups", "Chocolate Strawberries", "Strawberries", "Cookies"]
export const flavorLabel = (product) => {
    if (product?.flavor) return product.flavor
    const name = String(product?.name || "")
    if (/brownie|bar/i.test(product?.category?.name || "")) return name
    for (const s of SUFFIXES) {
        if (name.toLowerCase().endsWith(` ${s.toLowerCase()}`)) {
            const short = name.slice(0, -(s.length + 1)).trim()
            if (short) return short
        }
    }
    return name
}

// Group the dessert products by type, in Ash's order (new types she adds go last)
export const groupDesserts = (products = []) => {
    const groups = new Map()
    for (const p of products) {
        if (!p?.is_active) continue
        // Only by-the-dozen desserts here; mini cakes and other single items have their own section
        if (!(parseInt(p.min_quantity, 10) > 1)) continue
        const name = p.category?.name || "Desserts"
        if (!groups.has(name)) groups.set(name, [])
        groups.get(name).push(p)
    }
    const rank = (n) => {
        const i = DESSERT_ORDER.findIndex((d) => d.toLowerCase() === n.toLowerCase())
        return i === -1 ? 99 : i
    }
    return [...groups.entries()]
        .sort((a, b) => rank(a[0]) - rank(b[0]))
        .map(([name, items]) => ({
            name,
            // Keep the order Ash added them in (her flavor list order)
            items: items.sort((a, b) =>
                String(a.createdAt || a.created_at || "").localeCompare(String(b.createdAt || b.created_at || "")) ||
                a.name.localeCompare(b.name)),
        }))
}

export const priceRange = (items = []) => {
    const prices = items.map((p) => Number(p.price)).filter((n) => n > 0)
    if (!prices.length) return ""
    const lo = Math.min(...prices)
    const hi = Math.max(...prices)
    return lo === hi ? money(lo) : `${money(lo)}–${money(hi)}`
}

export const dessertSlug = (name) =>
    String(name).toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")

// Weekly menu items only: never a dessert flavor or someone's private custom item.
// (Also guards against an older backend that ignores the order_type filter.)
export const isMenuProduct = (p) =>
    !!p &&
    p.order_type !== "special_order" &&
    p.visibility !== "private" &&
    !DESSERT_ORDER.some((d) => d.toLowerCase() === String(p.category?.name || "").toLowerCase())
