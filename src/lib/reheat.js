// Ash's reheating instructions for meal prep. The order server sends the same
// words in the receipt email (utils/reheat.js in the backend).

export const REHEAT_STEPS = [
    { title: "Vent the lid", text: "Lift one corner so steam can escape." },
    { title: "Microwave 2–2½ min", text: "Stir halfway through so it heats evenly." },
    { title: "Enjoy within 4 days", text: "Keep it in the fridge until then." },
]

// Extra care for a few dishes. `match` picks the dishes it applies to by name.
export const REHEAT_NOTES = [
    { key: "salmon", label: "Salmon", text: "Heat at 50% power so it stays tender.", match: /salmon/i },
    { key: "burrito", label: "Burritos", text: "Take off the foil first.", match: /burrito/i },
    {
        key: "sides",
        label: "Sauce cups, tzatziki and salad",
        text: "Take them out before heating.",
        match: /sauce|tzatziki|salad|dressing/i,
    },
]

// Only meals get heated (not juices, shots or chia pudding)
export const needsReheat = (product) => String(product?.category?.name || "").toLowerCase() === "meals"

/** The notes that apply to one dish, matched on its name and description */
export const notesFor = (product) => {
    const text = `${product?.name || ""} ${product?.description || ""}`
    return REHEAT_NOTES.filter((n) => n.match.test(text))
}
