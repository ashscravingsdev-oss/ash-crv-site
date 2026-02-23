// store/cartSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from "js-cookie";

// Helper function to get token
const getAuthHeaders = () => {
    const token = Cookies.get('accessToken');
    return {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
    };
};

// Helper function to get or create session_id
const getSessionId = () => {
    let sessionId = Cookies.get('session_id');

    if (!sessionId) {
        sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        Cookies.set('session_id', sessionId, {
            expires: 7,
            secure: true,
            sameSite: 'Lax',
        });
    }

    return sessionId;
};

// Helper to build URL with session_id if needed
const buildUrl = (endpoint, includeSessionId = true) => {
    const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const hasToken = !!Cookies.get('accessToken');

    // If user is authenticated, don't include session_id
    if (hasToken) {
        return `${baseUrl}${endpoint}`;
    }

    // For guest users, include session_id
    const sessionId = getSessionId();
    const separator = endpoint.includes('?') ? '&' : '?';
    return `${baseUrl}${endpoint}${separator}session_id=${sessionId}`;
};

// Get or create cart (supports both user and guest carts)
// store/cartSlice.js
export const fetchCart = createAsyncThunk(
    'cart/fetchCart',
    async (_, { rejectWithValue }) => {
        try {
            const url = buildUrl('/cart');
            const response = await fetch(url, {
                headers: getAuthHeaders()
            });

            if (!response.ok) {
                const errorData = await response.json();
                return rejectWithValue(errorData);
            }

            const data = await response.json();

            // Store cart in cookie for persistence across sessions
            if (data) {
                Cookies.set('cart', JSON.stringify(data), { expires: 7 });
            }

            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Add item to cart
export const addToCart = createAsyncThunk(
    'cart/addToCart',
    async (itemData, { rejectWithValue }) => {
        try {
            const url = buildUrl('/cart/items');
            const response = await fetch(url, {
                method: 'POST',
                headers: getAuthHeaders(),
                body: JSON.stringify(itemData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                return rejectWithValue(errorData);
            }

            return await response.json();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Update cart item (quantity or addons)
export const updateCartItem = createAsyncThunk(
    'cart/updateCartItem',
    async ({ id, updateData }, { rejectWithValue }) => {
        try {
            const url = buildUrl(`/cart/items/${id}`);
            const response = await fetch(url, {
                method: 'PUT',
                headers: getAuthHeaders(),
                body: JSON.stringify(updateData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                return rejectWithValue(errorData);
            }

            return await response.json();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Remove item from cart
export const removeFromCart = createAsyncThunk(
    'cart/removeFromCart',
    async (itemId, { rejectWithValue }) => {
        try {
            const url = buildUrl(`/cart/items/${itemId}`);
            const response = await fetch(url, {
                method: 'DELETE',
                headers: getAuthHeaders()
            });

            if (!response.ok) {
                const errorData = await response.json();
                return rejectWithValue(errorData);
            }

            return { itemId, ...(await response.json()) };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Clear entire cart
export const clearCart = createAsyncThunk(
    'cart/clearCart',
    async (_, { rejectWithValue, getState }) => {
        try {
            const state = getState();
            const cartId = state.cart.cartId || state.cart.items?.[0]?.cart_id;

            if (!cartId) {
                return rejectWithValue('No cart to clear');
            }

            const url = buildUrl(`/cart/${cartId}`);
            const response = await fetch(url, {
                method: 'DELETE',
                headers: getAuthHeaders()
            });

            if (!response.ok) {
                const errorData = await response.json();
                return rejectWithValue(errorData);
            }

            return { cartId, ...(await response.json()) };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Calculate cart totals
export const calculateCartTotals = createAsyncThunk(
    'cart/calculateCartTotals',
    async (_, { rejectWithValue, getState }) => {
        try {
            const state = getState();
            const cartId = state.cart.cartId || state.cart.items?.[0]?.cart_id;

            if (!cartId) {
                return rejectWithValue('No cart to calculate totals');
            }

            const url = buildUrl(`/cart/${cartId}/totals`);
            const response = await fetch(url, {
                headers: getAuthHeaders()
            });

            if (!response.ok) {
                const errorData = await response.json();
                return rejectWithValue(errorData);
            }

            return await response.json();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        // Cart data
        cart: null,
        cartId: null,
        items: [],

        // Cart totals
        subtotal: 0,
        taxTotal: 0,
        itemCount: 0,
        itemsWithTotals: [],

        // Loading states
        loading: false,
        itemLoading: false,
        totalsLoading: false,

        // Error states
        error: null,
        itemError: null,
        totalsError: null,

        // Success states
        addSuccess: false,
        updateSuccess: false,
        removeSuccess: false,
        clearSuccess: false,

        // Inventory availability messages
        availabilityMessage: null,
        availableQuantity: null,
    },
    reducers: {
        resetCartState: (state) => {
            state.loading = false;
            state.error = null;
            state.itemError = null;
            state.totalsError = null;
            state.addSuccess = false;
            state.updateSuccess = false;
            state.removeSuccess = false;
            state.clearSuccess = false;
            state.availabilityMessage = null;
            state.availableQuantity = null;
        },
        clearCartError: (state) => {
            state.error = null;
            state.itemError = null;
            state.totalsError = null;
            state.availabilityMessage = null;
            state.availableQuantity = null;
        },
        resetCartSuccess: (state) => {
            state.addSuccess = false;
            state.updateSuccess = false;
            state.removeSuccess = false;
            state.clearSuccess = false;
        },
        clearCartState: (state) => {
            state.cart = null;
            state.cartId = null;
            state.items = [];
            state.subtotal = 0;
            state.taxTotal = 0;
            state.itemCount = 0;
            state.itemsWithTotals = [];
        },
        // Optimistic updates
        updateItemQuantityOptimistic: (state, action) => {
            const { id, quantity } = action.payload;
            const item = state.items.find(item => item.id === id);
            if (item) {
                item.quantity = quantity;
            }
        },
        removeItemOptimistic: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
        // Add addons to item
        updateItemAddonsOptimistic: (state, action) => {
            const { id, addon_ids } = action.payload;
            const item = state.items.find(item => item.id === id);
            if (item) {
                item.addon_ids = addon_ids;
            }
        },
        setCart: (state, action) => {
            // Directly set cart data (used after merge)
            state.items = action.payload.items || [];
            state.cartId = action.payload.id || action.payload.cart_id;
            state.subtotal = action.payload.subtotal || 0;
            state.tax = action.payload.tax || 0;
            state.deliveryFee = action.payload.deliveryFee || 0;
            state.total = action.payload.total || 0;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch cart
            .addCase(fetchCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
                state.cartId = action.payload.id;
                state.items = action.payload.items || [];
                state.itemCount = action.payload.items?.length || 0;
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            })

            // Add to cart
            .addCase(addToCart.pending, (state) => {
                state.itemLoading = true;
                state.itemError = null;
                state.addSuccess = false;
                state.availabilityMessage = null;
                state.availableQuantity = null;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.itemLoading = false;
                state.addSuccess = true;

                // Update entire cart with response
                if (action.payload) {
                    state.cart = action.payload;
                    state.cartId = action.payload.id;
                    state.items = action.payload.items || [];
                    state.itemCount = action.payload.items?.length || 0;
                }
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.itemLoading = false;
                state.itemError = action.payload || action.error.message;
                state.addSuccess = false;

                // Handle inventory availability messages
                if (action.payload?.message) {
                    state.availabilityMessage = action.payload.message;
                    state.availableQuantity = action.payload.available_quantity ||
                        action.payload.available_additional || null;
                }
            })

            // Update cart item
            .addCase(updateCartItem.pending, (state) => {
                state.itemLoading = true;
                state.itemError = null;
                state.updateSuccess = false;
                state.availabilityMessage = null;
                state.availableQuantity = null;
            })
            .addCase(updateCartItem.fulfilled, (state, action) => {
                state.itemLoading = false;
                state.updateSuccess = true;

                // Update entire cart with response
                if (action.payload) {
                    state.cart = action.payload;
                    state.cartId = action.payload.id;
                    state.items = action.payload.items || [];
                    state.itemCount = action.payload.items?.length || 0;
                }
            })
            .addCase(updateCartItem.rejected, (state, action) => {
                state.itemLoading = false;
                state.itemError = action.payload || action.error.message;
                state.updateSuccess = false;

                // Handle inventory availability messages
                if (action.payload?.message) {
                    state.availabilityMessage = action.payload.message;
                    state.availableQuantity = action.payload.available_quantity || null;
                }
            })

            // Remove from cart
            .addCase(removeFromCart.pending, (state) => {
                state.itemLoading = true;
                state.itemError = null;
                state.removeSuccess = false;
            })
            .addCase(removeFromCart.fulfilled, (state, action) => {
                state.itemLoading = false;
                state.removeSuccess = true;

                // Update entire cart with response
                if (action.payload) {
                    state.cart = action.payload;
                    state.cartId = action.payload.id;
                    state.items = action.payload.items || [];
                    state.itemCount = action.payload.items?.length || 0;
                }
            })
            .addCase(removeFromCart.rejected, (state, action) => {
                state.itemLoading = false;
                state.itemError = action.payload || action.error.message;
                state.removeSuccess = false;
            })

            // Clear cart
            .addCase(clearCart.pending, (state) => {
                state.itemLoading = true;
                state.itemError = null;
                state.clearSuccess = false;
            })
            .addCase(clearCart.fulfilled, (state, action) => {
                state.itemLoading = false;
                state.clearSuccess = true;

                // Update with empty cart
                if (action.payload) {
                    state.cart = action.payload;
                    state.items = action.payload.items || [];
                    state.itemCount = 0;
                    state.subtotal = 0;
                    state.taxTotal = 0;
                    state.itemsWithTotals = [];
                }
            })
            .addCase(clearCart.rejected, (state, action) => {
                state.itemLoading = false;
                state.itemError = action.payload || action.error.message;
                state.clearSuccess = false;
            })

            // Calculate cart totals
            .addCase(calculateCartTotals.pending, (state) => {
                state.totalsLoading = true;
                state.totalsError = null;
            })
            .addCase(calculateCartTotals.fulfilled, (state, action) => {
                state.totalsLoading = false;

                // Update totals from response
                if (action.payload) {
                    state.subtotal = action.payload.subtotal || 0;
                    state.taxTotal = action.payload.tax_total || 0;
                    state.itemCount = action.payload.item_count || state.items.length;
                    state.itemsWithTotals = action.payload.items || [];
                }
            })
            .addCase(calculateCartTotals.rejected, (state, action) => {
                state.totalsLoading = false;
                state.totalsError = action.payload || action.error.message;
            });
    },
});

export const {
    resetCartState,
    clearCartError,
    resetCartSuccess,
    clearCartState,
    updateItemQuantityOptimistic,
    removeItemOptimistic,
    updateItemAddonsOptimistic,
    setCart
} = cartSlice.actions;

export default cartSlice.reducer;