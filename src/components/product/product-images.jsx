'use client'
import React, { useState } from 'react'

// The main photo first, then the rest, in the order they're set in the admin.
// Tap a small photo to see it big.
const urlOf = (g) => (typeof g === 'string' ? g : g?.url)

const ProductImages = ({ product }) => {
    const photos = [...new Set([product.image_url, ...(product.gallery_images || []).map(urlOf)].filter(Boolean))]
    const [current, setCurrent] = useState(0)
    const shown = photos[Math.min(current, photos.length - 1)]

    return (
        <div className="space-y-4">
            <div className="aspect-square rounded-2xl overflow-hidden bg-muted">
                <img
                    src={shown || "/placeholder.svg"}
                    alt={photos.length > 1 ? `${product.name}, photo ${current + 1}` : product.name}
                    className="w-full h-full object-cover"
                />
            </div>
            {photos.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                    {photos.map((src, idx) => (
                        <button
                            key={src}
                            type="button"
                            onClick={() => setCurrent(idx)}
                            aria-label={`Show photo ${idx + 1}`}
                            aria-pressed={current === idx}
                            className={`aspect-square rounded-lg overflow-hidden border-2 ${current === idx ? "border-primary" : "border-border"}`}
                        >
                            <img src={src} alt="" className="w-full h-full object-cover" />
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}

export default ProductImages
