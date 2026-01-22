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
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Define validation schema with Zod
const forgotPasswordSchema = z.object({
    email: z
        .string()
        .min(1, "Email is required")
        .email("Please enter a valid email address"),
});

function ForgotPassword() {

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
        clearErrors,
    } = useForm({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: "",
        },
    });

    const onSubmit = async (data) => {
        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000));
             window.location.href = "/verify-code";
        } catch (error) {
            // Handle API errors
            setError("root", {
                type: "manual",
                message: "Failed to send reset email. Please try again.",
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
                    <CardTitle className="text-3xl">Forgot Password</CardTitle>
                    <CardDescription>
                        Enter your email to reset your password
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
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

                        <div className="space-y-3">
                            <Button
                                type="submit"
                                size="lg"
                                className="w-full"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Sending..." : "Send Reset Link"}
                            </Button>

                            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                                <p className="text-sm text-gray-600">
                                    Enter the email address associated with your FreshPrep account,
                                    and we'll send you a link to reset your password.
                                </p>
                            </div>
                        </div>
                    </form>
                    {/* Back to login link */}
                    <div className="mt-6 text-center text-sm">
                        <span className="text-muted-foreground">
                            Remember your password?{" "}
                        </span>
                        <Link
                            href="/login"
                            className="text-primary font-medium hover:underline"
                        >
                            Back to login
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div >
    );
}
export default ForgotPassword