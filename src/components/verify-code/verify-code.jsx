"use client"

import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Mail, Clock } from "lucide-react"

const VerifyCode = () => {
    const [code, setCode] = useState(["", "", "", "", "", ""])
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [email, setEmail] = useState("johndoe@example.com") // Mock email
    const [timer, setTimer] = useState(60) // 60 seconds
    const [canResend, setCanResend] = useState(false)
    const inputRefs = useRef([])

    // Set up timer for resend button
    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer(prev => prev - 1)
            }, 1000)
            return () => clearInterval(interval)
        } else {
            setCanResend(true)
        }
    }, [timer])

    // Focus first input on mount
    useEffect(() => {
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus()
        }
    }, [])

    const handleChange = (index, value) => {
        // Only allow numbers
        if (!/^\d*$/.test(value)) return
        if (value.length > 1) return

        const newCode = [...code]
        newCode[index] = value
        setCode(newCode)
        setError("") // Clear error when user types

        // Auto-focus next input
        if (value && index < 5) {
            const nextInput = inputRefs.current[index + 1]
            nextInput?.focus()
        }
    }

    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && !code[index] && index > 0) {
            const prevInput = inputRefs.current[index - 1]
            prevInput?.focus()
        }
    }

    const handlePaste = (e) => {
        e.preventDefault()
        const pasteData = e.clipboardData.getData('text').trim()

        // Only allow 6 digits
        if (/^\d{6}$/.test(pasteData)) {
            const digits = pasteData.split('')
            const newCode = [...code]
            digits.forEach((digit, index) => {
                if (index < 6) {
                    newCode[index] = digit
                }
            })
            setCode(newCode)
            setError("")

            // Focus last input after paste
            if (inputRefs.current[5]) {
                inputRefs.current[5].focus()
            }
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")

        const verificationCode = code.join("")

        // Validation
        if (verificationCode.length !== 6) {
            setError("Please enter the complete 6-digit code")
            return
        }

        if (!/^\d{6}$/.test(verificationCode)) {
            setError("Code must contain only numbers")
            return
        }

        setIsLoading(true)

        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1500))

            // Mock verification success
            console.log("Verification successful:", verificationCode)

            // Redirect to account or next step
            window.location.href = "/login"

        } catch (error) {
            setError("Verification failed. Please check the code and try again.")
        } finally {
            setIsLoading(false)
        }
    }

    const handleResend = async () => {
        if (!canResend) return

        setError("")
        setCanResend(false)
        setTimer(60) // Reset timer

        try {
            // Simulate resend API call
            await new Promise((resolve) => setTimeout(resolve, 800))

            // Clear code and focus first input
            setCode(["", "", "", "", "", ""])
            if (inputRefs.current[0]) {
                inputRefs.current[0].focus()
            }

        } catch (error) {
            setError("Failed to resend code. Please try again.")
            setCanResend(true)
        }
    }

    return (
        <div className="container mx-auto px-4 pt-16">
            <Card className="max-w-md mx-auto">
                <CardHeader className="text-center">
                    <CardTitle className="text-3xl">Verify Your Account</CardTitle>
                    <CardDescription>Enter the 6-digit code sent to your email</CardDescription>
                </CardHeader>

                <CardContent>


                    <form onSubmit={handleSubmit} className="space-y-3">
                        <div className="space-y-3">
                            <Label className="text-center block">Verification Code</Label>
                            <div className="flex gap-2 justify-center" onPaste={handlePaste}>
                                {code.map((digit, index) => (
                                    <Input
                                        key={index}
                                        ref={el => inputRefs.current[index] = el}
                                        id={`code-${index}`}
                                        type="text"
                                        inputMode="numeric"
                                        pattern="[0-9]*"
                                        maxLength={1}
                                        value={digit}
                                        onChange={(e) => handleChange(index, e.target.value)}
                                        onKeyDown={(e) => handleKeyDown(index, e)}
                                        className="w-12 h-14 text-center text-xl font-bold"
                                        disabled={isLoading}
                                        aria-label={`Digit ${index + 1} of verification code`}
                                    />
                                ))}
                            </div>
                            {error && (
                                <p className="text-red-500 text-sm mt-1 text-center" role="alert">
                                    {error}
                                </p>
                            )}
                        </div>

                        {/* Timer */}
                        <div className="text-center">
                            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-">
                                <Clock className="h-4 w-4" />
                                <span>Code expires in: {Math.floor(timer / 60)}:{String(timer % 60).padStart(2, '0')}</span>
                            </div>

                            <Button
                                type="button"
                                variant="link"
                                onClick={handleResend}
                                disabled={!canResend || isLoading}
                                className="text-primary hover:text-primary/80"
                            >
                                {canResend ? "Resend Code" : `Resend available in ${timer}s`}
                            </Button>
                        </div>

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isLoading}
                        >
                            {isLoading ? "Verifying..." : "Verify Code"}
                        </Button>
                    </form>
                </CardContent>

                <CardFooter className="flex flex-col">
                    <p className="text-center text-sm text-muted-foreground">
                        Need to change email?{" "}
                        <Link href="/register" className="text-primary font-medium hover:underline">
                            Go back to registration
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    )
}

export default VerifyCode