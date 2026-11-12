"use client"

import { useEffect, useState } from "react"
import { isBackendWaking, onBackendWaking } from "@/lib/backend-wake"

/** Shown only while the kitchen's server is waking up (the first visit after a quiet spell). */
const WakingNote = ({ className = "" }) => {
    const [waking, setWaking] = useState(false)

    useEffect(() => {
        setWaking(isBackendWaking())
        return onBackendWaking(setWaking)
    }, [])

    if (!waking) return null
    return (
        <p role="status" className={`text-center text-sm text-muted-foreground ${className}`}>
            Warming up the kitchen… the first visit can take up to a minute.
        </p>
    )
}

export default WakingNote
