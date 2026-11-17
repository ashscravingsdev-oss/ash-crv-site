// Business details for search engines (schema.org structured data). Nothing here
// shows on the page. Orders go out by delivery or pickup, so the place is the
// city and state only.
const SITE = "https://www.ashscravings.com"

const BUSINESS = {
    "@context": "https://schema.org",
    "@type": "FoodEstablishment",
    "@id": `${SITE}/#business`,
    name: "Ash's Cravings",
    url: SITE,
    image: `${SITE}/og-default.jpg`,
    logo: `${SITE}/brand/logo-square-512.png`,
    description:
        "Made-from-scratch meal prep, custom cakes, desserts and food for events, made to order in Eastvale, CA. Delivery or pickup.",
    address: {
        "@type": "PostalAddress",
        addressLocality: "Eastvale",
        addressRegion: "CA",
        addressCountry: "US",
    },
    areaServed: "Eastvale, CA and nearby cities",
    hasMenu: `${SITE}/menu`,
    priceRange: "$$",
    sameAs: ["https://www.instagram.com/ashscravings", "https://www.tiktok.com/@ashscravings"],
}

export default function BusinessSchema() {
    return (
        <script
            type="application/ld+json"
            // "<" is escaped so the text can never close the script tag
            dangerouslySetInnerHTML={{ __html: JSON.stringify(BUSINESS).replace(/</g, "\\u003c") }}
        />
    )
}
