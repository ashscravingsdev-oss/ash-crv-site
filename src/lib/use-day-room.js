"use client"

import { useEffect, useState } from "react"

/**
 * What's left on each day for desserts and Christmas mini cakes, from the order
 * server. room(date) → { desserts, christmas } still open that day, or null
 * while loading (or if the server can't say). The server checks again when the
 * order is placed, so this only helps people pick a day that has room.
 */
export function useDayRoom() {
    const [data, setData] = useState(null)

    useEffect(() => {
        let alive = true
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/delivery/dessert-days`)
            .then((r) => (r.ok ? r.json() : null))
            .then((d) => alive && d?.limits && setData(d))
            .catch(() => {})
        return () => {
            alive = false
        }
    }, [])

    const room = (date) => {
        if (!data || !date) return null
        const day = data.days?.[String(date).slice(0, 10)]
        return {
            desserts: day ? day.desserts_left : data.limits.desserts,
            christmas: day ? day.christmas_left : data.limits.christmas,
        }
    }
    return { room }
}
