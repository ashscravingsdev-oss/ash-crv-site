import { SPOTS } from "@/lib/site-photos"

// The admin's Website photos page reads this to know every photo spot on the
// website and its built-in photos.
export const dynamic = "force-static"

export function GET() {
    return Response.json(
        { spots: SPOTS },
        { headers: { "Access-Control-Allow-Origin": "*", "Cache-Control": "public, max-age=300" } }
    )
}
