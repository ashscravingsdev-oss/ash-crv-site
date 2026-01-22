"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, SlidersHorizontal } from "lucide-react"
import { useState } from "react"
import ProductItem from './product-item'
import { motion } from "framer-motion"
import { fadeUp, fadeIn } from "@/lib/animations"

const categories = ["All", "Meal Prep", "Juices", "Bundles", "Breakfast", "Lunch", "Dinner"]

const products = [
    {
        id: "1",
        name: "Mediterranean Bowl",
        category: "Meal Prep",
        description: "Grilled chicken, quinoa, roasted vegetables, hummus",
        price: 12.99,
        image: "/mediterranean-bowl-with-chicken-quinoa-vegetables.jpg",
        calories: 450,
        protein: 35,
    },
    {
        id: "2",
        name: "Green Detox Juice",
        category: "Juices",
        description: "Kale, cucumber, green apple, lemon, ginger",
        price: 8.99,
        image: "/green-detox-juice-cold-pressed.jpg",
        calories: 120,
        protein: 3,
    },
    {
        id: "3",
        name: "Power Protein Pack",
        category: "Meal Prep",
        description: "Grilled salmon, sweet potato, broccoli, tahini",
        price: 14.99,
        image: "/protein-meal-prep-salmon-sweet-potato.jpg",
        calories: 520,
        protein: 42,
    },
    {
        id: "4",
        name: "Berry Blast Smoothie",
        category: "Juices",
        description: "Mixed berries, banana, almond milk, chia seeds",
        price: 7.99,
        image: "/berry-smoothie-bowl.jpg",
        calories: 280,
        protein: 8,
    },
    {
        id: "5",
        name: "Asian Fusion Bowl",
        category: "Meal Prep",
        description: "Teriyaki chicken, brown rice, edamame, sesame",
        price: 13.99,
        image: "/asian-teriyaki-bowl.jpg",
        calories: 480,
        protein: 38,
    },
    {
        id: "6",
        name: "Breakfast Power Bowl",
        category: "Breakfast",
        description: "Scrambled eggs, sweet potato, avocado, spinach",
        price: 11.99,
        image: "/breakfast-power-bowl.jpg",
        calories: 420,
        protein: 28,
    },
]

const Menu = () => {
    const [selectedCategory, setSelectedCategory] = useState("All")
    const [searchQuery, setSearchQuery] = useState("")
    const [sortBy, setSortBy] = useState("popular")

    const filteredProducts = products.filter((product) => {
        const matchesCategory = selectedCategory === "All" || product.category === selectedCategory
        const matchesSearch =
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesCategory && matchesSearch
    })

    return (
        <motion.div
            initial="initial"
            animate="animate"
            variants={fadeIn}
            className="container mx-auto px-4 pt-8"
        >
            {/* Header */}
            <motion.div
                variants={fadeUp}
                className="mb-8"
            >
                <h1 className="text-4xl font-bold mb-2">Our Menu</h1>
                <p className="text-lg text-muted-foreground">Fresh, healthy meals and juices delivered daily</p>
            </motion.div>

            {/* Search and Sort */}
            <motion.div
                variants={fadeUp}
                initial="initial"
                animate="animate"
                transition={{ delay: 0.1 }}
                className="flex flex-col md:flex-row gap-4 mb-8"
            >
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <motion.div whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
                        <Input
                            type="text"
                            placeholder="Search menu..."
                            className="pl-10"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </motion.div>
                </div>

                <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                    <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className="w-full md:w-[200px]">
                            <SlidersHorizontal className="h-4 w-4 mr-2" />
                            <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="popular">Most Popular</SelectItem>
                            <SelectItem value="price-low">Price: Low to High</SelectItem>
                            <SelectItem value="price-high">Price: High to Low</SelectItem>
                            <SelectItem value="calories">Calories</SelectItem>
                            <SelectItem value="protein">Protein</SelectItem>
                        </SelectContent>
                    </Select>
                </motion.div>
            </motion.div>

            {/* Category Tabs */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-2 mb-8 overflow-x-auto pb-2"
            >
                {categories.map((category, index) => (
                    <motion.div
                        key={category}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 + (index * 0.03) }}
                    >
                        <Button
                            variant={selectedCategory === category ? "default" : "outline"}
                            onClick={() => setSelectedCategory(category)}
                            className="whitespace-nowrap"
                        >
                            {category}
                        </Button>
                    </motion.div>
                ))}
            </motion.div>

            {/* Product Grid */}
            <motion.div
                initial="initial"
                animate="animate"
                variants={{
                    animate: {
                        transition: {
                            staggerChildren: 0.05
                        }
                    }
                }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
                {filteredProducts.map((product, index) => (
                    <motion.div
                        key={product.id}
                        variants={fadeUp}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        layout
                    >
                        <ProductItem product={product} />
                    </motion.div>
                ))}
            </motion.div>

            {filteredProducts.length === 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-12"
                >
                    <p className="text-lg text-muted-foreground">No products found. Try a different search or category.</p>
                </motion.div>
            )}
        </motion.div>
    )
}

export default Menu