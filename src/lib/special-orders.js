// Desserts, cakes and custom items ("special orders"): picked for a date, 50% deposit
// today, the rest charged on the delivery date. They check out separately from
// weekly meal prep.

export const DEPOSIT_RATE = 0.5
export const DESSERT_MIN_DOZENS = 2
export const DEFAULT_LEAD_DAYS = 10

// The order Ash lists her desserts in
export const DESSERT_ORDER = [
    "Dessert Cups",
    "Cookies",
    "Cheesecakes",
    "Cupcakes",
    "Mini Cupcakes",
    "Brownies",
    "Chocolate Strawberries",
]

// Christmas mini cakes are ready on two days in December. Each day stops taking
// orders at the end of its "closes" day (Pacific time). Checkout offers only the
// days still open; once both close, the Christmas page says orders are closed.
// The order server checks the same days (utils/special-orders.js in the backend).
export const CHRISTMAS_DAYS = [
    { date: "2026-12-19", closes: "2026-12-12" },
    { date: "2026-12-23", closes: "2026-12-16" },
]
export const CHRISTMAS_WINDOW = { from: "2026-12-01", to: "2026-12-24" }
export const isChristmasItem = (item) => /^christmas-mini-cake/.test(String(item?.product?.slug || ""))
export const cartHasChristmas = (items = []) => items.some(isChristmasItem)

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

// Christmas days still taking orders today
export const christmasOpenDays = () => {
    const today = dateFromToday(0)
    return CHRISTMAS_DAYS.filter((d) => today <= d.closes)
}

// "Dec 12"
export const shortDate = (dateStr) =>
    new Date(`${String(dateStr).slice(0, 10)}T12:00:00Z`).toLocaleDateString("en-US", {
        month: "short", day: "numeric", timeZone: "UTC",
    })

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
const SUFFIXES = ["Mini Cheesecakes", "Cheesecakes", "Cheesecake", "Mini Cupcakes", "Cupcakes", "Dessert Cups", "Chocolate Strawberries", "Strawberries", "Cookies"]
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

// Cheesecakes are 8" and sold whole, one at a time; everything else is by the dozen
export const soldWhole = (groupName) => /cheesecake/i.test(String(groupName || ""))

// A little add-on sold with a dessert, like whipped cream with the cheesecakes:
// sold one at a time, under $25, and not named like its category
// ("Cheesecakes" → "cheesecak"). The order server uses the same rule for its daily count.
const ADDON_MAX_PRICE = 25
const stemOf = (category) => String(category || "").trim().split(/\s+/).pop().toLowerCase().replace(/(ies|es|s)$/, "")
export const isExtra = (p, categoryName = p?.category?.name) => {
    const stem = stemOf(categoryName)
    return (
        !!stem &&
        !(parseInt(p?.min_quantity, 10) > 1) &&
        Number(p?.price) < ADDON_MAX_PRICE &&
        !String(p?.name || "").toLowerCase().includes(stem)
    )
}

const isDessertCategory = (name) => DESSERT_ORDER.some((d) => d.toLowerCase() === String(name || "").toLowerCase())
const byAdded = (a, b) =>
    String(a.createdAt || a.created_at || "").localeCompare(String(b.createdAt || b.created_at || "")) ||
    a.name.localeCompare(b.name)

// Group the dessert products by type, in Ash's order (new types she adds go last).
// Each group: { name, items: the flavors, extras: add-ons like whipped cream }
export const groupDesserts = (products = []) => {
    const groups = new Map()
    for (const p of products) {
        if (!p?.is_active || p.visibility === "private") continue
        // Christmas mini cakes have their own page
        if (/^christmas-mini-cake/.test(String(p.slug || ""))) continue
        const name = p.category?.name || "Desserts"
        // By-the-dozen desserts, plus everything in a dessert category (cheesecakes are sold whole)
        if (!(parseInt(p.min_quantity, 10) > 1) && !isDessertCategory(name)) continue
        if (!groups.has(name)) groups.set(name, [])
        groups.get(name).push(p)
    }
    const rank = (n) => {
        const i = DESSERT_ORDER.findIndex((d) => d.toLowerCase() === n.toLowerCase())
        return i === -1 ? 99 : i
    }
    return [...groups.entries()]
        .sort((a, b) => rank(a[0]) - rank(b[0]))
        .map(([name, all]) => ({
            name,
            // Keep the order Ash added them in (her flavor list order)
            items: all.filter((p) => !isExtra(p, name)).sort(byAdded),
            extras: all.filter((p) => isExtra(p, name)).sort(byAdded),
        }))
        // Add-ons only show next to a dessert that's on the menu
        .filter((g) => g.items.length > 0)
}

// What a cart uses up of Ash's day (same counting as the order server):
// dozens of desserts (a whole cheesecake counts as one; add-ons don't count) and
// Christmas mini cakes (the 2-pack counts as two)
export const cartDayUnits = (items = []) => {
    let desserts = 0
    let christmas = 0
    let whole = false
    for (const i of items) {
        const p = i?.product
        const qty = Number(i?.quantity) || 0
        if (!p || i.bundle_id || p.order_type !== "special_order" || p.visibility === "private") continue
        if (/^christmas-mini-cake/.test(String(p.slug || ""))) christmas += qty * (/set-of-2/.test(p.slug) ? 2 : 1)
        else if (!isExtra(p)) {
            desserts += qty
            if (soldWhole(p.category?.name)) whole = true
        }
    }
    // whole: the cart has cheesecakes (counted one each, not by the dozen)
    return { desserts, christmas, whole }
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
