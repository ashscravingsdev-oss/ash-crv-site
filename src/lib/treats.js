// "Sweet Cravings": treats that stay on the menu every week (cookies, protein
// balls and so on). They're the products in the category with this name, which
// is made in the admin like any other category. They show in one place only:
// their own section at the end of the menu (and its tab), never mixed in with
// the meals, the home page picks or the "You might also like" rows.

export const TREATS = "Sweet Cravings"

export const isTreat = (product) =>
    String(product?.category?.name || "").trim().toLowerCase() === TREATS.toLowerCase()

// In the order they were added, so the section doesn't reshuffle
export const sortTreats = (products = []) =>
    [...products].sort((a, b) =>
        String(a.createdAt || a.created_at || "").localeCompare(String(b.createdAt || b.created_at || "")) ||
        String(a.name || "").localeCompare(String(b.name || "")))
