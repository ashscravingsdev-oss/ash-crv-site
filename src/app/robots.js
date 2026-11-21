// Tells Google what to look at, and where the list of pages is
export default function robots() {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: ["/api/", "/cart", "/checkout", "/account", "/order-confirmation", "/login", "/register", "/forgot-password", "/reset-password", "/verify-code", "/custom/", "/order/"],
        },
        sitemap: "https://www.ashscravings.com/sitemap.xml",
        host: "https://www.ashscravings.com",
    }
}
