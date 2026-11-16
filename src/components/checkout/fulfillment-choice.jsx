"use client"

// Delivery or pickup: shared by the meal prep checkout and the checkout for
// desserts, cakes and custom items.

// What an order's "address" says when it's a pickup
export const PICKUP_ADDRESS = "Pickup in Eastvale, CA (I'll text you the address)"

// One of the two choice cards (Delivery / Pickup)
export const Choice = ({ selected, onClick, icon: Icon, title, text }) => (
    <button
        type="button"
        onClick={onClick}
        aria-pressed={selected}
        className={`flex-1 text-left rounded-xl border p-4 transition-colors ${
            selected ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-border hover:border-brand-tobacco"
        }`}
    >
        <span className="flex items-center gap-2 font-semibold text-brand-espresso">
            <Icon className="h-4 w-4 text-primary" /> {title}
        </span>
        <span className="block text-sm text-muted-foreground mt-1">{text}</span>
    </button>
)
