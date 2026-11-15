"use client"

import { forwardRef, useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

/** A password box with an eye button to show or hide what you typed. */
const PasswordInput = forwardRef(({ className, disabled, ...props }, ref) => {
    const [show, setShow] = useState(false)

    return (
        <div className="relative">
            <Input
                ref={ref}
                type={show ? "text" : "password"}
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck={false}
                disabled={disabled}
                className={cn("pr-11", className)}
                {...props}
            />
            <button
                type="button"
                onClick={() => setShow((s) => !s)}
                disabled={disabled}
                aria-label={show ? "Hide password" : "Show password"}
                aria-pressed={show}
                className="absolute inset-y-0 right-0 flex w-11 items-center justify-center rounded-r-md text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:opacity-50"
            >
                {show ? <EyeOff className="h-4 w-4" aria-hidden="true" /> : <Eye className="h-4 w-4" aria-hidden="true" />}
            </button>
        </div>
    )
})
PasswordInput.displayName = "PasswordInput"

export default PasswordInput
