"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { motion } from "framer-motion"

const ProductItem = ({ product }) => {
    return (
        <Link href={`/menu/${product.slug}`}>
            <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.2 }}
                className="h-full"
            >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                        className="aspect-square overflow-hidden"
                    >
                        <img
                            src={product.image_url || "/placeholder.svg"}
                            alt={product.name}
                            className="w-full h-full object-cover"
                        />
                    </motion.div>

                    <CardContent className="p-6">
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            className="flex items-center gap-2 mb-2"
                        >
                            <Badge variant="secondary" className="text-xs">
                                {product.category.name}
                            </Badge>
                        </motion.div>

                        <motion.h3
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.15 }}
                            className="text-xl font-semibold mb-2"
                        >
                            {product.name}
                        </motion.h3>

                        <motion.p
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-muted-foreground text-sm mb-4 leading-relaxed"
                        >
                            {product.description}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.25 }}
                            className="flex items-center justify-between text-sm text-muted-foreground mb-4"
                        >
                            <span>{product.nutrition_info.calories} cal</span>
                            <span>{product.nutrition_info.protein}g protein</span>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="flex items-center justify-between"
                        >
                            <span className="text-2xl font-bold">${product.price}</span>
                            <motion.div
                            >
                                <Button>Add to Cart</Button>
                            </motion.div>
                        </motion.div>
                    </CardContent>
                </Card>
            </motion.div>
        </Link>
    )
}

export default ProductItem