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
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { clearAuthErrors, signin } from "@/store/authSlice";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert"; // Add this if you have shadcn alert component

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
    const router = useRouter();
    const dispatch = useDispatch();
    const [apiError, setApiError] = useState(null);

    // Get auth state from Redux
    const { signinError, isAuthenticated, signinLoading } = useSelector((state) => state.auth);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        clearErrors,
        control,
        watch
    } = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
            remember: false,
        },
    });

    // Watch form fields to clear API error when user starts typing
    const emailValue = watch('email');
    const passwordValue = watch('password');

    // Redirect if already authenticated
    useEffect(() => {
        if (isAuthenticated) {
            router.push("/account");
        }
    }, [isAuthenticated, router]);

    // Handle API errors from Redux
    useEffect(() => {
        if (signinError) {
            // Parse error message
            let errorMessage = "Login failed. Please check your credentials.";

            if (typeof signinError === 'string') {
                errorMessage = signinError;
            } else if (signinError?.message) {
                errorMessage = signinError.message;
            } else if (signinError?.error) {
                errorMessage = signinError.error;
            }

            setApiError(errorMessage);

            // Optionally set field-specific errors based on API response
            if (signinError?.field === 'email') {
                setError('email', {
                    type: 'manual',
                    message: errorMessage
                });
            } else if (signinError?.field === 'password') {
                setError('password', {
                    type: 'manual',
                    message: errorMessage
                });
            }
        }
    }, [signinError, setError]);

    // Clear API error when user starts typing in any field
    useEffect(() => {
        if (emailValue || passwordValue) {
            setApiError(null);
            dispatch(clearAuthErrors());
        }
    }, [emailValue, passwordValue, dispatch]);

    // Clean up errors on unmount
    useEffect(() => {
        return () => {
            dispatch(clearAuthErrors());
        };
    }, [dispatch]);

    const onSubmit = async (data) => {
        try {
            // Clear any previous errors
            setApiError(null);
            dispatch(clearAuthErrors());

            // Dispatch signin action
            const result = await dispatch(signin({
                email: data.email,
                password: data.password
            }));

            // Check if signin was successful
            if (signin.fulfilled.match(result)) {
                // Redirect on success
                router.push("/account");
            }
        } catch (error) {
            // Handle unexpected errors
            setApiError("An unexpected error occurred. Please try again.");
        }
    };

    // Handle input change to clear field errors
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
                        {/* API Error Alert - Shows at the top of form */}
                        {apiError && (
                            <Alert variant="destructive" >
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription className="mt-1">
                                    {apiError}
                                </AlertDescription>
                            </Alert>
                        )}

                        {/* Email field with React Hook Form validation */}
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                {...register("email", {
                                    onChange: () => {
                                        handleInputChange("email");
                                        setApiError(null); // Clear API error on typing
                                        dispatch(clearAuthErrors());
                                    },
                                })}
                                className={errors.email ? "border-red-500 focus-visible:ring-red-500" : ""}
                                aria-invalid={errors.email ? "true" : "false"}
                                disabled={signinLoading}
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
                                    onChange: () => {
                                        handleInputChange("password");
                                        setApiError(null); // Clear API error on typing
                                        dispatch(clearAuthErrors());
                                    },
                                })}
                                className={errors.password ? "border-red-500 focus-visible:ring-red-500" : ""}
                                aria-invalid={errors.password ? "true" : "false"}
                                disabled={signinLoading}
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
                                            disabled={signinLoading}
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
                            disabled={signinLoading}
                        >
                            {signinLoading ? "Signing in..." : "Sign In"}
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