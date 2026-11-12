"use client"

import { useEffect, useMemo, useState } from "react"
import { groupDesserts } from "./special-orders"
import dessertMenu from "./dessert-menu.json"

// Ash's dessert list as printed on her price sheet. Used to show the list on the
// Cakes & Desserts page before the flavors are set up in the admin.
export const STATIC_DESSERTS = dessertMenu.desserts.map((d) => ({
    name: d.category,
    items: d.flavors.map(([flavor, price]) => ({
        id: null,
        flavor,
        name: d.suffix ? `${flavor} ${d.suffix}` : flavor,
        price,
        is_active: true,
    })),
}))

/** The dessert flavors from the admin, grouped by dessert in Ash's order. */
export function useDesserts() {
    const [products, setProducts] = useState(null)

    useEffect(() => {
        let alive = true
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products?order_type=special_order&limit=100`)
            .then((r) => (r.ok ? r.json() : { products: [] }))
            .then((data) => alive && setProducts(data.products || data.data || data.rows || []))
            .catch(() => alive && setProducts([]))
        return () => {
            alive = false
        }
    }, [])

    const groups = useMemo(
        // The old backend ignores order_type, so only keep real dessert products
        () => groupDesserts((products || []).filter((p) => p.order_type === "special_order")),
        [products]
    )
    return { loading: products === null, groups, live: groups.length > 0 }
}
