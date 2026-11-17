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
// come with the first order only
export const cartHasExtras = (items) => Array.isArray(items) && items.some((item) => !lineRepeats(item))
