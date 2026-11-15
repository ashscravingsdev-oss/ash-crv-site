"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Lock, Loader2, AlertCircle, Info } from "lucide-react"

const SQUARE_SCRIPT_TIMEOUT = 15000;

// The SDK must match the app ID: sandbox IDs only work with the sandbox SDK,
// production IDs only with the production one. Deriving it means switching
// Square to live only needs the new app + location IDs.
const sdkUrlFor = (appId) =>
    String(appId).startsWith("sandbox-")
        ? "https://sandbox.web.squarecdn.com/v1/square.js"
        : "https://web.squarecdn.com/v1/square.js";

const money = (n) => (Math.round(Number(n || 0) * 100) / 100).toFixed(2);

/**
 * Square card form, plus Apple Pay / Google Pay buttons when `walletsEnabled`.
 * Wallets are only for orders charged in full right now: a wallet payment
 * can't be saved to charge again later (deposits, subscriptions, approvals).
 *
 * `beforeWallet()` runs first, synchronously (Apple Pay must open straight
 * from the tap); return false to stop, e.g. when the form isn't filled in.
 * `onWalletToken({ token })` then places the order with the wallet's token.
 */
const PaymentMethod = ({
    onSquareReady,
    onPaymentError,
    requiresAdminApproval = false,
    amount = 0,
    walletsEnabled = false,
    beforeWallet,
    onWalletToken,
}) => {
    const [squareLoading, setSquareLoading] = useState(true);
    const [squareError, setSquareError] = useState(null);
    const cardContainerRef = useRef(null);
    const cardRef = useRef(null);
    const [isMounted, setIsMounted] = useState(false);
    const paymentsRef = useRef(null);
    const paymentRequestRef = useRef(null);
    const googlePayRef = useRef(null);
    const applePayRef = useRef(null);
    const googlePayContainerRef = useRef(null);
    const walletsStartedRef = useRef(false);
    const [googlePayReady, setGooglePayReady] = useState(false);
    const [applePayReady, setApplePayReady] = useState(false);
    const [walletBusy, setWalletBusy] = useState(false);

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
                    const sdkUrl = sdkUrlFor(appId);

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
                paymentsRef.current = payments;
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
            for (const ref of [cardRef, googlePayRef, applePayRef]) {
                if (ref.current) {
                    try {
                        ref.current.destroy();
                    } catch (e) {
                        console.warn("Error destroying Square payment method:", e);
                    }
                    ref.current = null;
                }
            }
            // Note: We deliberately do not remove the script element here anymore. 
            // Keeping it in the head once loaded prevents duplicate script appending issues across re-renders.
        };
    }, [isMounted]);

    // Apple Pay / Google Pay: set up once the card form is ready and wallets are allowed
    useEffect(() => {
        if (squareLoading || squareError || !walletsEnabled || walletsStartedRef.current) return;
        const payments = paymentsRef.current;
        if (!payments) return;
        walletsStartedRef.current = true;

        const paymentRequest = payments.paymentRequest({
            countryCode: "US",
            currencyCode: "USD",
            total: { amount: money(amount), label: "Ash's Cravings" },
        });
        paymentRequestRef.current = paymentRequest;

        // Each wallet sets itself up on its own, so a slow Google Pay
        // (common on iPhones and iPads) can never keep Apple Pay from showing
        ;(async () => {
            try {
                // Apple devices only (Safari, or any iPhone/iPad browser on iOS 16+)
                const applePay = await payments.applePay(paymentRequest);
                applePayRef.current = applePay;
                setApplePayReady(true);
            } catch (e) {
                console.info("Apple Pay isn't available here:", e?.message || e);
            }
        })();
        ;(async () => {
            try {
                const googlePay = await payments.googlePay(paymentRequest);
                if (googlePayContainerRef.current) {
                    await googlePay.attach(googlePayContainerRef.current, { buttonColor: "black", buttonSizeMode: "fill", buttonType: "short" });
                    googlePayRef.current = googlePay;
                    setGooglePayReady(true);
                }
            } catch (e) {
                console.info("Google Pay isn't available here:", e?.message || e);
            }
        })();
    }, [squareLoading, squareError, walletsEnabled, amount]);

    // Keep the wallet sheet's total in step with the order total
    useEffect(() => {
        if (paymentRequestRef.current && amount > 0) {
            try {
                paymentRequestRef.current.update({ total: { amount: money(amount), label: "Ash's Cravings" } });
            } catch (e) {
                console.warn("Couldn't update wallet total:", e);
            }
        }
    }, [amount]);

    const payWithWallet = (methodRef) => {
        const method = methodRef.current;
        if (!method || walletBusy) return;
        if (beforeWallet && beforeWallet() === false) return;
        // Call tokenize right away: Apple Pay only opens straight from the tap
        const pending = method.tokenize();
        setWalletBusy(true);
        ;(async () => {
            try {
                const result = await pending;
                if (result.status === "OK") {
                    if (onWalletToken) await onWalletToken({ token: result.token });
                } else if (result.status !== "Cancel") {
                    throw new Error(result.errors?.[0]?.message || result.errors?.[0]?.detail || "That payment didn't go through. Please try again or use a card.");
                }
            } catch (e) {
                console.error("Wallet payment error:", e);
                if (onPaymentError) onPaymentError(e?.message);
            } finally {
                setWalletBusy(false);
            }
        })();
    };

    const showWallets = walletsEnabled && (googlePayReady || applePayReady);

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

                {/* Apple Pay / Google Pay. The Google Pay box stays in the DOM so Square can attach to it */}
                <div className={showWallets ? "space-y-3" : "hidden"}>
                    <div className="flex flex-col gap-3">
                        {applePayReady && (
                            <button
                                type="button"
                                aria-label="Pay with Apple Pay"
                                onClick={() => payWithWallet(applePayRef)}
                                disabled={walletBusy}
                                className="apple-pay-button"
                            />
                        )}
                        {/* Square draws Google's own button in here; its clicks bubble up to this box */}
                        <div
                            ref={googlePayContainerRef}
                            onClick={() => payWithWallet(googlePayRef)}
                            className={googlePayReady ? "h-12 w-full cursor-pointer" : "hidden"}
                        />
                    </div>
                    {walletBusy && (
                        <p className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                            <Loader2 className="h-4 w-4 animate-spin" /> Placing your order...
                        </p>
                    )}
                    <div className="flex items-center gap-3 text-xs uppercase tracking-[0.14em] text-muted-foreground">
                        <span className="h-px flex-1 bg-border" />
                        or pay with card
                        <span className="h-px flex-1 bg-border" />
                    </div>
                </div>

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