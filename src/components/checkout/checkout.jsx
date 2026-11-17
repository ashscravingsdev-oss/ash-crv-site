"use client"

import { Button } from "@/components/ui/button"
import { useState, useRef, useEffect } from "react"
import { fetchCart, calculateCartTotals } from "@/store/cartSlice"
import { useDispatch, useSelector } from "react-redux"
import { cartCanSubscribe, cartExtras, getSavedFrequency } from "@/lib/order-frequency"
import Cookies from "js-cookie"
import DeliveryInfo from './delivery-info'
import DeliverySchedule from './delivery-schedule'
import PaymentMethod from './payment-method'
import OrderSummary from './order-summary'
import CheckoutProgress from './checkout-progress'
import SpecialCheckout from './special-checkout'
import { PICKUP_ADDRESS } from './fulfillment-choice'
import { cartIsSpecial } from "@/lib/special-orders"
import { Loader2 } from "lucide-react"
import EmptyCart from "@/components/cart/empty-cart"
import { toast } from "sonner"
import { apiRequest } from "@/lib/apiRequest"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { useRouter } from "next/navigation"

const Checkout = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const mapboxAccessToken = process.env.NEXT_PUBLIC_MAP_BOX_ACCESS_TOKEN
    const mapRef = useRef(null)
    const [step, setStep] = useState(1)

    // ----- User data (from cookie or Redux) -----
    const userCookie = Cookies.get('user')
    const currentUser = userCookie ? JSON.parse(userCookie) : null
    const isLoggedIn = !!currentUser

    // ----- Delivery or pickup -----
    const [method, setMethod] = useState("delivery")
    const pickup = method === "pickup"

    // ----- Address state (delivery only; a pickup never uses it) -----
    const [addressData, setAddressData] = useState({
        address: '',
        latitude: null,
        longitude: null,
    })

    // ----- Step 2 & 3 state -----
    const [deliveryDay, setDeliveryDay] = useState("")
    // The date that goes with the chosen day ('YYYY-MM-DD'), worked out in the schedule step
    const [deliveryDate, setDeliveryDate] = useState("")
    const [deliveryTime, setDeliveryTime] = useState("")
    const [frequency, setFrequency] = useState("one-time");
    // Start with whatever they chose on the Bundles page
    useEffect(() => {
        const saved = getSavedFrequency()
        if (saved) setFrequency(saved)
    }, [])

    const [rushFee, setRushFee] = useState(0);
    const [requiresAdminApproval, setRequiresAdminApproval] = useState(false);
    const [freeDeliveryThreshold, setFreeDeliveryThreshold] = useState(null);
    const [isRush, setIsRush] = useState(false);

    const [tip, setTip] = useState("0")

    const [deliveryFee, setDeliveryFee] = useState(null);
    const [feeLoading, setFeeLoading] = useState(false);
    const [squarePayment, setSquarePayment] = useState(null);

    // ----- Order submission loading -----
    const [isSubmitting, setIsSubmitting] = useState(false);

    // ----- Cart totals from Redux -----
    const { cart, loading: cartLoading, items, subtotal, taxTotal, couponDiscount, coupon } = useSelector(state => state.cart)
    // Whether the order server takes one-time extras in a subscription cart. It says so
    // with the delivery times (step 2); null until then.
    const [extrasAllowed, setExtrasAllowed] = useState(null)
    const canSubscribe = cartCanSubscribe(cart?.items, extrasAllowed === true)
    // A subscription needs a bundle in the cart; without one it's a one-time order
    useEffect(() => {
        if (extrasAllowed === null) return
        if (cart?.items && !canSubscribe && frequency !== "one-time") setFrequency("one-time")
    }, [cart?.items, frequency, extrasAllowed, canSubscribe])
    const isFreeDeliveryCoupon = coupon?.type === 'free_delivery';

    // Pickup is always free: no delivery fee, no rush fee, never "needs approval".
    // Everything below uses these, so nothing from a delivery can leak into a pickup.
    const fee = pickup ? 0 : deliveryFee
    const rush = !pickup && isRush ? rushFee : 0
    const needsApproval = !pickup && requiresAdminApproval

    const tipAmount = Number.parseFloat(tip) || 0
    const total = subtotal + taxTotal - (couponDiscount || 0) + tipAmount + (fee || 0) + rush;

    useEffect(() => {
        dispatch(fetchCart())
    }, [dispatch])

    // Desserts, cakes and custom items can check out without an account;
    // weekly meal prep still needs one (for picks and subscriptions).
    const special = cartIsSpecial(items)
    const needsLogin = !isLoggedIn && !cartLoading && cart && items?.length > 0 && !special
    useEffect(() => {
        if (needsLogin) router.replace('/login?redirect=' + encodeURIComponent('/checkout'))
    }, [needsLogin, router])

    useEffect(() => {
        if (cart?.id) {
            dispatch(calculateCartTotals(cart.id))
        }
    }, [cart, dispatch])

    const calculateDeliveryFee = async () => {
        if (!addressData.latitude || !addressData.longitude) {
            toast.error("Please select a delivery address");
            return false;
        }

        setFeeLoading(true);
        try {
            const data = await apiRequest('/delivery/calculate-fee', {
                method: 'POST',
                body: JSON.stringify({
                    latitude: addressData.latitude,
                    longitude: addressData.longitude,
                    cart_total: subtotal,
                }),
            });

            if (!data.outOfRange) {
                // Apply free_delivery coupon if active
                setDeliveryFee(coupon?.type === 'free_delivery' ? 0 : data.fee);
                setRushFee(data.rush_fee || 0);
                setRequiresAdminApproval(data.requires_admin_approval || false);
                setFreeDeliveryThreshold(
                    coupon?.type === 'free_delivery' ? null : (data.free_delivery_threshold || null)
                );
                return true;
            } else {
                toast.error("I don't deliver to that address yet. Please choose pickup, or message me.");
                setDeliveryFee(null);
                return false;
            }
        } catch (err) {
            toast.error("Failed to calculate delivery fee");
            setDeliveryFee(null);
            return false;
        } finally {
            setFeeLoading(false);
        }
    };

    useEffect(() => {
        if (step === 2 && !pickup && addressData.latitude && addressData.longitude) {
            calculateDeliveryFee();
        }
    }, [step, addressData, coupon, pickup]);

    // Ash cooks a set number of meals a week: check what's left for the chosen week
    const [mealsLeft, setMealsLeft] = useState(null) // { left, full } | null
    useEffect(() => {
        if (!deliveryDate) return setMealsLeft(null)
        let alive = true
        apiRequest(`/delivery/meals-left?date=${deliveryDate}`)
            .then((r) => alive && setMealsLeft(r))
            .catch(() => alive && setMealsLeft(null))
        return () => {
            alive = false
        }
    }, [deliveryDate])

    // The order server refuses an order whose day or delivery fee no longer matches
    // what this page shows (the weekly cutoff passed while the page sat open, or a
    // fee changed). Say why, and go back to the step that shows the fresh value.
    const showOrderError = (error) => {
        toast.error(error?.message || "Failed to place order. Please try again.")
        if (error?.code === "DELIVERY_DATE_CHANGED") setStep(2)
        if (error?.code === "DELIVERY_FEE_CHANGED") setStep(1)
    }

    const handleAddressSelect = (locationData) => {
        setAddressData(locationData)
    }

    // Switching between delivery and pickup starts the fees fresh: a delivery fee,
    // rush choice or approval only ever belongs to the delivery it was worked out for
    const handleMethodChange = (next) => {
        if (next === method) return
        setMethod(next)
        setDeliveryFee(null)
        setRushFee(0)
        setIsRush(false)
        setRequiresAdminApproval(false)
        setFreeDeliveryThreshold(null)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (step === 1) {
            // Pickup has no address and no fee to look up
            if (!pickup) {
                const feeCalculated = await calculateDeliveryFee();
                if (!feeCalculated) return;
            }
            setStep(step + 1);
        } else if (step < 3) {
            setStep(step + 1);
        } else {
            setIsSubmitting(true);

            try {
                // Tokenize card using Square
                const cardToken = await squarePayment.tokenize();
                await placeOrder(cardToken.token);
            } catch (error) {
                console.error("Order submission error:", error);
                showOrderError(error);
            } finally {
                setIsSubmitting(false);
            }
        }
    }

    // Places the order with a card or wallet (Apple Pay / Google Pay) token; throws if it fails
    const placeOrder = async (token) => {
            const delivery_date = deliveryDate;

            const orderData = {
                cart_id: cart.id,
                fulfillment_method: method,
                // A pickup sends no address of its own (the server prices it as free either way)
                address: pickup ? PICKUP_ADDRESS : addressData.address,
                latitude: pickup ? null : addressData.latitude,
                longitude: pickup ? null : addressData.longitude,
                delivery_day: deliveryDay,
                delivery_time_slot: deliveryTime,
                delivery_date,
                delivery_fee: fee,
                tip: tip,
                frequency: frequency,
                requires_admin_approval: needsApproval,
                totals: {
                    subtotal,
                    discount: couponDiscount || 0,
                    tax: taxTotal,
                    tipAmount,
                    deliveryFee: fee,
                    rushFee: rush,
                    total
                },
                cardToken: token,
                couponId: cart?.coupon_id || null,
            };

            const result = await apiRequest('/checkout/create-order', {
                method: 'POST',
                body: JSON.stringify(orderData),
            });

            toast.success("Order placed successfully!");
            window.location.href = `/order-confirmation?orderId=${result.order.id}`;
    }

    const payWithWallet = async ({ token }) => {
        setIsSubmitting(true);
        try {
            await placeOrder(token);
        } catch (error) {
            setIsSubmitting(false);
            if (error?.code === "DELIVERY_DATE_CHANGED") setStep(2)
            if (error?.code === "DELIVERY_FEE_CHANGED") setStep(1)
            throw error;
        }
    }

    const canProceed = () => {
        switch (step) {
            case 1:
                return pickup || addressData.address.trim() !== '';
            case 2:
                return deliveryDay && deliveryDate && deliveryTime && !mealsLeft?.full;
            case 3:
                return squarePayment !== null;
            default:
                return true;
        }
    };

    const handleSquareReady = (squareInstance) => {
        setSquarePayment(squareInstance);
    };

    const handlePaymentError = (error) => {
        toast.error(error || "Payment system error");
    };

    // Determine button text and disabled state
    const getButtonText = () => {
        if (step === 1 && feeLoading && !pickup) return "Calculating delivery fee...";
        if (isSubmitting) return (
            <span className="flex items-center justify-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Placing Order...
            </span>
        );
        if (step === 3) return "Place Order";
        return "Continue";
    };

    // ===================== EMPTY CART STATE =====================
    if (cartLoading) {
        return (
            <div className="container mx-auto px-4 pt-16">
                <div className="flex justify-center py-16">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            </div>
        )
    }

    if (!cartLoading && (!items || items.length === 0)) {
        return <EmptyCart />
    }

    if (special) {
        return (
            <SpecialCheckout
                cart={cart}
                items={items}
                subtotal={subtotal}
                taxTotal={taxTotal}
                couponDiscount={couponDiscount}
                currentUser={currentUser}
            />
        )
    }

    if (needsLogin) return null

    return (
        <div className="container mx-auto px-4 pt-8">
            <h1 className="text-4xl font-bold mb-8">Checkout</h1>
            <CheckoutProgress currentStep={step} />

            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <form onSubmit={handleSubmit}>
                        {step === 1 && (
                            <DeliveryInfo
                                isLoggedIn={isLoggedIn}
                                userData={{
                                    name: currentUser?.username || '',
                                    email: currentUser?.email || '',
                                    phone: currentUser?.phone || '',
                                }}
                                method={method}
                                onMethodChange={handleMethodChange}
                                addressData={addressData}
                                onAddressSelect={handleAddressSelect}
                                mapboxAccessToken={mapboxAccessToken}
                                mapRef={mapRef}
                            />
                        )}
                        {step === 2 && (
                            <DeliverySchedule
                                deliveryDay={deliveryDay}
                                setDeliveryDay={setDeliveryDay}
                                deliveryTime={deliveryTime}
                                setDeliveryTime={setDeliveryTime}
                                tip={tip}
                                setTip={setTip}
                                frequency={frequency}
                                setFrequency={setFrequency}
                                canSubscribe={canSubscribe}
                                extras={canSubscribe ? cartExtras(cart?.items) : []}
                                onExtrasAllowed={setExtrasAllowed}
                                deliveryFee={fee}
                                rushFee={pickup ? 0 : rushFee}
                                requiresAdminApproval={needsApproval}
                                freeDeliveryThreshold={pickup ? null : freeDeliveryThreshold}
                                isRush={!pickup && isRush}
                                setIsRush={setIsRush}
                                feeLoading={feeLoading}
                                pickup={pickup}
                                onDateChange={setDeliveryDate}
                            />
                        )}
                        {step === 3 && (
                            <PaymentMethod
                                onSquareReady={handleSquareReady}
                                onPaymentError={handlePaymentError}
                                requiresAdminApproval={needsApproval}
                                amount={total}
                                walletsEnabled={frequency === 'one-time' && !needsApproval}
                                walletNote={frequency !== 'one-time' ? "Apple Pay and Google Pay work for one-time orders. A subscription needs a card on file, so each order can be charged automatically." : undefined}
                                beforeWallet={() => !isSubmitting}
                                onWalletToken={payWithWallet}
                            />
                        )}

                        {step >= 2 && mealsLeft && (mealsLeft.full || mealsLeft.left <= 10) && (
                            <p
                                role="status"
                                className={`mt-6 rounded-lg border px-4 py-3 text-sm ${
                                    mealsLeft.full ? "border-red-200 bg-red-50 text-red-700" : "border-amber-200 bg-amber-50 text-amber-800"
                                }`}
                            >
                                {mealsLeft.full
                                    ? "I'm fully booked for that week! Message me and I'll see what I can do."
                                    : `Heads up: I only have ${mealsLeft.left} meal${mealsLeft.left === 1 ? "" : "s"} left for that week.`}
                            </p>
                        )}

                        <div className="flex gap-4 mt-6">
                            {step > 1 && (
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setStep(step - 1)}
                                    className="flex-1"
                                    disabled={isSubmitting}
                                >
                                    Back
                                </Button>
                            )}
                            <Button
                                type="submit"
                                className="flex-1"
                                disabled={!canProceed() || (feeLoading && !pickup) || isSubmitting}
                            >
                                {getButtonText()}
                            </Button>
                        </div>
                    </form>
                </div>

                <OrderSummary
                    subtotal={subtotal}
                    discount={couponDiscount || 0}
                    tax={taxTotal}
                    tipAmount={tipAmount}
                    deliveryFee={fee}
                    total={total}
                    rushFee={rush}
                    freeDeliveryThreshold={pickup ? null : freeDeliveryThreshold}
                    requiresAdminApproval={needsApproval}
                    isFreeDeliveryCoupon={!pickup && isFreeDeliveryCoupon}
                    coupon={coupon} // pass the coupon object for display
                    pickup={pickup}
                />
            </div>
        </div>
    )
}


export default Checkout