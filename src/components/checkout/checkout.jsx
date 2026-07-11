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

const Checkout = () => {
    const dispatch = useDispatch()
    const mapboxAccessToken = process.env.NEXT_PUBLIC_MAP_BOX_ACCESS_TOKEN
    const sessionId = Cookies.get('session_id')
    const mapRef = useRef(null)
    const [step, setStep] = useState(1)

    // ----- User data (from cookie or Redux) -----
    const userCookie = Cookies.get('user')
    const currentUser = userCookie ? JSON.parse(userCookie) : null
    const isLoggedIn = !!currentUser

    // ----- Address state (simplified) -----
    const [addressData, setAddressData] = useState({
        address: '',
        latitude: null,
        longitude: null,
    })

    // ----- Step 2 & 3 state unchanged -----
    const [deliveryDay, setDeliveryDay] = useState("")
    const [deliveryTime, setDeliveryTime] = useState("")
    const [tip, setTip] = useState("10")
    const [paymentMethod, setPaymentMethod] = useState("card")
    const [cardDetails, setCardDetails] = useState({
        cardNumber: '',
        expiry: '',
        cvv: '',
        cardName: ''
    })

    // ----- Cart totals from Redux -----
    const { cart, subtotal, taxTotal, couponDiscount } = useSelector(state => state.cart)

    const tipAmount = Number.parseFloat(tip) || 0
    const total = subtotal + taxTotal - (couponDiscount || 0) + tipAmount

    // ----- Cart fetching & totals -----
    useEffect(() => {
        dispatch(fetchCart())
    }, [dispatch])

    useEffect(() => {
        if (cart?.id) {
            dispatch(calculateCartTotals(cart.id))
        }
    }, [cart, dispatch])

    const handleAddressSelect = (locationData) => {
        setAddressData(locationData)
    }

    const handleCardDetailsChange = (field, value) => {
        setCardDetails(prev => ({ ...prev, [field]: value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (step < 3) {
            setStep(step + 1)
        } else {
            const orderData = {
                // User details from account (or guest)
                name: currentUser?.username || personalInfo.name,  // if guest
                email: currentUser?.email || personalInfo.email,
                phone: currentUser?.phone || personalInfo.phone,
                address: addressData.address,
                deliveryDay,
                deliveryTime,
                tip,
                paymentMethod,
                cardDetails: paymentMethod === 'card' ? cardDetails : null,
                totals: {
                    subtotal,
                    discount: couponDiscount || 0,
                    tax: taxTotal,
                    tipAmount,
                    total
                }
            }
            console.log('Order submitted:', orderData)
            // window.location.href = "/order-confirmation"
        }
    }

    const canProceed = () => {
        switch (step) {
            case 1:
                return addressData.address.trim() !== ''
            case 2:
                return deliveryDay && deliveryTime
            case 3:
                if (paymentMethod === 'card') {
                    return cardDetails.cardNumber && cardDetails.expiry &&
                        cardDetails.cvv && cardDetails.cardName
                }
                return true
            default:
                return true
        }
    }

    // ---------- Guest state (only used when not logged in) ----------
    const [guestInfo, setGuestInfo] = useState({
        name: '',
        email: '',
        phone: '',
    })

    const handleGuestInfoChange = (field, value) => {
        setGuestInfo(prev => ({ ...prev, [field]: value }))
    }

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
                                guestInfo={guestInfo}
                                onGuestInfoChange={handleGuestInfoChange}
                                addressData={addressData}
                                onAddressSelect={handleAddressSelect}
                                mapboxAccessToken={mapboxAccessToken}
                                mapRef={mapRef}
                            />
                        )}
                        {/* ... steps 2 and 3 unchanged */}
                        {step === 2 && (
                            <DeliverySchedule
                                deliveryDay={deliveryDay}
                                setDeliveryDay={setDeliveryDay}
                                deliveryTime={deliveryTime}
                                setDeliveryTime={setDeliveryTime}
                                tip={tip}
                                setTip={setTip}
                            />
                        )}
                        {step === 3 && (
                            <PaymentMethod
                                paymentMethod={paymentMethod}
                                setPaymentMethod={setPaymentMethod}
                                cardDetails={cardDetails}
                                onCardDetailsChange={handleCardDetailsChange}
                            />
                        )}

                        <div className="flex gap-4 mt-6">
                            {step > 1 && (
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setStep(step - 1)}
                                    className="flex-1"
                                >
                                    Back
                                </Button>
                            )}
                            <Button
                                type="submit"
                                className="flex-1"
                                disabled={!canProceed()}
                            >
                                {step === 3 ? "Place Order" : "Continue"}
                            </Button>
                        </div>
                    </form>
                </div>

                <OrderSummary
                    subtotal={subtotal}
                    discount={couponDiscount || 0}
                    tax={taxTotal}
                    tipAmount={tipAmount} 
                    total={total}
                />
            </div>
        </div>
    )
}

export default Checkout