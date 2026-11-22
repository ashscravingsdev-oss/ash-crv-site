// Every photo spot on the website, with the photos it shows until Ash picks her
// own on the admin's "Website photos" page. The admin reads this list from
// /photo-spots.json, so a new spot here shows up there by itself.
//
//   key     where it is (saved with Ash's photos on the order server)
//   page    which page, for grouping in the admin
//   label   what Ash sees in the admin
//   hint    (optional) a short line under the label
//   newAlt  what a new photo here is described as (for screen readers and search)
//   names   (sets) a name for each position
//   shapes  crop frame per position ("w:h"); the last one repeats
//   gallery a list Ash can add to, remove from and reorder
//   first   (galleries) how many show before "Show more"
//   notes   (galleries) photos can have a little tag, like "For my grandma ♡"
//   photos  the built-in photos: [{ url, alt, note }]

// The cake gallery, in the order it showed before Ash could change it
const CAKES = [
    "cake-54.jpg", "cake-55.jpg", "cake-56.jpg", "cake-51.jpg", "cake-48.jpg", "cake-50.jpg", "cake-52.jpg", "cake-49.jpg",
    "cake-53.jpg", "cake-37.jpg", "cake-06.jpg", "cake-05.jpg", "cake-17.jpg", "cake-01.jpg", "cake-22.jpg", "cake-27.jpg",
    "cake-02.jpg", "cake-03.jpg", "cake-04.jpg", "cake-09.jpg", "cake-10.jpg", "cake-11.jpg", "cake-13.jpg", "cake-14.jpg",
    "cake-15.jpg", "cake-16.jpg", "cake-18.jpg", "cake-19.jpg", "cake-20.jpg", "cake-21.jpg", "cake-23.jpg", "cake-24.jpg",
    "cake-25.jpg", "cake-26.jpg", "cake-28.jpg", "cake-29.jpg", "cake-30.jpg", "cake-31.jpg", "cake-32.jpg", "cake-34.jpg",
    "cake-38.jpg", "cake-39.jpg", "cake-40.jpg", "cake-41.jpg", "cake-43.jpg", "cake-44.jpg", "cake-46.jpg",
]
const CAKE_NOTES = {
    "cake-55.jpg": { alt: "White cake with blue piped bows and a gold 'Destiny' topper, cut open so rainbow sprinkles spill out" },
    "cake-56.jpg": { alt: "Two mini cakes and cupcakes piped with funny 30th birthday doodles" },
    "cake-54.jpg": {
        note: "For my grandma ♡",
        alt: "Peach piped cake with baby's breath and a photo of Ash's grandma Maria Elena holding a cake",
    },
}

