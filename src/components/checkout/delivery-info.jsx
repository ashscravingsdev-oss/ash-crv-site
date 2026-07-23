"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, User, Mail, Phone } from "lucide-react"
import MapPicker from './map-picker'

const DeliveryInfo = ({
    userData,               
    addressData,
    onAddressSelect,
    mapboxAccessToken,
    mapRef,
}) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Delivery Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* User Summary Card */}
                <div className="bg-muted/30 rounded-xl p-4 flex flex-col sm:flex-row gap-4">
                    <div className="flex items-center gap-3">
                        <User className="w-5 h-5 text-primary" />
                        <div>
                            <p className="text-sm font-medium">{userData.name || "Your Name"}</p>
                            <p className="text-xs text-muted-foreground">Account Holder</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-primary" />
                        <div>
                            <p className="text-sm font-medium">{userData.email || "your@email.com"}</p>
                            <p className="text-xs text-muted-foreground">Email</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-primary" />
                        <div>
                            <p className="text-sm font-medium">{userData.phone || "Not provided"}</p>
                            <p className="text-xs text-muted-foreground">Phone</p>
                        </div>
                    </div>
                </div>

                {/* Map / Address */}
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-primary" />
                        <h3 className="text-sm font-semibold">Delivery Address *</h3>
                    </div>
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