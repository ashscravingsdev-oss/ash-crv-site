"use client";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Cookies from 'js-cookie';

// Define validation schema with Zod
const loginSchema = z.object({
    email: z
        .string()
        .min(1, "Email is required")
        .email("Please enter a valid email address"),
    password: z
        .string()
        .min(1, "Password is required")
        .min(6, "Password must be at least 6 characters"),
    remember: z.boolean().optional(),
});

export default function LoginPage() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
        clearErrors,
        control
    } = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
            remember: false,
        },
    });

    const onSubmit = async (data) => {
        try {
            Cookies.set('isLoggedIn', 'true', {
                expires: 7,
                secure: true,
                sameSite: 'strict'
            });
            Cookies.set('user', JSON.stringify({
                email: data.email,
            }), { expires: 7 });
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // Redirect on success
            window.location.href = "/account";

        } catch (error) {
            // Handle API errors
            setError("root", {
                type: "manual",
                message: "Login failed. Please check your credentials.",
            });
        }
    };

    // Handle input change to clear errors
    const handleInputChange = (fieldName) => {
        if (errors[fieldName]) {
            clearErrors(fieldName);
        }
    };

    return (
        <div className="container mx-auto px-4 pt-16">
            <Card className="max-w-md mx-auto">
                <CardHeader className="text-center">
                    <CardTitle className="text-3xl">Welcome Back</CardTitle>
                    <CardDescription>Sign in to your FreshPrep account</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {/* Email field with React Hook Form validation */}
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

                        {/* Password field with React Hook Form validation */}
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
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

                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <Controller
                                    name="remember"
                                    control={control}
                                    defaultValue={false}
                                    render={({ field }) => (
                                        <Checkbox
                                            id="remember"
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    )}
                                />
                                <Label htmlFor="remember" className="text-sm cursor-pointer">
                                    Remember me
                                </Label>

                            </div>
                            <Link
                                href="/forgot-password"
                                className="text-sm text-primary hover:underline"
                            >
                                Forgot password?
                            </Link>
                        </div>

                        <Button
                            type="submit"
                            size="lg"
                            className="w-full"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Signing in..." : "Sign In"}
                        </Button>
                    </form>

                    <div className="mt-6 text-center text-sm">
                        <span className="text-muted-foreground">
                            Don't have an account?{" "}
                        </span>
                        <Link
                            href="/register"
                            className="text-primary font-medium hover:underline"
                        >
                            Sign up
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}