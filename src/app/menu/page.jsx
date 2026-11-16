
import { Navigation } from "@/components/nav";
import Menu from "@/components/menu/menu";
import { Footer } from "@/components/footer";
import SEO from "@/components/seo";

export default function MenuPage() {
  return (
    <div className="min-h-screen">
      <SEO
        title="Menu - Ash's Cravings | Fresh Meal Prep in Eastvale, CA"
        description="See this week's menu from Ash's Cravings: homemade meal prep, made from scratch in Eastvale, CA. Order by Sunday for delivery or pickup on Tuesday."
        keywords={[
          "meal prep delivery",
          "healthy food menu",
          "chef-prepared meals",
          "meal prep bowls",
          "weekly meal delivery",
          "healthy lunch delivery",
          "fresh meal prep"
        ]}
        url="/menu"
        type="website"
        publishedTime="2024-01-01T00:00:00.000Z"
        modifiedTime={new Date().toISOString()}
      />
      <Navigation />
      <Menu />
      <Footer />
    </div>
  )
}
