"use client"

const CheckoutProgress = ({ currentStep }) => {
    const steps = [
        { number: 1, label: "Delivery Info" },
        { number: 2, label: "Schedule" },
        { number: 3, label: "Payment" }
    ];

    return (
        <div className="flex items-center justify-center mb-8">
            <div className="flex items-center gap-2">
                {steps.map((step, index) => (
                    <div key={step.number} className="flex items-center">
                        <div
                            className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold ${currentStep >= step.number
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-muted text-muted-foreground"
                                }`}
                        >
                            {step.number}
                        </div>
                        {index < steps.length - 1 && (
                            <div
                                className={`w-16 h-1 ${currentStep > step.number ? "bg-primary" : "bg-muted"
                                    }`}
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CheckoutProgress;