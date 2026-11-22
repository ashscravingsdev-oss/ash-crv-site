import { SitePhotosProvider } from "@/components/site-photos"
import { getSitePhotos } from "@/lib/site-photos-server"

/**
 * For pages with photos Ash can change (home, Cakes & Desserts, Subscriptions,
 * Events, About, Christmas): fetches her picks on the server so the page
 * never flashes the old photo. Those pages refresh at most once a minute.
 */
export default async function WithSitePhotos({ children }) {
    const photos = await getSitePhotos()
    return <SitePhotosProvider photos={photos}>{children}</SitePhotosProvider>
}
