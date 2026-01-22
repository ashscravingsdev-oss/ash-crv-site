
import { Navigation } from "@/components/nav";
import Menu from "@/components/menu/menu";
import { Footer } from "@/components/footer";
import SEO from "@/components/seo";

export default function MenuPage() {
  return (
    <div className="min-h-screen">
      <SEO
        title="Our Menu - FreshPrep | Healthy Meal Prep & Wellness Juices"
        description="Browse our chef-prepared healthy meals, meal prep bowls, and cold-pressed juices. Customize your order with fresh ingredients and get delivery in 30 minutes."
        keywords={[
          "meal prep delivery",
          "healthy food menu",
          "fresh juices",
          "chef-prepared meals",
          "nutritionist-approved",
          "meal prep bowls",
          "cold-pressed juices",
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
