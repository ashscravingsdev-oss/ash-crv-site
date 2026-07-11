"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import MapPicker from './map-picker'

const DeliveryInfo = ({
    isLoggedIn,
    userData,
    guestInfo,
    onGuestInfoChange,
    addressData,
    onAddressSelect,
    mapboxAccessToken,
    mapRef,
}) => {
    // Which data to show/use
    const name = isLoggedIn ? userData.name : guestInfo.name
    const email = isLoggedIn ? userData.email : guestInfo.email
    const phone = isLoggedIn ? userData.phone : guestInfo.phone

    return (
        <Card>
            <CardHeader>
                <CardTitle>Delivery Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Name */}
                <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                        id="name"
                        placeholder="Your name"
                        value={name}
                        onChange={(e) => {
                            if (!isLoggedIn) onGuestInfoChange('name', e.target.value)
                        }}
                        disabled={isLoggedIn}
                        required={!isLoggedIn}
                    />
                </div>

                {/* Email */}
                <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => {
                            if (!isLoggedIn) onGuestInfoChange('email', e.target.value)
                        }}
                        disabled={isLoggedIn}
                        required={!isLoggedIn}
                    />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                        id="phone"
                        type="tel"
                        placeholder="(555) 123-4567"
                        value={phone}
                        onChange={(e) => {
                            if (!isLoggedIn) onGuestInfoChange('phone', e.target.value)
                        }}
                        disabled={isLoggedIn}
                        required={!isLoggedIn}
                    />
                </div>

                {/* Map / Address */}
                <div className="space-y-2">
                    <h3 className="text-sm font-medium">Delivery Address *</h3>
                    <MapPicker
                        ref={mapRef}
                        mapboxAccessToken={mapboxAccessToken}
                        initialAddress={addressData}
                        onAddressSelect={onAddressSelect}
                        mapHeight={400}
                        placeholder="Search for delivery address..."
                    />
                </div>
            </CardContent>
        </Card>
    )
}

export default DeliveryInfo