import { Navigation } from "@/components/nav"
import { Footer } from "@/components/footer"
import Product from "@/components/product/product"

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://www.ashscravings.com"
const API = process.env.NEXT_PUBLIC_BACKEND_URL

// Used when the item can't be looked up in time (the page itself still loads it)
const GENERAL = {
  title: "Menu - Ash's Cravings | Fresh Meal Prep in Eastvale, CA",
  description: "See this week's menu from Ash's Cravings: homemade meal prep, made from scratch in Eastvale, CA. Order by Sunday for delivery or pickup on Tuesday.",
}

// The item's name, description and photo, for search engines and for the preview
// that shows when someone shares the link. Kept for an hour.
async function menuItem(slug) {
  if (!API) return null
  try {
    const res = await fetch(`${API}/products/${encodeURIComponent(slug)}`, {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(4000), // the server may be waking up; don't hold the page for it
    })
    if (!res.ok) return null
    const data = await res.json()
    const item = data?.product || data
    return item?.name ? item : null
  } catch {
    return null
  }
}

// One or two sentences, cut at a word
const short = (text, max = 180) => {
  const clean = String(text || "").replace(/\s+/g, " ").trim()
  if (clean.length <= max) return clean
  return `${clean.slice(0, max).replace(/\s+\S*$/, "")}…`
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const item = await menuItem(slug)
  const title = item ? `${item.name} - Ash's Cravings` : GENERAL.title
  const description = short(item?.description) || GENERAL.description
  const url = `${SITE}/menu/${slug}`
  const photo = item?.image_url
  const image = photo ? (photo.startsWith("http") ? photo : `${SITE}${photo}`) : `${SITE}/og-default.jpg`

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "Ash's Cravings",
      locale: "en_US",
      type: "website",
      images: [{ url: image, alt: item?.name || "Ash's Cravings" }],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  }
}

export default async function ProductPage({ params }) {
  const { slug } = await params
  return (
    <div className="min-h-screen">
      <Navigation />
      <Product slug={slug} />
      <Footer />
    </div>
  )
}
