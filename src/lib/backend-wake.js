// The backend runs on Render's free plan, which puts it to sleep after 15 quiet
// minutes and takes about a minute to wake back up. While it's waking, Render
// answers with a "loading" page (503) instead of the menu. Two small things
// make that invisible to customers:
//
// 1. As soon as anyone opens any page, knock on the backend so it starts
//    waking up while they look around.
// 2. If a read (GET) hits the backend while it's still waking, quietly try
//    again for up to ~90 seconds instead of showing an error. Orders and other
//    changes (POST/PUT/DELETE) are never retried, so nothing is sent twice.

const BACKEND = (process.env.NEXT_PUBLIC_BACKEND_URL || "").replace(/\/+$/, "")
const BACKEND_ROOT = BACKEND.replace(/\/api$/, "")
const RETRY_DELAYS_MS = [2000, 3000, 5000, 5000, 10000, 10000, 15000, 15000, 15000, 15000]

// Lets the menu say "waking up the kitchen" while it waits
let waking = false
const listeners = new Set()
const setWaking = (value) => {
    if (waking === value) return
    waking = value
    listeners.forEach((fn) => fn(value))
}
export const isBackendWaking = () => waking
export const onBackendWaking = (fn) => {
    listeners.add(fn)
    return () => listeners.delete(fn)
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const isBackendUrl = (input) => {
    try {
        const url = typeof input === "string" ? input : input instanceof URL ? input.href : input?.url
        return !!BACKEND && typeof url === "string" && url.startsWith(BACKEND_ROOT)
    } catch {
        return false
    }
}

function install() {
    if (typeof window === "undefined" || !BACKEND || window.__ashBackendWake) return
    window.__ashBackendWake = true

    const realFetch = window.fetch.bind(window)

    window.fetch = async (input, init = {}) => {
        const method = String(init?.method || (typeof input === "object" && input?.method) || "GET").toUpperCase()
        if (!isBackendUrl(input) || (method !== "GET" && method !== "HEAD")) {
            return realFetch(input, init)
        }
        for (let attempt = 0; ; attempt++) {
            try {
                const res = await realFetch(input, init)
                if (res.status !== 503 || attempt >= RETRY_DELAYS_MS.length) {
                    setWaking(false)
                    return res
                }
            } catch (err) {
                // Render's waking page has no CORS headers, so the browser reports
                // it as a network error; an aborted request should stay aborted.
                if (err?.name === "AbortError" || attempt >= RETRY_DELAYS_MS.length) {
                    setWaking(false)
                    throw err
                }
            }
            setWaking(true)
            await sleep(RETRY_DELAYS_MS[attempt])
        }
    }

    // Knock once per visit so it's awake by the time they open the menu
    try {
        if (!sessionStorage.getItem("ash-backend-knocked")) {
            sessionStorage.setItem("ash-backend-knocked", "1")
            window.fetch(`${BACKEND_ROOT}/`, { cache: "no-store" }).catch(() => {})
        }
    } catch {
        window.fetch(`${BACKEND_ROOT}/`, { cache: "no-store" }).catch(() => {})
    }
}

install()
