"use client";

import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, Check, Sparkles } from "lucide-react";
import { toast } from "sonner";
import CategorySlot from "./category-slot";
import {
    fetchBundleTemplate,
    fetchCategoryProducts,
    savePendingSelection,
} from "@/store/subscriptionSelectionSlice";

/**
 * One build-your-own bundle line within a subscription. Manages its own
 * draft selection locally and only commits it via PUT .../selection when
 * "Save Pick" is clicked - nothing is sent per-click on the steppers.
 */
const BundleLinePicker = ({ subscriptionId, line, locked, onLockedByServer }) => {
    const dispatch = useDispatch();
    const { bundleTemplates, categoryProducts, saving } = useSelector((state) => state.subscriptionSelection);

    const template = bundleTemplates[line.bundle_id];
    const isSaving = !!saving[`${subscriptionId}:${line.bundle_id}`];

    const [draft, setDraft] = useState(() => toQuantityMap(line.selected_products));
    const [saved, setSaved] = useState(false);

    // Re-seed the draft whenever the server's view of this line changes
    // (e.g. after a successful save, or a "repeat last order" reset).
    useEffect(() => {
        setDraft(toQuantityMap(line.selected_products));
    }, [line.selected_products, line.mode]);

    useEffect(() => {
        if (!template) dispatch(fetchBundleTemplate(line.bundle_id));
    }, [dispatch, line.bundle_id, template]);

    const slots = useMemo(() => template?.slots || [], [template]);

    useEffect(() => {
        slots.forEach((slot) => {
            if (!categoryProducts[slot.categoryId]) {
                dispatch(fetchCategoryProducts(slot.categoryId));
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, slots.map((s) => s.categoryId).join(",")]);

    // product_id -> category_id, built from whichever category product lists have loaded -
    // used to resolve names for the locked/read-only summary view.
    const productNameById = useMemo(() => {
        const map = new Map();
        slots.forEach((slot) => {
            (categoryProducts[slot.categoryId]?.products || []).forEach((p) => map.set(p.id, p.name));
        });
        (template?.bundle?.products || []).forEach((p) => {
            if (!map.has(p.id)) map.set(p.id, p.name);
        });
        return map;
    }, [slots, categoryProducts, template]);

    const totalsByCategory = useMemo(() => {
        const totals = {};
        slots.forEach((slot) => {
            const productIds = new Set((categoryProducts[slot.categoryId]?.products || []).map((p) => p.id));
            totals[slot.categoryId] = Object.entries(draft).reduce(
                (sum, [productId, qty]) => (productIds.has(productId) ? sum + qty : sum),
                0
            );
        });
        return totals;
    }, [slots, categoryProducts, draft]);

    const allSlotsComplete = slots.length > 0 && slots.every((slot) => totalsByCategory[slot.categoryId] === slot.required);
    const hasChanges = JSON.stringify(toQuantityMap(line.selected_products)) !== JSON.stringify(draft);

    const increment = (productId) => setDraft((d) => ({ ...d, [productId]: (d[productId] || 0) + 1 }));
    const decrement = (productId) =>
        setDraft((d) => {
            const next = Math.max(0, (d[productId] || 0) - 1);
            const copy = { ...d };
            if (next === 0) delete copy[productId];
            else copy[productId] = next;
            return copy;
        });

    const handleSave = async () => {
        const selectedProducts = Object.entries(draft).map(([product_id, quantity]) => ({ product_id, quantity }));
        try {
            await dispatch(
                savePendingSelection({ subscriptionId, bundleId: line.bundle_id, selectedProducts })
            ).unwrap();
            toast.success("Your pick is saved for this cycle");
            setSaved(true);
            setTimeout(() => setSaved(false), 2000);
        } catch (err) {
            if (err?.status === 409) {
                toast.error("Picks just locked for this cycle - showing your last saved state.");
                onLockedByServer?.();
            } else {
                toast.error(err?.message || "Failed to save your pick");
            }
        }
    };

    const bundleName = template?.bundle?.name || "Bundle";

    return (
        <div className="border border-border rounded-lg p-4 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-semibold text-lg">{bundleName}</h3>
                {line.mode === "explicit_pick" ? (
                    <Badge className="bg-primary">
                        <Check className="h-3 w-3 mr-1" /> Explicit pick saved
                    </Badge>
                ) : (
                    <Badge variant="outline">
                        <Sparkles className="h-3 w-3 mr-1" /> Will repeat last order
                    </Badge>
                )}
            </div>

            {line.mode !== "explicit_pick" && (
                <p className="text-sm text-muted-foreground">
                    You haven't picked for this cycle yet - if you don't, we'll automatically repeat what you got last
                    time (with a chef's-choice swap for anything out of stock). Pick below to choose something different.
                </p>
            )}

            {!template || template.loading ? (
                <div className="flex justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                </div>
            ) : template.error ? (
                <p className="text-sm text-destructive">{template.error}</p>
            ) : (
                <div className="space-y-3">
                    {slots.map((slot) => (
                        <CategorySlot
                            key={slot.categoryId}
                            categoryName={slot.categoryName}
                            required={slot.required}
                            products={categoryProducts[slot.categoryId]?.products || []}
                            loading={categoryProducts[slot.categoryId]?.loading}
                            quantities={draft}
                            total={totalsByCategory[slot.categoryId] || 0}
                            locked={locked}
                            onIncrement={increment}
                            onDecrement={decrement}
                        />
                    ))}
                </div>
            )}

            {locked ? (
                <p className="text-sm text-muted-foreground italic">Picks are locked for this cycle.</p>
            ) : (
                <Button
                    onClick={handleSave}
                    disabled={!allSlotsComplete || !hasChanges || isSaving}
                    className={saved ? "bg-green-600 hover:bg-green-700" : ""}
                >
                    {isSaving ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
                        </>
                    ) : saved ? (
                        <>
                            <Check className="mr-2 h-4 w-4" /> Saved!
                        </>
                    ) : (
                        "Save Pick"
                    )}
                </Button>
            )}
        </div>
    );
};

function toQuantityMap(selectedProducts) {
    const map = {};
    (selectedProducts || []).forEach(({ product_id, quantity }) => {
        map[product_id] = quantity;
    });
    return map;
}

export default BundleLinePicker;
