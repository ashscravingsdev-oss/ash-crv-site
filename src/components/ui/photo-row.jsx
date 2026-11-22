"use client"

import { useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

/**
 * Photos as one row you can swipe through (phones) or scroll with the arrows
 * (computers), like the cakes on Cakes & Desserts and the past spreads on
 * Events. Tapping a photo opens it big.
 */
const PhotoRow = ({ photos, onOpen, label = "photos" }) => {
    const row = useRef(null)
    const [edges, setEdges] = useState({ start: true, end: false })

    const check = () => {
        const el = row.current
        if (!el) return
        setEdges({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth > el.scrollWidth - 8 })
    }
    useEffect(() => {
        check()
        window.addEventListener("resize", check)
        return () => window.removeEventListener("resize", check)
    }, [photos.length])

    const go = (dir) => row.current?.scrollBy({ left: dir * row.current.clientWidth * 0.8, behavior: "smooth" })
    const arrow =
        "hidden md:flex absolute top-1/2 -translate-y-1/2 z-10 h-11 w-11 items-center justify-center rounded-full bg-background/95 text-brand-espresso shadow-md ring-1 ring-black/5 transition-opacity hover:bg-background disabled:opacity-0"

    return (
        <div className="relative">
            <button type="button" onClick={() => go(-1)} disabled={edges.start} aria-label={`Earlier ${label}`} className={`${arrow} -left-3 lg:-left-5`}>
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <div
                ref={row}
                onScroll={check}
                className="-mx-4 px-4 md:mx-0 md:px-0 flex gap-3 md:gap-4 overflow-x-auto snap-x snap-mandatory scroll-px-4 md:scroll-px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
                {photos.map((photo, idx) => (
                    <figure
                        key={`${photo.src}-${idx}`}
                        className="relative shrink-0 snap-start w-[68vw] sm:w-[40vw] md:w-[260px] lg:w-[280px] aspect-[4/5] overflow-hidden rounded-2xl bg-background"
                    >
                        <button
                            type="button"
                            onClick={() => onOpen(idx)}
                            aria-label="See the whole photo"
                            className="block w-full h-full cursor-zoom-in focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand-tobacco rounded-2xl"
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={photo.thumb}
                                alt={photo.alt}
                                loading={idx < 6 ? "eager" : "lazy"}
                                className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300"
                            />
                        </button>
                        {photo.note && (
                            <figcaption className="pointer-events-none absolute left-3 bottom-3 whitespace-nowrap rounded-full bg-background/90 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-brand-espresso">
                                {photo.note}
                            </figcaption>
                        )}
                    </figure>
                ))}
            </div>
            <button type="button" onClick={() => go(1)} disabled={edges.end} aria-label={`More ${label}`} className={`${arrow} -right-3 lg:-right-5`}>
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
        </div>
    )
}

export default PhotoRow