export const SPOTS = [
    {
        key: "home.hero",
        page: "Home",
        label: "Big photo at the top",
        newAlt: "Meal prep from Ash's Cravings",
        shapes: ["10:9"],
        photos: [{ url: "/brand/home-hero.jpg", alt: "Teriyaki chicken meal prep bowls with rice and broccoli" }],
    },
    {
        key: "home.christmas",
        page: "Home",
        label: "Christmas mini cakes card (at the top)",
        newAlt: "Christmas mini cakes by Ash's Cravings",
        shapes: ["1:1"],
        photos: [{ url: "/gallery/cakes/cake-22.jpg", alt: "" }],
    },
    {
        key: "home.cravings",
        page: "Home",
        label: "“Pick your craving” tiles",
        newAlt: "Food from Ash's Cravings",
        names: ["Meal Prep", "Cakes & Desserts", "Events", "Private Chef"],
        shapes: ["1:1"],
        photos: [
            { url: "/gallery/meals/salmon-meal-prep.jpg", alt: "Salmon meal prep with an Ash's Cravings sticker" },
            { url: "/gallery/cakes/cake-05.jpg", alt: "50th birthday cake with blush garden roses" },
            { url: "/gallery/catering/catering-16.jpg", alt: "Party platters on a styled table with greenery" },
            { url: "/gallery/catering/catering-15.jpg", alt: "Smoked salmon bites with gold forks" },
        ],
    },
    {
        key: "home.cakes",
        page: "Home",
        label: "Cakes section",
        newAlt: "Custom cake by Ash's Cravings",
        names: ["Tall photo", "Small photo, top", "Small photo, bottom"],
        shapes: ["3:4", "1:1"],
        photos: [
            { url: "/gallery/cakes/cake-37.jpg", alt: "Vintage-piped cake topped with cherries and red bows" },
            { url: "/gallery/cakes/cake-22.jpg", alt: "Red and green Christmas mini cakes" },
            { url: "/gallery/cakes/cake-43.jpg", alt: "Close-up of a vintage-piped engagement cake" },
        ],
    },
    {
        key: "home.story",
        page: "Home",
        label: "“My story” photo",
        newAlt: "A photo from Ash's kitchen",
        shapes: ["4:5"],
        photos: [{ url: "/brand/about-hero.jpg", alt: "Ash in the kitchen" }],
    },
    {
        key: "home.instagram",
        page: "Home",
        label: "Instagram row",
        newAlt: "From Ash's Cravings on Instagram",
        shapes: ["1:1"],
        photos: [
            { url: "/gallery/catering/catering-02.jpg", alt: "Avocado and tomato toasts for an event" },
            { url: "/gallery/cakes/cake-17.jpg", alt: "Cupcake flower bouquet" },
            { url: "/gallery/desserts/dessert-boxes-1.jpg", alt: "Dessert boxes with chocolate-covered strawberries and mini cheesecakes" },
            { url: "/gallery/cakes/cake-27.jpg", alt: "Strawberry-topped celebration cake" },
            { url: "/gallery/cakes/cake-01.jpg", alt: "White cake with pink and red rosettes" },
            { url: "/gallery/cakes/cake-39.jpg", alt: "Cake topped with cherries" },
        ],
    },
    {
        key: "cakes.hero",
        page: "Cakes & Desserts",
        label: "Photos at the top",
        newAlt: "Custom cake by Ash's Cravings",
        names: ["Big photo", "Small photo, top", "Small photo, bottom"],
        shapes: ["3:4", "1:1"],
        photos: [
            { url: "/gallery/cakes/cake-05.jpg", alt: "50th birthday cake with blush garden roses and a gold topper" },
            { url: "/gallery/cakes/cake-01.jpg", alt: "White cake with pink and red rosettes" },
            { url: "/gallery/cakes/cake-43.jpg", alt: "Cream vintage heart cake piped with 'engaged'" },
        ],
    },
    {
        key: "cakes.gallery",
        page: "Cakes & Desserts",
        label: "“Cakes I’ve loved making”",
        newAlt: "Custom cake by Ash's Cravings",
        hint: "The first 8 show right away; the rest are under “Show more cakes”.",
        gallery: true,
        first: 8,
        notes: true,
        shapes: ["1:1"],
        photos: CAKES.map((f) => ({
            url: `/gallery/cakes/${f}`,
            alt: CAKE_NOTES[f]?.alt || "Custom cake by Ash's Cravings",
            ...(CAKE_NOTES[f]?.note ? { note: CAKE_NOTES[f].note } : {}),
        })),
    },
    {
        key: "cakes.cheesecakes",
        page: "Cakes & Desserts",
        label: "Cheesecakes card",
        newAlt: "Cheesecake by Ash's Cravings",
        hint: "Until you pick one, it shows the photo from your cheesecakes on the menu.",
        shapes: ["4:3"],
        photos: [],
    },
    {
        key: "cakes.desserts",
        page: "Cakes & Desserts",
        label: "“Sweets by the dozen” photos (next to the video)",
        newAlt: "Desserts by Ash's Cravings",
        names: ["Small photo, top", "Small photo, bottom"],
        shapes: ["3:4"],
        photos: [
            { url: "/gallery/desserts/dessert-boxes-2.jpg", alt: "Boxes of strawberry mini cheesecakes, cow-print strawberries and chocolate pretzels" },
            { url: "/gallery/cakes/cake-17.jpg", alt: "Cupcake flower bouquet in pinks and yellows" },
        ],
    },
    {
        key: "subscriptions.hero",
        page: "Subscriptions",
        label: "Big photo at the top",
        newAlt: "Meal prep from Ash's Cravings",
        shapes: ["5:4"],
        photos: [{ url: "/gallery/meals/salmon-meal-prep.jpg", alt: "Salmon meal prep, packed and ready" }],
    },
    {
        key: "events.hero",
        page: "Events",
        label: "Photos at the top",
        newAlt: "Event food by Ash's Cravings",
        names: ["Big photo", "Small photo, top", "Small photo, bottom"],
        shapes: ["3:4", "1:1"],
        photos: [
            { url: "/gallery/catering/catering-17.jpg", alt: "Bridal shower table with greenery, a welcome mirror and trays of bites" },
            { url: "/gallery/catering/catering-15.jpg", alt: "Smoked salmon bites on little gold forks" },
            { url: "/gallery/catering/catering-16.jpg", alt: "Platters of crostini topped with tomatoes and herbs" },
        ],
    },
    {
        key: "events.occasions",
        page: "Events",
        label: "“Whatever you’re celebrating” photos",
        names: ["Birthdays & celebrations", "Showers & private parties", "Office mornings & lunches"],
        shapes: ["4:5"],
        newAlt: "Event food by Ash's Cravings",
        photos: [
            { url: "/gallery/events/birthdays.jpg", alt: "10th birthday dessert table with chocolate strawberries, rainbow mini cupcakes and cheesecake cups" },
            { url: "/gallery/events/showers.jpg", alt: "Baby shower spread with charcuterie cups, blueberry crostini, mini cheesecakes and tea sandwiches" },
            { url: "/gallery/events/office.jpg", alt: "Boxed focaccia sandwiches and fig crostini ready for an office lunch" },
        ],
    },
    {
        key: "events.gallery",
        page: "Events",
        label: "“A peek at past spreads”",
        newAlt: "Event food by Ash's Cravings",
        gallery: true,
        shapes: ["1:1"],
        photos: [
            { url: "/gallery/catering/catering-01.jpg", alt: "Grazing board with veggies, grapes, cheeses and a spinach dip" },
            { url: "/gallery/catering/catering-21.jpg", alt: "Crostini with whipped cheese, blueberry compote, walnuts and thyme" },
            { url: "/gallery/catering/catering-13.jpg", alt: "Deviled eggs garnished with cranberries and parsley" },
            { url: "/gallery/catering/catering-22.jpg", alt: "Shower table with white chocolate strawberries, rosette cupcakes, pretzel rods and deviled eggs" },
            { url: "/gallery/catering/catering-14.jpg", alt: "Party table with brie bites, berries and a big glazed tray" },
            { url: "/gallery/catering/catering-09.jpg", alt: "Fall party spread with crostini, pasta salad cups and mini desserts" },
            { url: "/gallery/catering/catering-02.jpg", alt: "Tray of pesto and caprese toasts on ciabatta" },
            { url: "/gallery/catering/catering-23.jpg", alt: "Truffle parmesan potato bites, deviled eggs and bacon crostini" },
            { url: "/gallery/catering/catering-19.jpg", alt: "Caprese skewers with tomato, mozzarella and basil" },
        ],
    },
    {
        key: "events.private-chef",
        page: "Events",
        label: "Private chef photo",
        newAlt: "A private chef dinner by Ash's Cravings",
        shapes: ["4:3"],
        photos: [{ url: "/gallery/catering/catering-03.jpg", alt: "Meatballs and baked mac and cheese cooking on the stove" }],
    },
    {
        key: "about.hero",
        page: "About",
        label: "Photo at the top",
        newAlt: "A photo from Ash's kitchen",
        shapes: ["4:5"],
        photos: [{ url: "/brand/about-hero.jpg", alt: "Ash in the kitchen" }],
    },
    {
        key: "about.grandma",
        page: "About",
        label: "Grandma photo",
        newAlt: "A photo from Ash's story",
        shapes: ["9:10"],
        photos: [{ url: "/brand/about-grandma.jpg", alt: "Young Ash and her grandma Maria Elena making pupusas from scratch" }],
    },
    {
        key: "about.first-logo",
        page: "About",
        label: "My first logo (shown in a circle)",
        newAlt: "Ash's first logo",
        shapes: ["1:1"],
        photos: [{ url: "/brand/first-logo.jpg", alt: "Ash's first logo: a round cream badge with cooking doodles and Cashy the poodle" }],
    },
    {
        key: "christmas.hero",
        page: "Christmas",
        label: "Big photo at the top",
        newAlt: "Christmas mini cakes by Ash's Cravings",
        shapes: ["4:5"],
        photos: [{ url: "/gallery/cakes/cake-22.jpg", alt: "Red and green Christmas mini cakes" }],
    },
]

