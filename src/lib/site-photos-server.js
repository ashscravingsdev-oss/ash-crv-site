// The photos Ash picked in the admin, fetched on the server for the pages that
// show them. If the order server is asleep, slow or erroring:
//   - while the site is being built, use the built-in photos
//   - after that, fail the refresh, so Next keeps serving the last good page
//     (with Ash's photos) and tries again on the next visit
const WAIT_MS = 4000

const building = () => process.env.NEXT_PHASE === "phase-production-build"

export async function getSitePhotos() {
    const base = process.env.NEXT_PUBLIC_BACKEND_URL
    if (!base) return {}
    try {
        const res = await Promise.race([
            fetch(`${base}/site-photos`, { next: { revalidate: 60, tags: ["site-photos"] } }),
            new Promise((_, reject) => setTimeout(() => reject(new Error("The order server took too long")), WAIT_MS)),
        ])
        if (!res.ok) throw new Error(`The order server answered ${res.status}`)
        const data = await res.json()
        if (!data?.photos || typeof data.photos !== "object" || Array.isArray(data.photos)) throw new Error("Unexpected answer")
        return data.photos
    } catch (err) {
        if (building()) return {}
        throw err
    }
}
