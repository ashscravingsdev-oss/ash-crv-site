"use client"

import { useCallback, useEffect, useRef } from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

/**
 * Tap a gallery photo to see the whole picture, uncropped.
 * Arrows (or swipe on a phone, or the ← → keys) go through the rest; Esc,
 * the X or tapping outside the photo closes it.
 *
 * photos: [{ src, alt, note? }]
 * index: the open photo, or null when closed
 * onIndexChange: a useState setter (takes a number, null, or an updater)
 */
const PhotoLightbox = ({ photos, index, onIndexChange }) => {
    const open = index !== null && index >= 0 && index < photos.length
    const count = photos.length
    const touchX = useRef(null)

    const go = useCallback(
        (step) => onIndexChange((i) => (i === null ? i : (i + step + count) % count)),
        [count, onIndexChange]
    )

    // ← → keys
    useEffect(() => {
        if (!open) return
        const onKey = (e) => {
            if (e.key === "ArrowRight") go(1)
            if (e.key === "ArrowLeft") go(-1)
        }
        window.addEventListener("keydown", onKey)
        return () => window.removeEventListener("keydown", onKey)
    }, [open, go])

    // Load the photos on either side so swiping feels instant
    useEffect(() => {
        if (!open || count < 2) return
        for (const step of [1, -1]) {
            const img = new window.Image()
            img.src = photos[(index + step + count) % count].src
        }
    }, [open, index, count, photos])

    const photo = open ? photos[index] : null

    return (
        <DialogPrimitive.Root open={open} onOpenChange={(o) => !o && onIndexChange(null)}>
            <DialogPrimitive.Portal>
                <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-brand-espresso/90 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0" />
                <DialogPrimitive.Content
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-10 outline-none data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95"
                    onClick={(e) => e.target === e.currentTarget && onIndexChange(null)}
                    onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
                    onTouchEnd={(e) => {
                        if (touchX.current === null) return
                        const dx = e.changedTouches[0].clientX - touchX.current
                        touchX.current = null
                        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1)
                    }}
                >
                    <DialogPrimitive.Title className="sr-only">{photo?.alt || "Photo"}</DialogPrimitive.Title>
                    <DialogPrimitive.Description className="sr-only">
                        Photo {index + 1} of {count}. Use the arrows to see more.
                    </DialogPrimitive.Description>

                    {photo && (
                        <figure className="relative max-h-full max-w-full flex flex-col items-center gap-3">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                key={photo.src}
                                src={photo.src}
                                alt={photo.alt}
                                className="max-h-[78vh] sm:max-h-[84vh] max-w-full w-auto h-auto object-contain rounded-[18px] shadow-2xl select-none"
                                draggable={false}
                            />
                            <figcaption className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.16em] text-brand-latte">
                                {photo.note && (
                                    <span className="rounded-full bg-background px-3 py-1 text-[10px] text-brand-espresso">{photo.note}</span>
                                )}
                                {count > 1 && <span aria-hidden="true">{index + 1} / {count}</span>}
                            </figcaption>
                        </figure>
                    )}

                    {count > 1 && (
                        <>
                            <button
                                type="button"
                                onClick={() => go(-1)}
                                aria-label="Previous photo"
                                className="absolute left-2 sm:left-5 top-1/2 -translate-y-1/2 grid place-items-center h-11 w-11 rounded-full bg-background/15 text-background hover:bg-background/30 transition-colors"
                            >
                                <ChevronLeft className="h-6 w-6" />
                            </button>
                            <button
                                type="button"
                                onClick={() => go(1)}
                                aria-label="Next photo"
                                className="absolute right-2 sm:right-5 top-1/2 -translate-y-1/2 grid place-items-center h-11 w-11 rounded-full bg-background/15 text-background hover:bg-background/30 transition-colors"
                            >
                                <ChevronRight className="h-6 w-6" />
                            </button>
                        </>
                    )}

                    <DialogPrimitive.Close
                        aria-label="Close"
                        className="absolute right-3 top-3 sm:right-5 sm:top-5 grid place-items-center h-11 w-11 rounded-full bg-background/15 text-background hover:bg-background/30 transition-colors"
                    >
                        <X className="h-6 w-6" />
                    </DialogPrimitive.Close>
                </DialogPrimitive.Content>
            </DialogPrimitive.Portal>
        </DialogPrimitive.Root>
    )
}

export default PhotoLightbox
