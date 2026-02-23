"use client"

import { Button } from "@/components/ui/button"
import { useState, useRef } from "react"
import DeliveryInfo from './delivery-info'
import DeliverySchedule from './delivery-schedule'
import PaymentMethod from './payment-method'
import OrderSummary from './order-summary'
import CheckoutProgress from './checkout-progress'
import { log } from "util"

const Checkout = () => {
    const mapboxAccessToken = process.env.NEXT_PUBLIC_MAP_BOX_ACCESS_TOKEN;
    const mapRef = useRef(null);
    const [step, setStep] = useState(1)

    // Step 1: Delivery Info State
    const [personalInfo, setPersonalInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        instructions: ''
    });



    // Address state (already dynamic)
    const [addressData, setAddressData] = useState({
        address: '',
        street: '',
        city: '',
        state: '',
        zip_code: '',
        country: 'USA',
        latitude: null,
        longitude: null
    });

    // Step 2: Delivery Schedule State
    const [deliveryDay, setDeliveryDay] = useState("")
    const [deliveryTime, setDeliveryTime] = useState("")
    const [tip, setTip] = useState("10")

    // Step 3: Payment State
    const [paymentMethod, setPaymentMethod] = useState("card")
    const [cardDetails, setCardDetails] = useState({
        cardNumber: '',
        expiry: '',
        cvv: '',
        cardName: ''
    });

    // Order totals (would come from cart in real app)
    const subtotal = 49.96
    const discount = 10
    const deliveryFee = 0
    const tax = 3.99
    const tipAmount = Number.parseFloat(tip)
    const total = subtotal + deliveryFee + tax + tipAmount

    console.log(personalInfo, 'personal info');
    console.log(addressData, 'addressData');
    console.log(paymentMethod, 'addressData');
    console.log(deliveryDay, deliveryTime, tip, 'addressData');

    const handleAddressSelect = (locationData) => {
        setAddressData(locationData);
        console.log('Address Data:', locationData);
    };

    const handlePersonalInfoChange = (field, value) => {
        setPersonalInfo(prev => ({ ...prev, [field]: value }));
    };

    const handleCardDetailsChange = (field, value) => {
        setCardDetails(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        if (step < 3) {
            setStep(step + 1)
        } else {
            // Submit order
            const orderData = {
                personalInfo,
                addressData,
                deliveryDay,
                deliveryTime,
                tip,
                paymentMethod,
                cardDetails: paymentMethod === 'card' ? cardDetails : null,
                totals: { subtotal, discount, deliveryFee, tax, tipAmount, total }
            };
            console.log('Order submitted:', orderData);
            window.location.href = "/order-confirmation"
        }
    }

    const canProceed = () => {
        switch (step) {
            case 1:
                return personalInfo.firstName && personalInfo.lastName &&
                    personalInfo.email && personalInfo.phone && addressData.address;
            case 2:
                return deliveryDay && deliveryTime;
            case 3:
                if (paymentMethod === 'card') {
                    return cardDetails.cardNumber && cardDetails.expiry &&
                        cardDetails.cvv && cardDetails.cardName;
                }
                return true; // Apple Pay / Google Pay don't need card details
            default:
                return true;
        }
    };

    return (
        <div className="container mx-auto px-4 pt-8">
            <h1 className="text-4xl font-bold mb-8">Checkout</h1>

            {/* Progress Indicator */}
            <CheckoutProgress currentStep={step} />

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Checkout Form */}
                <div className="lg:col-span-2">
                    <form onSubmit={handleSubmit}>
                        {step === 1 && (
                            <DeliveryInfo
                                personalInfo={personalInfo}
                                onPersonalInfoChange={handlePersonalInfoChange}
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

                {/* Order Summary Sidebar */}
                <OrderSummary
                    subtotal={subtotal}
                    discount={discount}
                    tipAmount={tipAmount}
                    tax={tax}
                    total={total}
                />
            </div>
        </div>
    )
}

export default Checkout