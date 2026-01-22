'use client'
import React, { useState } from 'react'

const ProductImages = ({ product }) => {
    const [currentImage, setCurrentImage] = useState(0)
    return (
        <div className="space-y-4">
            <div className="aspect-square rounded-2xl overflow-hidden bg-muted">
                <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover"
                />
            </div>
            {product.images && product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                    {product.images.map((img, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentImage(idx)}
                            className={`aspect-square rounded-lg overflow-hidden border-2 ${currentImage === idx ? "border-primary" : "border-border"
                                }`}
                        >
                            <img
                                src={img || "/placeholder.svg"}
                                alt={`${product.name} ${idx + 1}`}
                                className="w-full h-full object-cover"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}

export default ProductImages
