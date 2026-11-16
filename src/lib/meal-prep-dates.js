// Which date does a meal prep order go out on?
//
// Meal prep goes out on set weekdays (e.g. Tuesday), with a weekly order cutoff
// (e.g. Sunday 8:00 PM). A delivery day stops taking orders at the last cutoff
// before it; after that, new orders belong to the following week. Meal prep
// never goes out the same day it's ordered.
//
// Everything runs on Pacific time (not the device's own zone) and works on
// 'YYYY-MM-DD' strings, so daylight saving changes can't shift a date. The
// order server has the same function and checks every order against it.

const SHOP_TZ = "America/Los_Angeles"
const DAYS = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]

// Today's date and the minutes since midnight, in shop time
export function shopNow(now = new Date()) {
    const parts = new Intl.DateTimeFormat("en-CA", {
        timeZone: SHOP_TZ, year: "numeric", month: "2-digit", day: "2-digit",
        hour: "2-digit", minute: "2-digit", hourCycle: "h23",
    }).formatToParts(now)
    const get = (type) => parts.find((p) => p.type === type).value
    return {
        date: `${get("year")}-${get("month")}-${get("day")}`,
        minutes: Number(get("hour")) * 60 + Number(get("minute")),
    }
}

export function addDays(dateStr, days) {
    const d = new Date(`${String(dateStr).slice(0, 10)}T12:00:00Z`)
    d.setUTCDate(d.getUTCDate() + days)
    return d.toISOString().slice(0, 10)
}

const weekdayIndex = (dateStr) => new Date(`${String(dateStr).slice(0, 10)}T12:00:00Z`).getUTCDay()

/**
 * The next date ('YYYY-MM-DD') meal prep goes out on `deliveryDay` ("tuesday").
 * `cutoff` is the active cutoff rule ({ cutoff_day, cutoff_time }) or null.
 * Returns null if the weekday isn't a real one.
 */
export function nextMealPrepDate(deliveryDay, cutoff, now = new Date()) {
    const target = DAYS.indexOf(String(deliveryDay || "").toLowerCase())
    if (target === -1) return null

    const { date: today, minutes } = shopNow(now)
    // The next one after today (never today)
    let date = addDays(today, ((target - weekdayIndex(today) + 7) % 7) || 7)

    const cutoffDay = cutoff ? DAYS.indexOf(String(cutoff.cutoff_day || "").toLowerCase()) : -1
    if (cutoffDay !== -1) {
        const [h, m] = String(cutoff.cutoff_time || "00:00").split(":").map(Number)
        // The last cutoff day before that delivery date (1 to 7 days earlier)
        const cutoffDate = addDays(date, -(((target - cutoffDay + 7) % 7) || 7))
        const closed = today > cutoffDate || (today === cutoffDate && minutes >= (h || 0) * 60 + (m || 0))
        if (closed) date = addDays(date, 7)
    }
    return date
}

// True when this week's delivery day has already closed, so `date` is the week after
export function rolledToNextWeek(deliveryDay, cutoff, now = new Date()) {
    const withCutoff = nextMealPrepDate(deliveryDay, cutoff, now)
    const withoutCutoff = nextMealPrepDate(deliveryDay, null, now)
    return !!withCutoff && withCutoff !== withoutCutoff
}

// "Tuesday, November 24" (long) or "Tue, Nov 24" (short)
export const prettyMealDate = (dateStr, short = false) =>
    dateStr
        ? new Date(`${String(dateStr).slice(0, 10)}T12:00:00Z`).toLocaleDateString("en-US", {
              weekday: short ? "short" : "long", month: short ? "short" : "long", day: "numeric", timeZone: "UTC",
          })
        : ""
