"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Save, CheckCircle, AlertCircle, ShieldAlert } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { updateUserProfile } from "@/store/authSlice";
import Cookies from "js-cookie";

// ──────────────────────────────────────
// Zod validation schema
// ──────────────────────────────────────
const profileSchema = z.object({
    username: z
        .string()
        .transform((val) => (val === "" ? undefined : val))
        .optional()
        .refine((val) => !val || val.length >= 2, {
            message: "Username must be at least 2 characters",
        }),
    email: z
        .string()
        .transform((val) => (val === "" ? undefined : val))
        .optional()
        .refine((val) => !val || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
            message: "Please enter a valid email address",
        }),
    phone: z.string().optional(),
});

// ──────────────────────────────────────
// Component
// ──────────────────────────────────────
const Profile = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    // Redux state
    const [user, setUser] = useState(null);
    // Local UI states
    const [isLoading, setIsLoading] = useState(false);
    const [apiError, setApiError] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");

    // React Hook Form
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        clearErrors,
        reset,
    } = useForm({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            username: "",
            email: "",
            phone: "",
        },
    });

    useEffect(() => {
        const userCookie = Cookies.get("user");
        if (userCookie) {
            const parsedUser = JSON.parse(userCookie);
            setUser(userCookie ? JSON.parse(userCookie) : null);
            reset({
                username: parsedUser.username || "",
                email: parsedUser.email || "",
                phone: parsedUser.phone || "",
            });
        }
    }, [reset]);

    // ──────────────────────────────────
    // Clear errors on field change
    // ──────────────────────────────────
    const handleFieldChange = (fieldName) => {
        if (errors[fieldName]) clearErrors(fieldName);
        if (apiError) setApiError(null);
        if (successMessage) setSuccessMessage("");
    };

    // ──────────────────────────────────
    // Submit handler
    // ──────────────────────────────────
    const onSubmit = async (data) => {
        setIsLoading(true);
        setApiError(null);
        setSuccessMessage("");

        try {
            // Only send non‑empty fields
            const payload = {};
            if (data.username) payload.username = data.username;
            if (data.email) payload.email = data.email;
            if (data.phone) payload.phone = data.phone;

            await dispatch(updateUserProfile(payload)).unwrap();
            setSuccessMessage("Profile updated successfully.");
        } catch (error) {
            let message = "Failed to update profile. Please try again.";

            if (typeof error === "string") message = error;
            else if (error?.message) message = error.message;
            else if (error?.error) message = error.error;

            setApiError(message);

            // Map field‑level errors from API
            if (error?.field === "email") {
                setError("email", { type: "manual", message });
            } else if (error?.field === "username") {
                setError("username", { type: "manual", message });
            } else if (error?.field === "phone") {
                setError("phone", { type: "manual", message });
            }
        } finally {
            setIsLoading(false);
        }
    };

    // ──────────────────────────────────
    // Guard: if not authenticated, show nothing (or redirect)
    // ──────────────────────────────────
    if (!user) return null;

    const isVerified = user.is_verified;

    return (
        <Card>
            <CardHeader>
                {/* Header with verify button on the right */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <CardTitle>Personal Information</CardTitle>
                        <CardDescription>
                            Update your personal details and contact information
                        </CardDescription>
                    </div>

                    {!isVerified && (
                        <Button
                            variant="outline"
                            size="sm"
                            className="gap-2 self-start sm:self-auto"
                            onClick={() =>
                                router.push(`/verify-code?email=${encodeURIComponent(user.email)}`)
                            }
                        >
                            <ShieldAlert className="h-4 w-4" />
                            Verify Your Account
                        </Button>
                    )}
                </div>
            </CardHeader>

            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* ── Success & Error alerts ── */}
                    {successMessage && (
                        <Alert variant="success" className="bg-green-50 border-green-200">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <AlertDescription className="text-green-800">{successMessage}</AlertDescription>
                        </Alert>
                    )}

                    {apiError && (
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>{apiError}</AlertDescription>
                        </Alert>
                    )}

                    {/* ── Username ── */}
                    <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <Input
                            id="username"
                            placeholder="Your username"
                            {...register("username", {
                                onChange: () => handleFieldChange("username"),
                            })}
                            className={errors.username ? "border-red-500 focus-visible:ring-red-500" : ""}
                            disabled={isLoading}
                        />
                        {errors.username && (
                            <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
                        )}
                    </div>

                    {/* ── Email ── */}
                    <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            {...register("email", {
                                onChange: () => handleFieldChange("email"),
                            })}
                            className={errors.email ? "border-red-500 focus-visible:ring-red-500" : ""}
                            disabled
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                        )}
                    </div>

                    {/* ── Phone ── */}
                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                            id="phone"
                            type="tel"
                            placeholder="(123) 456-7890"
                            {...register("phone", {
                                onChange: () => handleFieldChange("phone"),
                            })}
                            className={errors.phone ? "border-red-500 focus-visible:ring-red-500" : ""}
                            disabled={isLoading}
                        />
                        {errors.phone && (
                            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                        )}
                    </div>

                    {/* ── Save button ── */}
                    <div className="flex justify-end pt-4">
                        <Button type="submit" disabled={isLoading} className="gap-2">
                            <Save className="h-4 w-4" />
                            {isLoading ? "Saving..." : "Save Changes"}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
};

export default Profile;