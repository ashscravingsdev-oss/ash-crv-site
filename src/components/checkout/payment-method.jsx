"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Lock, Loader2, AlertCircle } from "lucide-react"

const SQUARE_SCRIPT_TIMEOUT = 15000; // 15 seconds

const PaymentMethod = ({
    onSquareReady,
    onPaymentError
}) => {
    const [squareLoading, setSquareLoading] = useState(true);
    const [squareError, setSquareError] = useState(null);
    const cardContainerRef = useRef(null);
    const cardRef = useRef(null);

    useEffect(() => {
        let timeoutId;
        let scriptElement;

        const initSquare = async () => {
            try {
                const appId = process.env.NEXT_PUBLIC_SQUARE_APPLICATION_ID;
                const locationId = process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID;

                console.log('Square init - App ID exists:', !!appId, 'Location ID exists:', !!locationId);

                if (!appId || !locationId) {
                    throw new Error("Square credentials not configured. Check NEXT_PUBLIC_SQUARE_APPLICATION_ID and NEXT_PUBLIC_SQUARE_LOCATION_ID");
                }

                // Load Square SDK with timeout
                if (!window.Square) {
                    console.log('Loading Square SDK...');

                    const sdkUrl = process.env.NEXT_PUBLIC_SQUARE_SDK_URL || 'https://sandbox.web.squarecdn.com/v1/square.js';
                    console.log('Square SDK URL:', sdkUrl);

                    scriptElement = document.createElement('script');
                    scriptElement.src = sdkUrl;
                    scriptElement.async = true;

                    await new Promise((resolve, reject) => {
                        // Timeout fallback
                        timeoutId = setTimeout(() => {
                            reject(new Error(`Square SDK failed to load after ${SQUARE_SCRIPT_TIMEOUT / 1000} seconds. Check network connectivity.`));
                        }, SQUARE_SCRIPT_TIMEOUT);

                        scriptElement.onload = () => {
                            clearTimeout(timeoutId);
                            console.log('Square SDK loaded successfully');
                            resolve();
                        };

                        scriptElement.onerror = (err) => {
                            clearTimeout(timeoutId);
                            console.error('Square SDK load error:', err);
                            reject(new Error('Failed to load Square payment SDK. Please refresh the page.'));
                        };

                        document.head.appendChild(scriptElement);
                    });
                } else {
                    console.log('Square SDK already loaded');
                }

                // Initialize Square
                console.log('Initializing Square payments...');
                const payments = window.Square.payments(appId, locationId);

                // Initialize Card
                const card = await payments.card();
                cardRef.current = card;
                console.log('Square card initialized');

                // Mount card element
                const container = document.getElementById('card-container');
                if (!container) {
                    throw new Error('Card container not found in DOM');
                }

                await card.attach('#card-container');
                console.log('Card attached to container');

                setSquareLoading(false);

                // Notify parent
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
            clearTimeout(timeoutId);
            if (scriptElement && document.head.contains(scriptElement)) {
                document.head.removeChild(scriptElement);
            }
            if (cardRef.current) {
                try {
                    cardRef.current.destroy();
                } catch (e) {
                    // Ignore destroy errors
                }
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