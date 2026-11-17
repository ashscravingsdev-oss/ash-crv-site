// How often an order repeats. Subscriptions are for bundles: menus rotate, and
// bundle picks can change every week (or repeat with a chef's-choice swap for
// anything that's off the menu). Single items can't do that, so in a
// subscription cart they come with the first order only.

export const FREQUENCIES = [
    { value: "one-time", label: "One time", short: "one time" },
    { value: "weekly", label: "Every week", short: "every week" },
    { value: "biweekly", label: "Every 2 weeks", short: "every 2 weeks" },
]

const KEY = "ash_order_frequency"

export function getSavedFrequency() {
    try {
        const v = window.localStorage.getItem(KEY)
        return FREQUENCIES.some((f) => f.value === v) ? v : null
    } catch {
        return null
    }
}

export function saveFrequency(value) {
    try {
        window.localStorage.setItem(KEY, value)
    } catch {
        // storage can be blocked (private mode); checkout still lets them choose
    }
}

export const frequencyLabel = (value) => FREQUENCIES.find((f) => f.value === value)?.short || value

// What repeats: bundles (re-picked each week) and custom meal plans made to repeat
export const lineRepeats = (item) => !!item?.bundle_id || !!item?.product?.allow_subscription

// A cart can become a subscription if it has something that repeats. Until the
// order server says it takes one-time extras (`extrasAllowed`), every line has
// to repeat, which is the rule the server had before.
export const cartCanSubscribe = (items, extrasAllowed = false) =>
    Array.isArray(items) && items.length > 0 && (extrasAllowed ? items.some(lineRepeats) : items.every(lineRepeats))

// The rest of a subscription cart (a treat, a single meal): one-time extras that
// come with the first order only. Returns their names, to say so at checkout.
export const cartExtras = (items) =>
    Array.isArray(items)
        ? [...new Set(items.filter((item) => !lineRepeats(item)).map((item) => item?.product?.name || "a single item"))]
        : []

// "A", "A and B", "A, B and C"; a long list ends "and 3 more"
export const listNames = (names) => {
    const shown = names.length > 4 ? [...names.slice(0, 3), `${names.length - 3} more`] : names
    return shown.length < 2 ? shown.join("") : `${shown.slice(0, -1).join(", ")} and ${shown[shown.length - 1]}`
}
