"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, SlidersHorizontal } from "lucide-react"
import { useEffect, useState } from "react"
import ProductItem from './product-item'
import { motion } from "framer-motion"
import { fadeUp, fadeIn } from "@/lib/animations"
import { useDispatch, useSelector } from "react-redux"
import { fetchCategories, fetchProducts } from "@/store/productSlice"

const Menu = () => {
    const dispatch = useDispatch()
    const {
        products,
        categories,
        loading
    } = useSelector((state) => state.products)

    const [selectedCategory, setSelectedCategory] = useState("All")
    const [searchQuery, setSearchQuery] = useState("")
    const [sortBy, setSortBy] = useState("popular")
 
    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch])

    useEffect(() => {
        dispatch(fetchCategories())
    }, [dispatch])

    // Filter products based on search and category
    const filteredProducts = products.filter((product) => {
        if (!product.is_active) return false

        const matchesCategory = selectedCategory === "All" || product.category?.name === selectedCategory
        const matchesSearch =
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description?.toLowerCase().includes(searchQuery.toLowerCase())

        return matchesCategory && matchesSearch
    })

    // Sort filtered products
    const sortedProducts = [...filteredProducts].sort((a, b) => {
        switch (sortBy) {
            case "price-low":
                return a.price - b.price
            case "price-high":
                return b.price - a.price
            case "calories":
                const calA = a.nutrition_info?.calories || 0
                const calB = b.nutrition_info?.calories || 0
                return calA - calB
            case "protein":
                const protA = a.nutrition_info?.protein || 0
                const protB = b.nutrition_info?.protein || 0
                return protB - protA
            default:
                return 0
        }
    })

    // Loading state
    if (loading) {
        return (
            <div className="container mx-auto px-4 pt-8">
                {/* Header skeleton */}
                <div className="mb-8">
                    <div className="h-8 bg-gray-200 rounded w-1/4 mb-2 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                </div>

                {/* Search and sort skeleton */}
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                    <div className="flex-1 h-10 bg-gray-200 rounded animate-pulse"></div>
                    <div className="w-full md:w-[200px] h-10 bg-gray-200 rounded animate-pulse"></div>
                </div>

                {/* Category tabs skeleton */}
                <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="h-10 bg-gray-200 rounded-full w-20 animate-pulse"></div>
                    ))}
                </div>

                {/* Product grid skeleton */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="h-[350px] bg-gray-200 rounded-lg animate-pulse"></div>
                    ))}
                </div>
            </div>
        )
    }

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
                {/* All Categories Button */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                >
                    <Button
                        variant={selectedCategory === "All" ? "default" : "outline"}
                        onClick={() => setSelectedCategory("All")}
                        className="whitespace-nowrap"
                    >
                        All
                    </Button>
                </motion.div>

                {/* Category Buttons */}
                {categories.map((category, index) => (
                    <motion.div
                        key={category.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 + ((index + 1) * 0.03) }}
                    >
                        <Button
                            variant={selectedCategory === category.name ? "default" : "outline"}
                            onClick={() => setSelectedCategory(category.name)}
                            className="whitespace-nowrap"
                        >
                            {category.name}
                        </Button>
                    </motion.div>
                ))}
            </motion.div>

            {/* Product Grid */}
            {sortedProducts.length > 0 ? (
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
                    {sortedProducts.map((product, index) => (
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
            ) : (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-12"
                >
                    <p className="text-lg text-muted-foreground mb-4">No products found.</p>
                    {(searchQuery || selectedCategory !== "All") && (
                        <Button
                            variant="outline"
                            onClick={() => {
                                setSearchQuery("")
                                setSelectedCategory("All")
                            }}
                        >
                            Clear filters
                        </Button>
                    )}
                </motion.div>
            )}
        </motion.div>
    )
}

export default Menu