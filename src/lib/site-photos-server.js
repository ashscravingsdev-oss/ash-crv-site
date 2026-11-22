// The photos Ash picked in the admin, fetched on the server and kept for a
// minute, so pages don't wait for the order server and never flash the old
// photo. If the server is asleep or slow, pages show the built-in photos.
const WAIT_MS = 4000

export async function getSitePhotos() {
    const base = process.env.NEXT_PUBLIC_BACKEND_URL
    if (!base) return {}
    try {
        const res = await Promise.race([
            fetch(`${base}/site-photos`, { next: { revalidate: 60, tags: ["site-photos"] } }),
            new Promise((_, reject) => setTimeout(() => reject(new Error("timed out")), WAIT_MS)),
        ])
        if (!res.ok) return {}
        const data = await res.json()
        return data?.photos && typeof data.photos === "object" && !Array.isArray(data.photos) ? data.photos : {}
    } catch {
        return {}
    }
}
