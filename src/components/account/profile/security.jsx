"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Save, Eye, EyeOff, AlertCircle, CheckCircle2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { updateUserPassword } from "@/store/authSlice";

// Zod validation schema
const passwordSchema = z
    .object({
        oldPassword: z.string().min(1, "Current password is required"),
        newPassword: z
            .string()
            .min(1, "New password is required")
            .min(8, "Password must be at least 8 characters")
            .regex(/[A-Z]/, "Must contain at least one uppercase letter")
            .regex(/[a-z]/, "Must contain at least one lowercase letter")
            .regex(/[0-9]/, "Must contain at least one number"),
        confirmPassword: z.string().min(1, "Please confirm your new password"),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    })
    .refine((data) => data.oldPassword !== data.newPassword, {
        message: "New password must be different from current password",
        path: ["newPassword"],
    });

const Security = () => {
    const dispatch = useDispatch();

    // Local UI states
    const [isLoading, setIsLoading] = useState(false);
    const [apiError, setApiError] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");

    // Toggle visibility for each field independently
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // React Hook Form
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        clearErrors,
        reset,
    } = useForm({
        resolver: zodResolver(passwordSchema),
        defaultValues: {
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
    });

    // Clear errors on field change
    const handleFieldChange = (fieldName) => {
        if (errors[fieldName]) clearErrors(fieldName);
        if (apiError) setApiError(null);
        if (successMessage) setSuccessMessage("");
    };

    const onSubmit = async (data) => {
        setIsLoading(true);
        setApiError(null);
        setSuccessMessage("");

        try {
            await dispatch(
                updateUserPassword({
                    oldPassword: data.oldPassword,
                    newPassword: data.newPassword,
                })
            ).unwrap();

            setSuccessMessage("Password updated successfully.");
            reset(); // Clear the form
        } catch (error) {
            let message = "Failed to update password. Please try again.";

            if (typeof error === "string") message = error;
            else if (error?.message) message = error.message;
            else if (error?.error) message = error.error;

            setApiError(message);

            // Field-level errors from API
            if (error?.field === "oldPassword") {
                setError("oldPassword", { type: "manual", message });
            } else if (error?.field === "newPassword") {
                setError("newPassword", { type: "manual", message });
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Password & Security</CardTitle>
                <CardDescription>
                    Change your password and manage security settings
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Success & Error alerts */}
                    {successMessage && (
                        <Alert className="bg-green-50 border-green-200">
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                            <AlertDescription className="text-green-800">
                                {successMessage}
                            </AlertDescription>
                        </Alert>
                    )}

                    {apiError && (
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>{apiError}</AlertDescription>
                        </Alert>
                    )}

                    {/* Current Password */}
                    <div className="space-y-2">
                        <Label htmlFor="oldPassword">Current Password</Label>
                        <div className="relative">
                            <Input
                                id="oldPassword"
                                type={showOldPassword ? "text" : "password"}
                                placeholder="Enter current password"
                                {...register("oldPassword", {
                                    onChange: () => handleFieldChange("oldPassword"),
                                })}
                                className={
                                    errors.oldPassword
                                        ? "border-red-500 focus-visible:ring-red-500 pr-10"
                                        : "pr-10"
                                }
                                disabled={isLoading}
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-7 w-7 p-0"
                                onClick={() => setShowOldPassword(!showOldPassword)}
                                tabIndex={-1}
                            >
                                {showOldPassword ? (
                                    <EyeOff className="h-4 w-4" />
                                ) : (
                                    <Eye className="h-4 w-4" />
                                )}
                            </Button>
                        </div>
                        {errors.oldPassword && (
                            <p className="text-red-500 text-sm mt-1">{errors.oldPassword.message}</p>
                        )}
                    </div>

                    {/* New Password */}
                    <div className="space-y-2">
                        <Label htmlFor="newPassword">New Password</Label>
                        <div className="relative">
                            <Input
                                id="newPassword"
                                type={showNewPassword ? "text" : "password"}
                                placeholder="Enter new password"
                                {...register("newPassword", {
                                    onChange: () => handleFieldChange("newPassword"),
                                })}
                                className={
                                    errors.newPassword
                                        ? "border-red-500 focus-visible:ring-red-500 pr-10"
                                        : "pr-10"
                                }
                                disabled={isLoading}
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-7 w-7 p-0"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                                tabIndex={-1}
                            >
                                {showNewPassword ? (
                                    <EyeOff className="h-4 w-4" />
                                ) : (
                                    <Eye className="h-4 w-4" />
                                )}
                            </Button>
                        </div>
                        {errors.newPassword && (
                            <p className="text-red-500 text-sm mt-1">{errors.newPassword.message}</p>
                        )}
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mt-2">
                            <p className="text-xs font-medium text-gray-700 mb-1">
                                Password requirements:
                            </p>
                            <ul className="text-xs text-gray-600 space-y-0.5">
                                <li>• At least 8 characters</li>
                                <li>• One uppercase letter</li>
                                <li>• One lowercase letter</li>
                                <li>• One number</li>
                            </ul>
                        </div>
                    </div>

                    {/* Confirm New Password */}
                    <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm New Password</Label>
                        <div className="relative">
                            <Input
                                id="confirmPassword"
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirm new password"
                                {...register("confirmPassword", {
                                    onChange: () => handleFieldChange("confirmPassword"),
                                })}
                                className={
                                    errors.confirmPassword
                                        ? "border-red-500 focus-visible:ring-red-500 pr-10"
                                        : "pr-10"
                                }
                                disabled={isLoading}
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-7 w-7 p-0"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                tabIndex={-1}
                            >
                                {showConfirmPassword ? (
                                    <EyeOff className="h-4 w-4" />
                                ) : (
                                    <Eye className="h-4 w-4" />
                                )}
                            </Button>
                        </div>
                        {errors.confirmPassword && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.confirmPassword.message}
                            </p>
                        )}
                    </div>

                    <div className="flex justify-end pt-4">
                        <Button type="submit" disabled={isLoading} className="gap-2">
                            <Save className="h-4 w-4" />
                            {isLoading ? "Updating..." : "Update Password"}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
};

export default Security;