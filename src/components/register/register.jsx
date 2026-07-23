"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { signup, clearAuthErrors } from "@/store/authSlice"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

const registerSchema = z.object({
    name: z
        .string()
        .min(1, "Name is required")
        .min(2, "Name must be at least 2 characters")
        .regex(/^[A-Za-z\s]+$/, "Name can only contain letters"),

    email: z
        .string()
        .min(1, "Email is required")
        .email("Please enter a valid email address"),

    phone: z
        .string()
        .min(1, "Phone number is required")
        .regex(/^\+?[\d\s\-\(\)]{7,15}$/, "Please enter a valid phone number"),

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

const Register = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [apiError, setApiError] = useState(null);

    const { signupError, signupLoading, signupSuccess, isAuthenticated } = useSelector((state) => state.auth);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        clearErrors,
        watch,
        control
    } = useForm({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            password: "",
            confirmPassword: "",
            terms: false,
        },
    });

    const password = watch("password");
    const nameValue = watch('name');
    const emailValue = watch('email');
    const phoneValue = watch('phone');
    const passwordValue = watch('password');
    const confirmPasswordValue = watch('confirmPassword');

    useEffect(() => {
        if (isAuthenticated) {
            router.push("/account");
        }
        if (signupSuccess) {
            router.push("/account");
        }
    }, [isAuthenticated, signupSuccess, router]);

    useEffect(() => {
        if (signupError) {
            // Default fallback message
            let errorMessage = "Registration failed. Please try again.";

            if (typeof signupError === 'string') {
                errorMessage = signupError;
            } else if (signupError?.message) {
                errorMessage = signupError.message;
            }

            // ── Handle structured express‑validator errors ──
            if (signupError?.errors && Array.isArray(signupError.errors)) {
                signupError.errors.forEach((err) => {
                    // Map each error path to the corresponding form field
                    switch (err.path) {
                        case 'email':
                            setError('email', { type: 'manual', message: err.msg });
                            break;
                        case 'username':
                        case 'name':
                            setError('name', { type: 'manual', message: err.msg });
                            break;
                        case 'phone':
                            setError('phone', { type: 'manual', message: err.msg });
                            break;
                        case 'password':
                            setError('password', { type: 'manual', message: err.msg });
                            break;
                        case 'confirmPassword':
                            setError('confirmPassword', { type: 'manual', message: err.msg });
                            break;
                        default:
                            // For other fields, just use the message as a general error
                            break;
                    }
                });

                // Use the first error as the general banner message if nothing else set
                if (signupError.errors.length > 0 && !errorMessage) {
                    errorMessage = signupError.errors[0].msg;
                }
            } else {
                // ── Fallback: old flat error object (if backend ever returns that) ──
                if (signupError?.field === 'email' || signupError?.email) {
                    setError('email', {
                        type: 'manual',
                        message: signupError.email || "Email already exists",
                    });
                }
                if (signupError?.field === 'username' || signupError?.username) {
                    setError('name', {
                        type: 'manual',
                        message: signupError.username || "Username already taken",
                    });
                }
                if (signupError?.field === 'phone' || signupError?.phone) {
                    setError('phone', {
                        type: 'manual',
                        message: signupError.phone || "Phone number already in use",
                    });
                }
            }

            setApiError(errorMessage);
        }
    }, [signupError, setError]);

    useEffect(() => {
        if (nameValue || emailValue || phoneValue || passwordValue || confirmPasswordValue) {
            setApiError(null);
            dispatch(clearAuthErrors());
        }
    }, [nameValue, emailValue, phoneValue, passwordValue, confirmPasswordValue, dispatch]);

    useEffect(() => {
        return () => {
            dispatch(clearAuthErrors());
        };
    }, [dispatch]);

    const onSubmit = async (data) => {
        try {
            setApiError(null);
            dispatch(clearAuthErrors());

            const result = await dispatch(signup({
                username: data.name,
                email: data.email,
                phone: data.phone,
                password: data.password
            }));

            if (signup.fulfilled.match(result)) {
                console.log("Signup successful");
            }
        } catch (error) {
            setApiError("An unexpected error occurred. Please try again.");
        }
    };

    const handleInputChange = (fieldName) => {
        if (errors[fieldName]) {
            clearErrors(fieldName);
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
                    {apiError && (
                        <Alert variant="destructive" className="mb-4">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>{apiError}</AlertDescription>
                        </Alert>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {/* Full Name */}
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                                id="name"
                                placeholder="John Doe"
                                {...register("name", {
                                    onChange: () => {
                                        handleInputChange("name");
                                        setApiError(null);
                                        dispatch(clearAuthErrors());
                                    },
                                })}
                                className={errors.name ? "border-red-500 focus-visible:ring-red-500" : ""}
                                aria-invalid={errors.name ? "true" : "false"}
                                disabled={signupLoading}
                            />
                            {errors.name && (
                                <p className="text-red-500 text-sm mt-1" role="alert">
                                    {errors.name.message}
                                </p>
                            )}
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                {...register("email", {
                                    onChange: () => {
                                        handleInputChange("email");
                                        setApiError(null);
                                        dispatch(clearAuthErrors());
                                    },
                                })}
                                className={errors.email ? "border-red-500 focus-visible:ring-red-500" : ""}
                                aria-invalid={errors.email ? "true" : "false"}
                                disabled={signupLoading}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1" role="alert">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        {/* Phone Number (NEW) */}
                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input
                                id="phone"
                                type="tel"
                                placeholder="+1 (555) 123-4567"
                                {...register("phone", {
                                    onChange: () => {
                                        handleInputChange("phone");
                                        setApiError(null);
                                        dispatch(clearAuthErrors());
                                    },
                                })}
                                className={errors.phone ? "border-red-500 focus-visible:ring-red-500" : ""}
                                aria-invalid={errors.phone ? "true" : "false"}
                                disabled={signupLoading}
                            />
                            {errors.phone && (
                                <p className="text-red-500 text-sm mt-1" role="alert">
                                    {errors.phone.message}
                                </p>
                            )}
                        </div>

                        {/* Password */}
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Create a password"
                                {...register("password", {
                                    onChange: () => {
                                        handleInputChange("password");
                                        setApiError(null);
                                        dispatch(clearAuthErrors());
                                    },
                                })}
                                className={errors.password ? "border-red-500 focus-visible:ring-red-500" : ""}
                                aria-invalid={errors.password ? "true" : "false"}
                                disabled={signupLoading}
                            />
                            {errors.password && (
                                <p className="text-red-500 text-sm mt-1" role="alert">
                                    {errors.password.message}
                                </p>
                            )}
                            <div className="text-xs text-gray-500 mt-1 space-y-1">
                                <p className={password?.length >= 8 ? "text-green-600" : ""}>• At least 8 characters</p>
                                <p className={/[A-Z]/.test(password) ? "text-green-600" : ""}>• One uppercase letter</p>
                                <p className={/[0-9]/.test(password) ? "text-green-600" : ""}>• One number</p>
                                <p className={/[^A-Za-z0-9]/.test(password) ? "text-green-600" : ""}>• One special character</p>
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                            <Input
                                id="confirmPassword"
                                type="password"
                                placeholder="Confirm your password"
                                {...register("confirmPassword", {
                                    onChange: () => {
                                        handleInputChange("confirmPassword");
                                        setApiError(null);
                                        dispatch(clearAuthErrors());
                                    },
                                })}
                                className={errors.confirmPassword ? "border-red-500 focus-visible:ring-red-500" : ""}
                                aria-invalid={errors.confirmPassword ? "true" : "false"}
                                disabled={signupLoading}
                            />
                            {errors.confirmPassword && (
                                <p className="text-red-500 text-sm mt-1" role="alert">
                                    {errors.confirmPassword.message}
                                </p>
                            )}
                        </div>

                        {/* Terms */}
                        <div className="flex items-start space-x-2">
                            <Controller
                                name="terms"
                                control={control}
                                defaultValue={false}
                                render={({ field }) => (
                                    <Checkbox
                                        id="terms"
                                        checked={field.value}
                                        onCheckedChange={(checked) => {
                                            field.onChange(checked);
                                            if (errors.terms) {
                                                clearErrors("terms");
                                            }
                                        }}
                                        className={errors.terms ? "border-red-500 mt-1" : "mt-1"}
                                        disabled={signupLoading}
                                    />
                                )}
                            />
                            <div>
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
                            disabled={signupLoading}
                        >
                            {signupLoading ? "Creating Account..." : "Create Account"}
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