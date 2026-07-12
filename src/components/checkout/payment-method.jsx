"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Lock, Loader2, AlertCircle } from "lucide-react"

const SQUARE_SCRIPT_TIMEOUT = 15000;

const PaymentMethod = ({
    onSquareReady,
    onPaymentError
}) => {
    const [squareLoading, setSquareLoading] = useState(true);
    const [squareError, setSquareError] = useState(null);
    const cardContainerRef = useRef(null);
    const cardRef = useRef(null);
    const [isMounted, setIsMounted] = useState(false);

    // ✅ Wait for the component to mount first
    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (!isMounted) return; // Don't run until the component is mounted

        let timeoutId;
        let scriptElement;

        const initSquare = async () => {
            try {
                const appId = process.env.NEXT_PUBLIC_SQUARE_APPLICATION_ID;
                const locationId = process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID;

                if (!appId || !locationId) {
                    throw new Error("Square credentials not configured");
                }

                // Load Square SDK
                if (!window.Square) {
                    const sdkUrl = process.env.NEXT_PUBLIC_SQUARE_SDK_URL || 'https://sandbox.web.squarecdn.com/v1/square.js';

                    scriptElement = document.createElement('script');
                    scriptElement.src = sdkUrl;
                    scriptElement.async = true;

                    await new Promise((resolve, reject) => {
                        timeoutId = setTimeout(() => {
                            reject(new Error(`Square SDK failed to load after ${SQUARE_SCRIPT_TIMEOUT / 1000} seconds`));
                        }, SQUARE_SCRIPT_TIMEOUT);

                        scriptElement.onload = () => {
                            clearTimeout(timeoutId);
                            resolve();
                        };

                        scriptElement.onerror = () => {
                            clearTimeout(timeoutId);
                            reject(new Error('Failed to load Square payment SDK'));
                        };

                        document.head.appendChild(scriptElement);
                    });
                }

                const payments = window.Square.payments(appId, locationId);
                const card = await payments.card();
                cardRef.current = card;

                // ✅ Use the ref instead of getElementById
                if (cardContainerRef.current) {
                    await card.attach(cardContainerRef.current);
                } else {
                    throw new Error('Card container not found in DOM');
                }

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
            } catch (error) {
                console.error("Square initialization error:", error);
                setSquareError(error.message || "Failed to initialize payment system");
                setSquareLoading(false);

                if (onPaymentError) {
                    onPaymentError(error.message);
                }
            }
        };

        initSquare();

        return () => {
            clearTimeout(timeoutId);
            if (scriptElement && document.head.contains(scriptElement)) {
                document.head.removeChild(scriptElement);
            }
            if (cardRef.current) {
                try {
                    cardRef.current.destroy();
                } catch (e) { }
            }
        };
    }, [isMounted]); // ✅ Depends on isMounted

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