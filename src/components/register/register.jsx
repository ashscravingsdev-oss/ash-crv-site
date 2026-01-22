"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import Cookies from 'js-cookie';

// Define validation schema with Zod
const registerSchema = z.object({
    firstName: z
        .string()
        .min(1, "First name is required")
        .min(2, "First name must be at least 2 characters")
        .regex(/^[A-Za-z\s]+$/, "First name can only contain letters"),

    lastName: z
        .string()
        .min(1, "Last name is required")
        .min(2, "Last name must be at least 2 characters")
        .regex(/^[A-Za-z\s]+$/, "Last name can only contain letters"),

    email: z
        .string()
        .min(1, "Email is required")
        .email("Please enter a valid email address"),

    password: z
        .string()
        .min(1, "Password is required")
        .min(8, "Password must be at least 8 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),

    confirmPassword: z.string().min(1, "Please confirm your password"),

    terms: z.boolean().refine(val => val === true, {
        message: "You must accept the terms and conditions",
    }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

// Infer TypeScript type from schema
const Register = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
        clearErrors,
        watch,
        control
    } = useForm({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
            terms: false,
        },
    });

    // Watch password for real-time confirmation validation
    const password = watch("password")

    const onSubmit = async (data) => {
        try {
            Cookies.set('isLoggedIn', 'true', {
                expires: 7,
                secure: true,
                sameSite: 'strict'
            });
            Cookies.set('user', JSON.stringify({
                email: data.email,
                name: data.firstName
            }), { expires: 7 });
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000))

            // Redirect on success
            window.location.href = "/account"

        } catch (error) {
            // Handle API errors
            setError("root", {
                type: "manual",
                message: "Registration failed. Please try again.",
            })
        }
    };

    // Handle input change to clear errors
    const handleInputChange = (fieldName) => {
        if (errors[fieldName]) {
            clearErrors(fieldName)
        }
    };

    return (
        <div className="container mx-auto px-4 pt-16">
            <Card className="max-w-md mx-auto">
                <CardHeader className="text-center">
                    <CardTitle className="text-3xl">Create Account</CardTitle>
                    <CardDescription>Join FreshPrep and start your healthy journey</CardDescription>
                </CardHeader>
                <CardContent>
                    {/* Root/General error message */}
                    {errors.root && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-red-700 text-sm">{errors.root.message}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="firstName">First Name</Label>
                                <Input
                                    id="firstName"
                                    placeholder="John"
                                    {...register("firstName", {
                                        onChange: () => handleInputChange("firstName"),
                                    })}
                                    className={errors.firstName ? "border-red-500 focus-visible:ring-red-500" : ""}
                                    aria-invalid={errors.firstName ? "true" : "false"}
                                />
                                {errors.firstName && (
                                    <p className="text-red-500 text-sm mt-1" role="alert">
                                        {errors.firstName.message}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="lastName">Last Name</Label>
                                <Input
                                    id="lastName"
                                    placeholder="Doe"
                                    {...register("lastName", {
                                        onChange: () => handleInputChange("lastName"),
                                    })}
                                    className={errors.lastName ? "border-red-500 focus-visible:ring-red-500" : ""}
                                    aria-invalid={errors.lastName ? "true" : "false"}
                                />
                                {errors.lastName && (
                                    <p className="text-red-500 text-sm mt-1" role="alert">
                                        {errors.lastName.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                {...register("email", {
                                    onChange: () => handleInputChange("email"),
                                })}
                                className={errors.email ? "border-red-500 focus-visible:ring-red-500" : ""}
                                aria-invalid={errors.email ? "true" : "false"}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1" role="alert">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Create a password"
                                {...register("password", {
                                    onChange: () => handleInputChange("password"),
                                })}
                                className={errors.password ? "border-red-500 focus-visible:ring-red-500" : ""}
                                aria-invalid={errors.password ? "true" : "false"}
                            />
                            {errors.password && (
                                <p className="text-red-500 text-sm mt-1" role="alert">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                            <Input
                                id="confirmPassword"
                                type="password"
                                placeholder="Confirm your password"
                                {...register("confirmPassword", {
                                    onChange: () => handleInputChange("confirmPassword"),
                                })}
                                className={errors.confirmPassword ? "border-red-500 focus-visible:ring-red-500" : ""}
                                aria-invalid={errors.confirmPassword ? "true" : "false"}
                            />
                            {errors.confirmPassword && (
                                <p className="text-red-500 text-sm mt-1" role="alert">
                                    {errors.confirmPassword.message}
                                </p>
                            )}
                        </div>

                        <div className="flex items-start space-x-2">
                            <Controller
                                name="terms"
                                control={control}   // comes from useForm()
                                defaultValue={false}
                                render={({ field }) => (
                                    <Checkbox
                                        id="terms"
                                        checked={field.value}           // ✅ Controlled value
                                        onCheckedChange={field.onChange} // ✅ Updates form state
                                        className={errors.terms ? "border-red-500 mt-1" : "mt-1"}
                                    />
                                )}
                            />
                            <div  >
                                <Label htmlFor="terms" className="text-sm cursor-pointer leading-relaxed">
                                    I agree to the{" "}
                                    <Link href="/terms" className="text-primary hover:underline">
                                        Terms of Service
                                    </Link>{" "}
                                    and{" "}
                                    <Link href="/privacy" className="text-primary hover:underline">
                                        Privacy Policy
                                    </Link>
                                </Label>
                                {errors.terms && (
                                    <p className="text-red-500 text-sm mt-1" role="alert">
                                        {errors.terms.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        <Button
                            type="submit"
                            size="lg"
                            className="w-full"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Creating Account..." : "Create Account"}
                        </Button>
                    </form>

                    <div className="mt-6 text-center text-sm">
                        <span className="text-muted-foreground">Already have an account? </span>
                        <Link href="/login" className="text-primary font-medium hover:underline">
                            Sign in
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default Register