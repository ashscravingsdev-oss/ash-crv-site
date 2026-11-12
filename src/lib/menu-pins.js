// Best sellers pinned to the top of the menu, in this order, with a "#1 Best Seller" tag on the first one.
// Matched by product name (capital letters and punctuation don't matter).
// To pin something else, change or add a name here.
export const BEST_SELLERS = ["Heart Beet"];

const clean = (s = "") => String(s).toLowerCase().replace(/[^a-z0-9]/g, "");

export function bestSellerRank(product) {
    const name = clean(product?.name);
    const slug = clean(product?.slug);
    const i = BEST_SELLERS.findIndex((n) => {
        const c = clean(n);
        return c && (name.includes(c) || slug.includes(c));
    });
    return i === -1 ? Infinity : i;
}

export function bestSellerLabel(product) {
    const rank = bestSellerRank(product);
    if (rank === Infinity) return null;
    return rank === 0 ? "#1 Best Seller" : "Best Seller";
}
