import { Analytics } from "@vercel/analytics/next"
import "@fontsource/cormorant-garamond/500.css"
import "@fontsource/cormorant-garamond/600.css"
import "@fontsource/cormorant-garamond/700.css"
import "@fontsource/cormorant-garamond/500-italic.css"
import "@fontsource/cormorant-garamond/600-italic.css"
import "@fontsource/jost/300.css"
import "@fontsource/jost/400.css"
import "@fontsource/jost/500.css"
import "@fontsource/jost/600.css"
import "@fontsource/jost/700.css"
import "@fontsource/dm-mono/400.css"
import "@fontsource/dm-mono/500.css"
import "./globals.css"
import StoreProvider from "@/store/provider";
import { Toaster } from "@/components/ui/sonner"

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <StoreProvider>
          {children}
        </StoreProvider>
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
