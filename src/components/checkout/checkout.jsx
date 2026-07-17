"use client"

import { Button } from "@/components/ui/button"
import { useState, useRef, useEffect } from "react"
import { fetchCart, calculateCartTotals } from "@/store/cartSlice"
import { useDispatch, useSelector } from "react-redux"
import Cookies from "js-cookie"
import DeliveryInfo from './delivery-info'
import DeliverySchedule from './delivery-schedule'
import PaymentMethod from './payment-method'
import OrderSummary from './order-summary'
import CheckoutProgress from './checkout-progress'
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

const Checkout = () => {
    const dispatch = useDispatch()
    const mapboxAccessToken = process.env.NEXT_PUBLIC_MAP_BOX_ACCESS_TOKEN
    const mapRef = useRef(null)
    const [step, setStep] = useState(1)

    // ----- User data (from cookie or Redux) -----
    const userCookie = Cookies.get('user')
    const currentUser = userCookie ? JSON.parse(userCookie) : null
    const isLoggedIn = !!currentUser

    // ----- Address state -----
    const [addressData, setAddressData] = useState({
        address: '',
        latitude: null,
        longitude: null,
    })

    // ----- Step 2 & 3 state -----
    const [deliveryDay, setDeliveryDay] = useState("")
    const [deliveryTime, setDeliveryTime] = useState("")
    const [frequency, setFrequency] = useState("one-time");

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
    const { cart, subtotal, taxTotal, couponDiscount } = useSelector(state => state.cart)

    const tipAmount = Number.parseFloat(tip) || 0
    const total = subtotal + taxTotal - (couponDiscount || 0) + tipAmount + (deliveryFee || 0) + (isRush ? rushFee : 0);

    useEffect(() => {
        dispatch(fetchCart())
    }, [dispatch])

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
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/delivery/calculate-fee`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    latitude: addressData.latitude,
                    longitude: addressData.longitude,
                    cart_total: subtotal,
                }),
            });
            const data = await res.json();
            if (!data.outOfRange) {
                setDeliveryFee(data.fee);
                setRushFee(data.rush_fee || 0);
                setRequiresAdminApproval(data.requires_admin_approval || false);
                setFreeDeliveryThreshold(data.free_delivery_threshold || null);
                return true;
            } else {
                toast.error("Delivery not available for this location. Please choose a closer address.");
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
        if (step === 2 && addressData.latitude && addressData.longitude) {
            calculateDeliveryFee();
        }
    }, [step, addressData]);

    const handleAddressSelect = (locationData) => {
        setAddressData(locationData)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (step === 1) {
            const feeCalculated = await calculateDeliveryFee();
            if (!feeCalculated) return;
            setStep(step + 1);
        } else if (step < 3) {
            setStep(step + 1);
        } else {
            setIsSubmitting(true);

            try {
                // Tokenize card using Square
                const cardToken = await squarePayment.tokenize();

                // Compute next occurrence of the selected delivery day
                const daysOfWeek = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
                const today = new Date();
                const currentDayIndex = today.getDay();
                const targetDayIndex = daysOfWeek.indexOf(deliveryDay.toLowerCase());
                let daysUntil = targetDayIndex - currentDayIndex;
                if (daysUntil <= 0) daysUntil += 7;
                const deliveryDateObj = new Date(today);
                deliveryDateObj.setDate(today.getDate() + daysUntil);
                const delivery_date = deliveryDateObj.toISOString().split('T')[0];

                const orderData = {
                    cart_id: cart.id,
                    address: addressData.address,
                    latitude: addressData.latitude,
                    longitude: addressData.longitude,
                    delivery_day: deliveryDay,
                    delivery_time_slot: deliveryTime,
                    delivery_date,
                    delivery_fee: deliveryFee,
                    tip: tip,
                    frequency: frequency,
                    requires_admin_approval: requiresAdminApproval,
                    totals: {
                        subtotal,
                        discount: couponDiscount || 0,
                        tax: taxTotal,
                        tipAmount,
                        deliveryFee,
                        rushFee: isRush ? rushFee : 0,
                        total
                    },
                    cardToken: cardToken.token,
                    couponId: cart?.coupon_id || null,
                };

                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/checkout/create-order`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${Cookies.get('accessToken')}`,
                    },
                    body: JSON.stringify(orderData),
                });

                const result = await response.json();
                if (response.ok) {
                    toast.success("Order placed successfully!");
                    window.location.href = `/order-confirmation?orderId=${result.order.id}`;
                } else {
                    toast.error(result.message || 'Order failed');
                }
            } catch (error) {
                console.error("Order submission error:", error);
                toast.error("Failed to place order. Please try again.");
            } finally {
                setIsSubmitting(false);
            }
        }
    }

    const canProceed = () => {
        switch (step) {
            case 1:
                return addressData.address.trim() !== '';
            case 2:
                return deliveryDay && deliveryTime;
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
        if (step === 1 && feeLoading) return "Calculating delivery fee...";
        if (isSubmitting) return (
            <span className="flex items-center justify-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Placing Order...
            </span>
        );
        if (step === 3) return "Place Order";
        return "Continue";
    };

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
                                deliveryFee={deliveryFee}
                                rushFee={rushFee}
                                requiresAdminApproval={requiresAdminApproval}
                                freeDeliveryThreshold={freeDeliveryThreshold}
                                isRush={isRush}
                                setIsRush={setIsRush}
                                feeLoading={feeLoading}
                            />
                        )}
                        {step === 3 && (
                            <PaymentMethod
                                onSquareReady={handleSquareReady}
                                onPaymentError={handlePaymentError}
                                requiresAdminApproval={requiresAdminApproval}
                            />
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
                                disabled={!canProceed() || feeLoading || isSubmitting}
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
                    deliveryFee={deliveryFee}
                    total={total}
                    rushFee={isRush ? rushFee : 0}
                    freeDeliveryThreshold={freeDeliveryThreshold}
                     requiresAdminApproval={requiresAdminApproval}
                />
            </div>
        </div>
    )
}

export default Checkout