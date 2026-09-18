import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiRequest } from '@/lib/apiRequest';

// NOTE: bundle templates and category product lists are cached HERE (keyed by
// id), not in bundleSlice/productSlice - those slices hold a single shared
// `bundle`/`products` field, and a subscription can have multiple bundle
// lines (each needing its own template) with multiple category slots each
// (needing their own product list) fetched concurrently. Reusing the shared
// slices would have each fetch clobber the last.

// 1. Pending-selection state for one subscription: { lines: [{ bundle_id, source_order_item_id, mode, selected_products }] }
export const fetchSelectionState = createAsyncThunk(
    'subscriptionSelection/fetchSelectionState',
    async (subscriptionId, { rejectWithValue }) => {
        try {
            const data = await apiRequest(`/subscriptions/${subscriptionId}/selection`);
            return { subscriptionId, lines: data.lines || [] };
        } catch (err) {
            return rejectWithValue({ subscriptionId, message: err.message || 'Failed to load your picks' });
        }
    }
);

// 2. Bundle template (public) - used to derive category slot requirements client-side,
// the same grouping the backend does in getBundleSlotRequirements().
export const fetchBundleTemplate = createAsyncThunk(
    'subscriptionSelection/fetchBundleTemplate',
    async (bundleId, { rejectWithValue }) => {
        try {
            const bundle = await apiRequest(`/bundles/${bundleId}`);
            return { bundleId, bundle };
        } catch (err) {
            return rejectWithValue({ bundleId, message: err.message || 'Failed to load bundle details' });
        }
    }
);

// 3. In-stock candidate products for one category slot (public).
export const fetchCategoryProducts = createAsyncThunk(
    'subscriptionSelection/fetchCategoryProducts',
    async (categoryId, { rejectWithValue }) => {
        try {
            const data = await apiRequest(`/products?category_id=${categoryId}&limit=100`);
            return { categoryId, products: data.products || [] };
        } catch (err) {
            return rejectWithValue({ categoryId, message: err.message || 'Failed to load products' });
        }
    }
);

// 4. Active delivery cutoff rule (public) - drives the "editable until" / lock copy.
export const fetchActiveCutoff = createAsyncThunk(
    'subscriptionSelection/fetchActiveCutoff',
    async (_, { rejectWithValue }) => {
        try {
            return await apiRequest('/delivery/cutoff/active');
        } catch (err) {
            // No active cutoff rule configured is a valid state (nothing locks picks) - not an error to surface.
            return rejectWithValue(err.message || null);
        }
    }
);

// 5. Save an explicit pick for one bundle line.
export const savePendingSelection = createAsyncThunk(
    'subscriptionSelection/savePendingSelection',
    async ({ subscriptionId, bundleId, selectedProducts }, { rejectWithValue }) => {
        try {
            const data = await apiRequest(`/subscriptions/${subscriptionId}/selection`, {
                method: 'PUT',
                body: JSON.stringify({ bundle_id: bundleId, selected_products: selectedProducts }),
            });
            return { subscriptionId, bundleId, selection: data.selection };
        } catch (err) {
            return rejectWithValue({
                subscriptionId,
                bundleId,
                status: err.status,
                message: err.message || 'Failed to save your pick',
            });
        }
    }
);

// 6. Subscription-wide "repeat my last order" - clears every line back to repeat_last mode.
export const repeatLastOrder = createAsyncThunk(
    'subscriptionSelection/repeatLastOrder',
    async (subscriptionId, { rejectWithValue }) => {
        try {
            await apiRequest(`/subscriptions/${subscriptionId}/selection/repeat-last`, { method: 'POST' });
            return { subscriptionId };
        } catch (err) {
            return rejectWithValue({
                subscriptionId,
                status: err.status,
                message: err.message || 'Failed to reset to your last order',
            });
        }
    }
);

