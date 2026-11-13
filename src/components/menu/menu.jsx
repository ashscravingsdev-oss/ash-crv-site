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
import { bestSellerRank } from "@/lib/menu-pins"
import { isMenuProduct } from "@/lib/special-orders"
import DessertGrid from "@/components/desserts/dessert-grid"
import WakingNote from "@/components/ui/waking-note"

const DESSERTS = "Desserts"
// Ash's tab order (by category name); anything new she adds goes after these
const TAB_ORDER = ["Meals", "Juices", DESSERTS, "Wellness Shots"]
const TAB_LABELS = { Meals: "Meal Prep" }

const Menu = () => {
    const dispatch = useDispatch()
    const {
        products: allProducts,
        categories,
        productsLoading,
        productsLoaded,
    } = useSelector((state) => state.products)
    // Keep the loading view up until the menu itself arrives (categories can land first)
    const loading = productsLoading || !productsLoaded
    // Desserts live in their own tab, never in the weekly grid
    const products = allProducts.filter(isMenuProduct)

    const [selectedCategory, setSelectedCategory] = useState("All")
    const [searchQuery, setSearchQuery] = useState("")
    const [sortBy, setSortBy] = useState("popular")
 
    useEffect(() => {
        dispatch(fetchProducts({ order_type: 'meal_prep', limit: 100 }))
    }, [dispatch])

    useEffect(() => {
        dispatch(fetchCategories())
    }, [dispatch])

    // Open straight to desserts from links like /menu?tab=desserts
    useEffect(() => {
        if (typeof window !== "undefined" && new URLSearchParams(window.location.search).get("tab") === "desserts") {
            setSelectedCategory(DESSERTS)
        }
    }, [])

    // Only show categories that have something on this week's menu (dessert
    // flavors live under their own categories and are shopped in the Desserts tab)
    const menuCategories = categories.filter((c) => products.some((p) => p.is_active && p.category?.name === c.name))
    const tabNames = [
        ...TAB_ORDER.filter((n) => n === DESSERTS || menuCategories.some((c) => c.name === n)),
        ...menuCategories.map((c) => c.name).filter((n) => !TAB_ORDER.includes(n)),
    ]

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
            default: {
                // "Most Popular": best sellers first, everything else keeps its order
                const ra = bestSellerRank(a)
                const rb = bestSellerRank(b)
                if (ra === rb) return 0
                return ra < rb ? -1 : 1
            }
        }
    })

    // Loading state
    if (loading) {
        return (
            <div className="container mx-auto px-4 pt-8">
                <WakingNote className="mb-6" />
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
                <p className="text-lg text-muted-foreground">Fresh meals and juices, made from scratch and delivered every Monday &amp; Tuesday</p>
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

                {/* Category Buttons: Meal Prep, Juices, Desserts, Wellness Shots */}
                {tabNames.map((name, index) => (
                    <motion.div
                        key={name}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 + ((index + 1) * 0.03) }}
                    >
                        <Button
                            variant={selectedCategory === name ? "default" : "outline"}
                            onClick={() => setSelectedCategory(name)}
                            className="whitespace-nowrap"
                        >
                            {TAB_LABELS[name] || name}
                        </Button>
                    </motion.div>
                ))}
            </motion.div>

            {selectedCategory === DESSERTS ? (
                <div className="space-y-4">
                    <div>
                        <h2 className="font-serif font-medium text-3xl md:text-4xl text-brand-heading">
                            Sweets by <em className="italic text-brand-tobacco">the dozen</em>
                        </h2>
                        <p className="text-muted-foreground mt-1">
                            Made fresh for your date. Desserts check out on their own, separate from meal prep.
                        </p>
                    </div>
                    <DessertGrid />
                </div>
            ) : (
            <>
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

            {/* Desserts teaser at the end of the weekly menu */}
            {selectedCategory === "All" && !searchQuery && (
                <div className="mt-10 rounded-[22px] border border-border bg-card p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-5 justify-between">
                    <div>
                        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-brand-heading">
                            <span className="text-brand-matcha">■</span> Desserts
                        </p>
                        <p className="font-serif text-3xl text-brand-espresso mt-1">
                            Sweets by <em className="italic text-brand-tobacco">the dozen</em>
                        </p>
                        <p className="text-muted-foreground mt-1">
                            Cookies, mini cupcakes, cheesecakes, brownies, chocolate strawberries and dessert cups.
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={() => {
                            setSelectedCategory(DESSERTS)
                            window.scrollTo({ top: 0, behavior: "smooth" })
                        }}
                        className="inline-flex items-center justify-center gap-3 h-12 px-6 rounded-lg bg-primary text-primary-foreground font-mono text-xs uppercase tracking-[0.18em] hover:bg-primary/90 transition-colors shrink-0"
                    >
                        Shop desserts <span aria-hidden="true">→</span>
                    </button>
                </div>
            )}
            </>
            )}
        </motion.div>
    )
}

export default Menu