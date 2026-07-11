"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Lock, Loader2, AlertCircle } from "lucide-react"

const PaymentMethod = ({
    onSquareReady,
    onPaymentError
}) => {
    const [squareLoading, setSquareLoading] = useState(true);
    const [squareError, setSquareError] = useState(null);
    const cardContainerRef = useRef(null);
    const squareInstanceRef = useRef(null);
    const cardRef = useRef(null);

    useEffect(() => {
        const initSquare = async () => {
            try {
                // Load Square Web Payments SDK
                if (!window.Square) {
                    const script = document.createElement('script');
                    script.src = process.env.NEXT_PUBLIC_SQUARE_SDK_URL || 'https://sandbox.web.squarecdn.com/v1/square.js';
                    script.async = true;

                    await new Promise((resolve, reject) => {
                        script.onload = resolve;
                        script.onerror = reject;
                        document.head.appendChild(script);
                    });
                }

                // Initialize Square
                const appId = process.env.NEXT_PUBLIC_SQUARE_APPLICATION_ID;
                const locationId = process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID;

                if (!appId || !locationId) {
                    throw new Error("Square credentials not configured");
                }

                const payments = window.Square.payments(appId, locationId);
                squareInstanceRef.current = payments;

                // Initialize Card Secure Payment
                const card = await payments.card();
                cardRef.current = card;

                // Mount card element
                if (cardContainerRef.current) {
                    await card.attach('#card-container');
                }

                setSquareLoading(false);

                // Notify parent that Square is ready
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

        // Cleanup
        return () => {
            if (cardRef.current) {
                cardRef.current.destroy();
            }
        };
    }, []);

    if (squareLoading) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Secure Payment</CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center py-12">
                    <div className="text-center">
                        <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-3" />
                        <p className="text-muted-foreground">Loading secure payment form...</p>
                    </div>
                </CardContent>
            </Card>
        );
    }

    if (squareError) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Secure Payment</CardTitle>
                </CardHeader>
                <CardContent>
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                            {squareError}
                        </AlertDescription>
                    </Alert>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Secure Payment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Square Card Element */}
                <div
                    id="card-container"
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