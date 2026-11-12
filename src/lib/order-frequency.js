// How often an order repeats. Subscriptions are for bundles only: menus rotate,
// and bundle picks can change every week (or repeat with a chef's-choice swap
// for anything that's off the menu). Single items can't do that.

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

// A cart can become a subscription only if every line is a bundle
export const cartCanSubscribe = (items) => Array.isArray(items) && items.length > 0 && items.every((i) => !!i.bundle_id)
