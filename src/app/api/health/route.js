// Checked every few minutes by StatusCake (it won't watch onrender.com addresses
// directly). Each check pokes the order server, which keeps it from falling
// asleep, and answers 503 if the server is down so StatusCake can email Ash.

export const dynamic = "force-dynamic" // never cached: every check must reach the server
export const maxDuration = 30 // a sleeping server takes ~20 seconds to wake

export async function GET() {
    const api = process.env.NEXT_PUBLIC_BACKEND_URL || ""
    const server = api.replace(/\/api\/?$/, "") // the server's front door
    const started = Date.now()
    try {
        const res = await fetch(`${server}/`, { cache: "no-store", signal: AbortSignal.timeout(25000) })
        const body = { website: "ok", server: res.ok ? "ok" : `error ${res.status}`, ms: Date.now() - started }
        return Response.json(body, { status: res.ok ? 200 : 503, headers: { "Cache-Control": "no-store" } })
    } catch {
        return Response.json(
            { website: "ok", server: "not responding", ms: Date.now() - started },
            { status: 503, headers: { "Cache-Control": "no-store" } }
        )
    }
}
