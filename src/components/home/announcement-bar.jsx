"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

// The Christmas line shows through the last pickup day, then drops off on its own
const CHRISTMAS_LAST_DAY = "2026-12-23"

const AnnouncementBar = () => {
    const [christmas, setChristmas] = useState(true)
    useEffect(() => {
        const today = new Date().toLocaleDateString("en-CA", { timeZone: "America/Los_Angeles" })
        setChristmas(today <= CHRISTMAS_LAST_DAY)
    }, [])

    return (
        <div className="bg-brand-sand text-brand-heading border-b border-border">
            <div className="container mx-auto px-4 py-2 flex flex-wrap justify-center gap-x-8 gap-y-1 font-mono text-[11px] sm:text-xs uppercase tracking-[0.18em] text-center">
                {christmas && (
                    <Link href="/christmas" className="hover:underline underline-offset-4"><span className="text-brand-matcha">■</span> Christmas mini cakes now booking →</Link>
                )}
                <span className={christmas ? "hidden sm:inline" : ""}><span className="text-brand-matcha">■</span> Delivery &amp; pickup every Tuesday</span>
                <span className="hidden md:inline"><span className="text-brand-matcha">■</span> Meal prep orders close Sunday night</span>
            </div>
        </div>
    )
}

export default AnnouncementBar
