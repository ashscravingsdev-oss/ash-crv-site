"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Lock, Loader2, AlertCircle, Info } from "lucide-react"

const SQUARE_SCRIPT_TIMEOUT = 15000;

const PaymentMethod = ({ onSquareReady, onPaymentError, requiresAdminApproval = false, }) => {
    const [squareLoading, setSquareLoading] = useState(true);
    const [squareError, setSquareError] = useState(null);
    const cardContainerRef = useRef(null);
    const cardRef = useRef(null);
    const [isMounted, setIsMounted] = useState(false);

    // 1. Wait for the component to mount first
    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (!isMounted) return;

        let timeoutId;
        let scriptElement;
        let active = true; // Prevents updating state if component unmounts mid-async

        const initSquare = async () => {
            try {
                const appId = process.env.NEXT_PUBLIC_SQUARE_APPLICATION_ID;
                const locationId = process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID;

                if (!appId || !locationId) {
                    throw new Error("Square credentials not configured");
                }

                // Fail fast if the user completely lacks an internet/DNS connection
                if (typeof window !== 'undefined' && !navigator.onLine) {
                    throw new Error("Network connection unavailable. Failed to reach Square.");
                }

                // 2. Load Square SDK safely (Check if already available globally)
                if (!window.Square) {
                    const sdkUrl = process.env.NEXT_PUBLIC_SQUARE_SDK_URL || 'https://sandbox.web.squarecdn.com/v1/square.js';

                    // Check if an existing script tag is already trying to load it
                    let existingScript = document.querySelector(`script[src="${sdkUrl}"]`);

                    if (!existingScript) {
                        scriptElement = document.createElement('script');
                        scriptElement.src = sdkUrl;
                        scriptElement.async = true;
                        document.head.appendChild(scriptElement);
                    } else {
                        scriptElement = existingScript;
                    }

                    await new Promise((resolve, reject) => {
                        timeoutId = setTimeout(() => {
                            reject(new Error(`Square SDK failed to load after ${SQUARE_SCRIPT_TIMEOUT / 1000} seconds due to network or DNS resolution issues.`));
                        }, SQUARE_SCRIPT_TIMEOUT);

                        // If script already finished loading before this effect ran
                        if (window.Square) {
                            clearTimeout(timeoutId);
                            resolve();
                            return;
                        }

                        scriptElement.addEventListener('load', () => {
                            clearTimeout(timeoutId);
                            resolve();
                        });

                        scriptElement.addEventListener('error', () => {
                            clearTimeout(timeoutId);
                            reject(new Error('Failed to load Square payment SDK script due to network blocking. Check your DNS, VPN, or Adblocker.'));
                        });
                    });
                }

                // Check if component unmounted while we were waiting for the script promise
                if (!active) return;

                const payments = window.Square.payments(appId, locationId);
                const card = await payments.card();
                cardRef.current = card;

                if (cardContainerRef.current) {
                    await card.attach(cardContainerRef.current);
                } else {
                    throw new Error('Card container reference not found in DOM');
                }

                if (active) {
                    setSquareLoading(false);
                    if (onSquareReady) {
                        onSquareReady({
                            tokenize: async () => {
                                const result = await card.tokenize();
                                if (result.status === 'OK') {
                                    return {
                                        token: result.token,
                                        cardBrand: result.card?.cardBrand,
                                        lastFour: result.card?.lastFour,
                                        expMonth: result.card?.expMonth,
                                        expYear: result.card?.expYear,
                                    };
                                } else {
                                    throw new Error(result.errors?.[0]?.detail || 'Card tokenization failed');
                                }
                            }
                        });
                    }
                }
            } catch (error) {
                console.error("Square initialization error captured:", error);
                if (active) {
                    setSquareError(error.message || "Failed to initialize payment system");
                    setSquareLoading(false);
                    if (onPaymentError) {
                        onPaymentError(error.message);
                    }
                }
            }
        };

        initSquare();

        return () => {
            active = false;
            clearTimeout(timeoutId);

            // Clean up the card element instance 
            if (cardRef.current) {
                try {
                    cardRef.current.destroy();
                    cardRef.current = null;
                } catch (e) {
                    console.warn("Error destroying card instance:", e);
                }
            }
            // Note: We deliberately do not remove the script element here anymore. 
            // Keeping it in the head once loaded prevents duplicate script appending issues across re-renders.
        };
    }, [isMounted]);
    // ✅ Always render the container — just show/hide content
    return (
        <Card>
            <CardHeader>
                <CardTitle>Secure Payment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Loading State */}
                {squareLoading && (
                    <div className="flex justify-center py-12">
                        <div className="text-center">
                            <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-3" />
                            <p className="text-muted-foreground">Loading secure payment form...</p>
                        </div>
                    </div>
                )}

                {/* Error State */}
                {squareError && (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{squareError}</AlertDescription>
                    </Alert>
                )}

                {/* Admin Approval Notice */}
                {requiresAdminApproval && (
                    <Alert variant="default" className="bg-blue-50 border-blue-200 text-blue-800">
                        <Info className="h-4 w-4" />
                        <AlertDescription>
                            Your payment information is saved securely. You will only be charged after your order is approved.
                        </AlertDescription>
                    </Alert>
                )}

                {/* Square Card Container — ALWAYS in DOM */}
                <div
                    ref={cardContainerRef}
                    className="min-h-[100px] border rounded-lg p-4 bg-white"
                />

                {/* Security Message */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground pt-4 border-t">
                    <Lock className="h-4 w-4" />
                    <span>Your payment information is encrypted and secure</span>
                </div>
            </CardContent>
        </Card>
    );
};

export default PaymentMethod;