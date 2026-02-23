"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import MapPicker from './map-picker'

const DeliveryInfo = ({
    personalInfo,
    onPersonalInfoChange,
    addressData,
    onAddressSelect,
    mapboxAccessToken,
    mapRef
}) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Delivery Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                            id="firstName"
                            placeholder="John"
                            value={personalInfo.firstName}
                            onChange={(e) => onPersonalInfoChange('firstName', e.target.value)}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                            id="lastName"
                            placeholder="Doe"
                            value={personalInfo.lastName}
                            onChange={(e) => onPersonalInfoChange('lastName', e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        value={personalInfo.email}
                        onChange={(e) => onPersonalInfoChange('email', e.target.value)}
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                        id="phone"
                        type="tel"
                        placeholder="(555) 123-4567"
                        value={personalInfo.phone}
                        onChange={(e) => onPersonalInfoChange('phone', e.target.value)}
                        required
                    />
                </div>

                {/* Map */}
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

                <div className="space-y-2">
                    <Label htmlFor="instructions">Delivery Instructions (Optional)</Label>
                    <Input
                        id="instructions"
                        placeholder="Leave at front door, gate code, etc."
                        value={personalInfo.instructions}
                        onChange={(e) => onPersonalInfoChange('instructions', e.target.value)}
                    />
                </div>
            </CardContent>
        </Card>
    );
};

export default DeliveryInfo;