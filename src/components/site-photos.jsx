"use client"

import { createContext, useContext } from "react"
import { sized, spotPhotos } from "@/lib/site-photos"

const SitePhotos = createContext({})

/** Ash's picked photos for every spot, from the root layout. */
export function SitePhotosProvider({ photos, children }) {
    return <SitePhotos.Provider value={photos || {}}>{children}</SitePhotos.Provider>
}

/** The photos for one spot (see src/lib/site-photos.js): [{ url, alt, note }] */
export function useSpot(key) {
    return spotPhotos(key, useContext(SitePhotos)[key])
}

/** One photo from a spot, as an <img> (Ash's pick or the built-in one). */
export function SpotImg({ spot, i = 0, px = 1600, alt, ...rest }) {
    const photo = useSpot(spot)[i]
    if (!photo) return null
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={sized(photo.url, px)} alt={alt ?? photo.alt} {...rest} />
}
