"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, CheckCircle2, Clock } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { sendOtp, verifyOtp } from "@/store/authSlice";

// Zod validation schema
const verifyCodeSchema = z.object({
    code: z
        .string()
        .min(1, "Verification code is required")
        .min(6, "Code must be at least 6 characters")
        .max(6, "Code must not exceed 6 characters"),
});

const VerifyCode = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const dispatch = useDispatch();

    // Local states
    const [isLoading, setIsLoading] = useState(false);
    const [isResending, setIsResending] = useState(false);
    const [apiError, setApiError] = useState(null);
    const [isSuccess, setIsSuccess] = useState(false);
    const [timer, setTimer] = useState(60);
    const [canResend, setCanResend] = useState(false);

    // Get email from URL
    const email = searchParams.get("email");

    // React Hook Form
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        clearErrors,
        watch,
    } = useForm({
        resolver: zodResolver(verifyCodeSchema),
        defaultValues: {
            code: "",
        },
    });

    // Timer for resend button
    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(interval);
        } else {
            setCanResend(true);
        }
    }, [timer]);

    // Redirect if no email
    useEffect(() => {
        if (!email) {
            router.push("/forgot-password");
        }
    }, [email, router]);

    const onSubmit = async (data) => {
        setIsLoading(true);
        setApiError(null);

        try {
            await dispatch(verifyOtp({
                email: email,
                otp: data.code,
            })).unwrap();

            setIsSuccess(true);
        } catch (error) {
            let errorMessage = "Verification failed. Please check the code and try again.";

            if (typeof error === "string") errorMessage = error;
            else if (error?.message) errorMessage = error.message;
            else if (error?.error) errorMessage = error.error;

            setApiError(errorMessage);

            if (error?.field === "code" || error?.field === "otp") {
                setError("code", {
                    type: "manual",
                    message: errorMessage,
                });
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleResend = async () => {
        if (!canResend) return;

        setIsResending(true);
        setApiError(null);
        setCanResend(false);

        try {
            await dispatch(sendOtp(email)).unwrap();
            setTimer(60);
        } catch (error) {
            let errorMessage = "Failed to resend code. Please try again.";

            if (typeof error === "string") errorMessage = error;
            else if (error?.message) errorMessage = error.message;

            setApiError(errorMessage);
            setCanResend(true);
        } finally {
            setIsResending(false);
        }
    };

    const handleInputChange = () => {
        if (errors.code) clearErrors("code");
        if (apiError) setApiError(null);
    };

    // Guard: if no email, don't render
    if (!email) return null;

    // Success state
    if (isSuccess) {
        return (
            <div className="container mx-auto px-4 pt-16">
                <Card className="max-w-md mx-auto">
                    <CardHeader className="text-center">
                        <div className="flex justify-center mb-4">
                            <CheckCircle2 className="h-16 w-16 text-green-500" />
                        </div>
                        <CardTitle className="text-3xl">Email Verified</CardTitle>
                        <CardDescription>
                            Your email has been verified successfully.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="text-center space-y-4">
                        <p className="text-muted-foreground">
                            Your account is now fully activated.
                        </p>
                        <Button
                            onClick={() => router.push("/account")}
                            className="w-full"
                            size="lg"
                        >
                            Go to Account
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
                    <CardTitle className="text-3xl">Verify Your Account</CardTitle>
                    <CardDescription>
                        Enter the verification code sent to
                        {email && (
                            <span className="block text-sm font-medium text-primary mt-1">
                                {email}
                            </span>
                        )}
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* API Error Alert */}
                        {apiError && (
                            <Alert variant="destructive">
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription className="mt-1">
                                    {apiError}
                                </AlertDescription>
                            </Alert>
                        )}

                        {/* Verification Code Input */}
                        <div className="space-y-2">
                            <Label htmlFor="code">Verification Code</Label>
                            <Input
                                id="code"
                                type="text"
                                placeholder="Enter verification code"
                                maxLength={6}
                                {...register("code", {
                                    onChange: () => handleInputChange(),
                                })}
                                className={errors.code ? "border-red-500 focus-visible:ring-red-500" : ""}
                                aria-invalid={errors.code ? "true" : "false"}
                                disabled={isLoading || isResending}
                                autoComplete="one-time-code"
                            />
                            {errors.code && (
                                <p className="text-red-500 text-sm mt-1" role="alert">
                                    {errors.code.message}
                                </p>
                            )}
                        </div>

                        {/* Timer & Resend */}
                        <div className="text-center space-y-2">
                            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                                <Clock className="h-4 w-4" />
                                {canResend ? (
                                    <span>Didn't receive the code?</span>
                                ) : (
                                    <span>
                                        Resend code in {Math.floor(timer / 60)}:
                                        {String(timer % 60).padStart(2, "0")}
                                    </span>
                                )}
                            </div>

                            <Button
                                type="button"
                                variant="link"
                                onClick={handleResend}
                                disabled={!canResend || isResending || isLoading}
                                className="text-primary hover:text-primary/80"
                            >
                                {isResending ? "Sending..." : "Resend Code"}
                            </Button>
                        </div>

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isLoading || isResending}
                        >
                            {isLoading ? "Verifying..." : "Verify Email"}
                        </Button>
                    </form>
                </CardContent>

                <CardFooter className="flex justify-center">
                    <p className="text-center text-sm text-muted-foreground">
                        Need to change email?{" "}
                        <Button
                            variant="link"
                            className="p-0 h-auto font-medium"
                            onClick={() => router.push("/register")}
                        >
                            Go back to registration
                        </Button>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
};

export default VerifyCode;