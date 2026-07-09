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
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { resetPasswordWithOtp } from "@/store/authSlice";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Define validation schema with Zod
const resetPasswordSchema = z.object({
    code: z
        .string()
        .min(1, "Verification code is required")
        .min(6, "Code must be at least 6 characters"),
    password: z
        .string()
        .min(1, "Password is required")
        .min(8, "Password must be at least 8 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: z
        .string()
        .min(1, "Please confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

function ResetPassword() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [apiError, setApiError] = useState(null);
    const [isSuccess, setIsSuccess] = useState(false);

    // Get email from URL query params
    const email = searchParams.get('email');

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        clearErrors,
        watch
    } = useForm({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            code: "",
            password: "",
            confirmPassword: "",
        },
    });

    // Redirect to forgot-password if no email found
    useEffect(() => {
        if (!email) {
            router.push("/forgot-password");
        }
    }, [email, router]);

    const onSubmit = async (data) => {
        setIsLoading(true);
        setApiError(null);

        try {
            await dispatch(resetPasswordWithOtp({
                email: email,
                otp: data.code,
                newPassword: data.password,
            })).unwrap();

            // Show success state
            setIsSuccess(true);
        } catch (error) {
            let errorMessage = "Failed to reset password. Please try again.";

            if (typeof error === 'string') {
                errorMessage = error;
            } else if (error?.message) {
                errorMessage = error.message;
            } else if (error?.error) {
                errorMessage = error.error;
            }

            setApiError(errorMessage);

            // Set field-specific errors based on API response
            if (error?.field === 'code' || error?.field === 'otp') {
                setError('code', {
                    type: 'manual',
                    message: errorMessage
                });
            } else if (error?.field === 'password') {
                setError('password', {
                    type: 'manual',
                    message: errorMessage
                });
            }
        } finally {
            setIsLoading(false);
        }
    };

    // Handle input change to clear field errors
    const handleInputChange = (fieldName) => {
        if (errors[fieldName]) {
            clearErrors(fieldName);
        }
        if (apiError) {
            setApiError(null);
        }
    };

    // If no email, don't render the form (will redirect)
    if (!email) {
        return null;
    }

    // Success state
    if (isSuccess) {
        return (
            <div className="container mx-auto px-4 pt-16">
                <Card className="max-w-md mx-auto">
                    <CardHeader className="text-center">
                        <div className="flex justify-center mb-4">
                            <CheckCircle2 className="h-16 w-16 text-green-500" />
                        </div>
                        <CardTitle className="text-3xl">Password Reset Successful</CardTitle>
                        <CardDescription>
                            Your password has been updated successfully.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="text-center space-y-4">
                        <p className="text-muted-foreground">
                            You can now sign in with your new password.
                        </p>
                        <Button
                            onClick={() => router.push("/login")}
                            className="w-full"
                            size="lg"
                        >
                            Go to Login
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 pt-16">
            <Card className="max-w-md mx-auto">
                <CardHeader className="text-center">
                    <CardTitle className="text-3xl">Reset Password</CardTitle>
                    <CardDescription>
                        Enter the verification code sent to your email
                        {email && (
                            <span className="block text-sm font-medium text-primary mt-1">
                                {email}
                            </span>
                        )}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {/* API Error Alert */}
                        {apiError && (
                            <Alert variant="destructive">
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription className="mt-1">
                                    {apiError}
                                </AlertDescription>
                            </Alert>
                        )}

                        {/* Verification Code */}
                        <div className="space-y-2">
                            <Label htmlFor="code">Verification Code</Label>
                            <Input
                                id="code"
                                type="text"
                                placeholder="Enter 6-digit code"
                                maxLength={6}
                                {...register("code", {
                                    onChange: () => handleInputChange("code"),
                                })}
                                className={errors.code ? "border-red-500 focus-visible:ring-red-500" : ""}
                                aria-invalid={errors.code ? "true" : "false"}
                                disabled={isLoading}
                                autoComplete="one-time-code"
                            />
                            {errors.code && (
                                <p className="text-red-500 text-sm mt-1" role="alert">
                                    {errors.code.message}
                                </p>
                            )}
                        </div>

                        {/* New Password */}
                        <div className="space-y-2">
                            <Label htmlFor="password">New Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Enter new password"
                                {...register("password", {
                                    onChange: () => handleInputChange("password"),
                                })}
                                className={errors.password ? "border-red-500 focus-visible:ring-red-500" : ""}
                                aria-invalid={errors.password ? "true" : "false"}
                                disabled={isLoading}
                            />
                            {errors.password && (
                                <p className="text-red-500 text-sm mt-1" role="alert">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirm New Password</Label>
                            <Input
                                id="confirmPassword"
                                type="password"
                                placeholder="Confirm new password"
                                {...register("confirmPassword", {
                                    onChange: () => handleInputChange("confirmPassword"),
                                })}
                                className={errors.confirmPassword ? "border-red-500 focus-visible:ring-red-500" : ""}
                                aria-invalid={errors.confirmPassword ? "true" : "false"}
                                disabled={isLoading}
                            />
                            {errors.confirmPassword && (
                                <p className="text-red-500 text-sm mt-1" role="alert">
                                    {errors.confirmPassword.message}
                                </p>
                            )}
                        </div>

                        {/* Password Requirements */}
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                            <p className="text-sm font-medium text-gray-700 mb-2">
                                Password must contain:
                            </p>
                            <ul className="text-sm text-gray-600 space-y-1">
                                <li>• At least 8 characters</li>
                                <li>• One uppercase letter</li>
                                <li>• One lowercase letter</li>
                                <li>• One number</li>
                            </ul>
                        </div>

                        <Button
                            type="submit"
                            size="lg"
                            className="w-full"
                            disabled={isLoading}
                        >
                            {isLoading ? "Resetting Password..." : "Reset Password"}
                        </Button>
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
        </div>
    );
}
export default ResetPassword;