export const SPOT = Object.fromEntries(SPOTS.map((s) => [s.key, s]))

// Only Ash's uploads (Cloudinary) or the website's own photo files
const OK_URL =
    /^(https:\/\/res\.cloudinary\.com\/[a-z0-9_-]+\/image\/upload\/[A-Za-z0-9_,.:/%-]+|\/(gallery|brand)\/[A-Za-z0-9_/-]+\.(jpe?g|png|webp))$/i

/**
 * The photos a spot shows: Ash's when she has picked them, otherwise the
 * built-in ones. A set (like the 3 photos at the top of a page) keeps its
 * size: a missing position falls back to the built-in photo there.
 */
export function spotPhotos(key, mine) {
    const spot = SPOT[key]
    const builtIn = spot?.photos || []
    const picked = Array.isArray(mine)
        ? mine.filter((p) => p && typeof p.url === "string" && OK_URL.test(p.url) && !p.url.includes(".."))
        : null
    if (!picked || picked.length === 0) return builtIn
    // A built-in photo keeps its description; a new one gets the spot's plain one
    const withAlt = (p, fallback) => ({
        url: p.url,
        alt: p.alt || (fallback?.url === p.url ? fallback.alt : "") || spot?.newAlt || "Photo from Ash's Cravings",
        note: typeof p.note === "string" ? p.note : "",
    })
    if (spot?.gallery || builtIn.length <= 1) return picked.map((p) => withAlt(p))
    return builtIn.map((b, i) => (picked[i] ? withAlt(picked[i], b) : b))
}

// A lighter copy of an uploaded photo (Cloudinary resizes it, after any crop
// already in the link). The website's own photos stay as they are.
export function sized(url, px = 1200) {
    return /^https:\/\/res\.cloudinary\.com\/.+\/upload\//.test(url || "")
        ? url.replace(/\/upload\/((?:[^/]+\/)*?)(v\d+\/)/, `/upload/$1w_${px},c_limit,q_auto,f_auto/$2`)
        : url
}
