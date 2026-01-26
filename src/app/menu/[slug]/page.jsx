
import { Navigation } from "@/components/nav"
import { Footer } from "@/components/footer"
 import Product from "@/components/product/product"
export default function ProductPage({ params }) {
  return (
    <div className="min-h-screen">
     
      <Navigation />
      <Product slug={params.slug} />
      <Footer />
    </div>
  )
}
