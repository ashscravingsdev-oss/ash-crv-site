"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

// One calm line at the very top. Through the last Christmas pickup day it points
// to the mini cakes; after that it switches to the weekly order reminder.
const CHRISTMAS_LAST_DAY = "2026-12-23"

const AnnouncementBar = () => {
    const [christmas, setChristmas] = useState(true)
    useEffect(() => {
        const today = new Date().toLocaleDateString("en-CA", { timeZone: "America/Los_Angeles" })
        setChristmas(today <= CHRISTMAS_LAST_DAY)
    }, [])

    return (
        <div className="bg-brand-sand text-brand-heading border-b border-border">
            <div className="container mx-auto px-4 py-2 text-center font-serif italic text-[15px] sm:text-base">
                {christmas ? (
                    <Link href="/christmas" className="hover:underline underline-offset-4">
                        <span aria-hidden="true" className="not-italic text-brand-matcha text-[0.6em] align-[0.15em] mr-1.5">■</span>
                        Christmas mini cakes are booking now →
                    </Link>
                ) : (
                    <span>
                        <span aria-hidden="true" className="not-italic text-brand-matcha text-[0.6em] align-[0.15em] mr-1.5">■</span>
                        Order by Sunday for Tuesday delivery or pickup
                    </span>
                )}
            </div>
        </div>
    )
}

export default AnnouncementBar