const subscriptionSelectionSlice = createSlice({
    name: 'subscriptionSelection',
    initialState: {
        // subscriptionId -> { lines, loading, error }
        selectionBySubscription: {},
        // bundleId -> { bundle, slots, loading, error }
        bundleTemplates: {},
        // categoryId -> { products, loading, error }
        categoryProducts: {},
        // Active cutoff rule (or null if none configured)
        cutoff: { rule: null, loading: false, checked: false },
        // `${subscriptionId}:${bundleId}` -> bool
        saving: {},
        // subscriptionId -> bool
        repeating: {},
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Selection state
            .addCase(fetchSelectionState.pending, (state, action) => {
                const subId = action.meta.arg;
                state.selectionBySubscription[subId] = {
                    ...(state.selectionBySubscription[subId] || {}),
                    loading: true,
                    error: null,
                };
            })
            .addCase(fetchSelectionState.fulfilled, (state, action) => {
                const { subscriptionId, lines } = action.payload;
                state.selectionBySubscription[subscriptionId] = { lines, loading: false, error: null };
            })
            .addCase(fetchSelectionState.rejected, (state, action) => {
                const { subscriptionId, message } = action.payload || {};
                if (!subscriptionId) return;
                state.selectionBySubscription[subscriptionId] = {
                    ...(state.selectionBySubscription[subscriptionId] || {}),
                    loading: false,
                    error: message,
                };
            })

            // Bundle templates
            .addCase(fetchBundleTemplate.pending, (state, action) => {
                const bundleId = action.meta.arg;
                state.bundleTemplates[bundleId] = {
                    ...(state.bundleTemplates[bundleId] || {}),
                    loading: true,
                    error: null,
                };
            })
            .addCase(fetchBundleTemplate.fulfilled, (state, action) => {
                const { bundleId, bundle } = action.payload;
                state.bundleTemplates[bundleId] = {
                    bundle,
                    slots: computeSlots(bundle.products || []),
                    loading: false,
                    error: null,
                };
            })
            .addCase(fetchBundleTemplate.rejected, (state, action) => {
                const { bundleId, message } = action.payload || {};
                if (!bundleId) return;
                state.bundleTemplates[bundleId] = {
                    ...(state.bundleTemplates[bundleId] || {}),
                    loading: false,
                    error: message,
                };
            })

            // Category products
            .addCase(fetchCategoryProducts.pending, (state, action) => {
                const categoryId = action.meta.arg;
                state.categoryProducts[categoryId] = {
                    ...(state.categoryProducts[categoryId] || {}),
                    loading: true,
                    error: null,
                };
            })
            .addCase(fetchCategoryProducts.fulfilled, (state, action) => {
                const { categoryId, products } = action.payload;
                state.categoryProducts[categoryId] = { products, loading: false, error: null };
            })
            .addCase(fetchCategoryProducts.rejected, (state, action) => {
                const { categoryId, message } = action.payload || {};
                if (!categoryId) return;
                state.categoryProducts[categoryId] = {
                    ...(state.categoryProducts[categoryId] || {}),
                    loading: false,
                    error: message,
                };
            })

            // Cutoff
            .addCase(fetchActiveCutoff.pending, (state) => {
                state.cutoff.loading = true;
            })
            .addCase(fetchActiveCutoff.fulfilled, (state, action) => {
                state.cutoff = { rule: action.payload, loading: false, checked: true };
            })
            .addCase(fetchActiveCutoff.rejected, (state) => {
                state.cutoff = { rule: null, loading: false, checked: true };
            })

            // Save pick
            .addCase(savePendingSelection.pending, (state, action) => {
                const { subscriptionId, bundleId } = action.meta.arg;
                state.saving[`${subscriptionId}:${bundleId}`] = true;
            })
            .addCase(savePendingSelection.fulfilled, (state, action) => {
                const { subscriptionId, bundleId, selection } = action.payload;
                state.saving[`${subscriptionId}:${bundleId}`] = false;
                const sub = state.selectionBySubscription[subscriptionId];
                if (sub) {
                    const line = sub.lines.find((l) => l.bundle_id === bundleId);
                    if (line) {
                        line.mode = 'explicit_pick';
                        line.selected_products = selection?.selected_products || line.selected_products;
                    }
                }
            })
            .addCase(savePendingSelection.rejected, (state, action) => {
                const { subscriptionId, bundleId, status } = action.payload || {};
                if (subscriptionId && bundleId) state.saving[`${subscriptionId}:${bundleId}`] = false;
                if (subscriptionId && status === 409) {
                    state.selectionBySubscription[subscriptionId] = {
                        ...(state.selectionBySubscription[subscriptionId] || {}),
                        lockConflict: true,
                    };
                }
            })

            // Repeat last order
            .addCase(repeatLastOrder.pending, (state, action) => {
                state.repeating[action.meta.arg] = true;
            })
            .addCase(repeatLastOrder.fulfilled, (state, action) => {
                const { subscriptionId } = action.payload;
                state.repeating[subscriptionId] = false;
                const sub = state.selectionBySubscription[subscriptionId];
                if (sub) {
                    sub.lines = sub.lines.map((l) => ({ ...l, mode: 'repeat_last', selected_products: null }));
                }
            })
            .addCase(repeatLastOrder.rejected, (state, action) => {
                const { subscriptionId, status } = action.payload || {};
                if (subscriptionId) {
                    state.repeating[subscriptionId] = false;
                    if (status === 409) {
                        state.selectionBySubscription[subscriptionId] = {
                            ...(state.selectionBySubscription[subscriptionId] || {}),
                            lockConflict: true,
                        };
                    }
                }
            });
    },
});

/**
 * Group a bundle's template products by category, summing each category's
 * required quantity - the same grouping subscriptionSelection.service.js's
 * getBundleSlotRequirements() does server-side, so a slot here always means
 * the same thing the PUT endpoint will validate against.
 */
function computeSlots(bundleProducts) {
    const byCategory = new Map();
    for (const p of bundleProducts) {
        const categoryId = p.category_id || p.category?.id;
        if (!categoryId) continue;
        const categoryName = p.category?.name || 'Other';
        const quantity = p.BundleItem?.quantity || 0;
        if (!byCategory.has(categoryId)) {
            byCategory.set(categoryId, { categoryId, categoryName, required: 0 });
        }
        byCategory.get(categoryId).required += quantity;
    }
    return [...byCategory.values()];
}

export default subscriptionSelectionSlice.reducer;
