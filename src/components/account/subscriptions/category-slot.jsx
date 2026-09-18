"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Minus, Plus, Loader2 } from "lucide-react";

/**
 * One "slot" in a build-your-own bundle line - e.g. "Juices: 3/5 selected".
 * Duplicates are allowed (the same product can be incremented past 1), and
 * a product is unselectable once its stock hits 0. The "+" on every product
 * disables once the category's running total reaches `required`, so it's
 * impossible to build a selection the PUT endpoint would reject for
 * quantity mismatch - the exact-match rule enforced server-side in
 * validateAndNormalizeSelection().
 */
const CategorySlot = ({ categoryName, required, products, loading, quantities, total, locked, onIncrement, onDecrement }) => {
    const complete = total === required;

    return (
        <div className="border border-border rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
                <h4 className="font-semibold">{categoryName}</h4>
                <Badge variant={complete ? "default" : "outline"} className={complete ? "bg-primary" : ""}>
                    {total}/{required} selected
                </Badge>
            </div>

            {loading ? (
                <div className="flex justify-center py-6">
                    <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                </div>
            ) : (
                <div className="grid sm:grid-cols-2 gap-3">
                    {products.map((product) => {
                        const outOfStock = (product.inventory?.stock_quantity ?? 0) === 0;
                        const qty = quantities[product.id] || 0;
                        const atCap = total >= required && qty === 0;

                        return (
                            <div
                                key={product.id}
                                className={`flex items-center gap-3 p-3 rounded-lg border border-border ${outOfStock ? "opacity-50" : ""}`}
                            >
                                <div className="w-12 h-12 rounded-md overflow-hidden bg-muted flex-shrink-0">
                                    <img
                                        src={product.image_url || "/placeholder.svg"}
                                        alt={product.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium truncate">{product.name}</p>
                                    {outOfStock ? (
                                        <Badge variant="outline" className="text-xs mt-0.5">Out of Stock</Badge>
                                    ) : (
                                        <p className="text-xs text-muted-foreground">${Number(product.price).toFixed(2)}</p>
                                    )}
                                </div>

                                {!locked && (
                                    <div className="flex items-center border border-border rounded-lg flex-shrink-0">
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8"
                                            onClick={() => onDecrement(product.id)}
                                            disabled={qty === 0}
                                        >
                                            <Minus className="h-3 w-3" />
                                        </Button>
                                        <span className="w-6 text-center text-sm font-semibold">{qty}</span>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8"
                                            onClick={() => onIncrement(product.id)}
                                            disabled={outOfStock || atCap}
                                        >
                                            <Plus className="h-3 w-3" />
                                        </Button>
                                    </div>
                                )}
                                {locked && qty > 0 && (
                                    <Badge className="bg-primary flex-shrink-0">x{qty}</Badge>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default CategorySlot;
