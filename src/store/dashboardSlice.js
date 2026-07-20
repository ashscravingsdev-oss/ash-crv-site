import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiRequest } from '@/lib/apiRequest';

// ---------- Async Thunks ----------

// 1. Fetch user orders (list)
export const fetchUserOrders = createAsyncThunk(
    'dashboard/fetchUserOrders',
    async (params = {}, { rejectWithValue }) => {
        try {
            const query = new URLSearchParams();
            if (params.page) query.append('page', params.page);
            if (params.limit) query.append('limit', params.limit);
            if (params.status) query.append('status', params.status);
            const qs = query.toString();
            const endpoint = `/orders${qs ? `?${qs}` : ''}`;
            return await apiRequest(endpoint);
        } catch (err) {
            return rejectWithValue(err.message || err);
        }
    }
);

// 2. Fetch order detail
export const fetchUserOrderById = createAsyncThunk(
    'dashboard/fetchUserOrderById',
    async (orderId, { rejectWithValue }) => {
        try {
            const endpoint = `/orders/${orderId}`;
            return await apiRequest(endpoint);
        } catch (err) {
            return rejectWithValue(err.message || err);
        }
    }
);

// 3. Fetch user subscriptions
export const fetchUserSubscriptions = createAsyncThunk(
    'dashboard/fetchUserSubscriptions',
    async (_, { rejectWithValue }) => {
        try {
            const endpoint = '/subscriptions';
            return await apiRequest(endpoint);
        } catch (err) {
            return rejectWithValue(err.message || err);
        }
    }
);

// 4. Pause subscription
export const pauseUserSubscription = createAsyncThunk(
    'dashboard/pauseUserSubscription',
    async (subId, { rejectWithValue }) => {
        try {
            const endpoint = `/subscriptions/${subId}/pause`;
            return await apiRequest(endpoint, { method: 'PATCH' });
        } catch (err) {
            return rejectWithValue(err.message || err);
        }
    }
);

// 5. Resume subscription
export const resumeUserSubscription = createAsyncThunk(
    'dashboard/resumeUserSubscription',
    async (subId, { rejectWithValue }) => {
        try {
            const endpoint = `/subscriptions/${subId}/resume`;
            return await apiRequest(endpoint, { method: 'PATCH' });
        } catch (err) {
            return rejectWithValue(err.message || err);
        }
    }
);

// 6. Dashboard stats
export const fetchDashboardStats = createAsyncThunk(
    'dashboard/fetchDashboardStats',
    async (_, { rejectWithValue }) => {
        try {
            const endpoint = '/dashboard/stats';
            return await apiRequest(endpoint);
        } catch (err) {
            return rejectWithValue(err.message || err);
        }
    }
);
export const skipUserSubscription = createAsyncThunk(
    'dashboard/skipUserSubscription',
    async (subId, { rejectWithValue }) => {
        try {
            const endpoint = `/subscriptions/${subId}/skip`;
            return await apiRequest(endpoint, { method: 'PATCH' });
        } catch (err) {
            return rejectWithValue(err.message || err);
        }
    }
);

// ---------- Slice ----------
const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState: {
        // Orders
        orders: [],
        orderDetail: null,
        ordersPagination: { total: 0, page: 1, totalPages: 0, hasNextPage: false, hasPrevPage: false },

        // Subscriptions
        subscriptions: [],

        // Stats
        stats: {
            totalOrders: 0,
            nextDelivery: null,
            activeSubscription: false,
        },

        // Loading
        loading: {
            orders: false,
            orderDetail: false,
            subscriptions: false,
            stats: false,
            pause: false,
            resume: false,
            skip: false,
        },

        // Errors
        error: null,
    },
    reducers: {
        clearDashboardError: (state) => { state.error = null; },
        clearOrderDetail: (state) => { state.orderDetail = null; },
    },
    extraReducers: (builder) => {
        builder
            // Orders list
            .addCase(fetchUserOrders.pending, (state) => { state.loading.orders = true; state.error = null; })
            .addCase(fetchUserOrders.fulfilled, (state, action) => {
                state.loading.orders = false;
                state.orders = action.payload.orders || [];
                state.ordersPagination = action.payload.pagination || initialState.ordersPagination;
            })
            .addCase(fetchUserOrders.rejected, (state, action) => {
                state.loading.orders = false;
                state.error = action.payload || action.error.message;
            })

            // Order detail
            .addCase(fetchUserOrderById.pending, (state) => { state.loading.orderDetail = true; state.error = null; })
            .addCase(fetchUserOrderById.fulfilled, (state, action) => {
                state.loading.orderDetail = false;
                state.orderDetail = action.payload;
            })
            .addCase(fetchUserOrderById.rejected, (state, action) => {
                state.loading.orderDetail = false;
                state.error = action.payload || action.error.message;
            })

            // Subscriptions list
            .addCase(fetchUserSubscriptions.pending, (state) => { state.loading.subscriptions = true; state.error = null; })
            .addCase(fetchUserSubscriptions.fulfilled, (state, action) => {
                state.loading.subscriptions = false;
                state.subscriptions = action.payload.subscriptions || [];
            })
            .addCase(fetchUserSubscriptions.rejected, (state, action) => {
                state.loading.subscriptions = false;
                state.error = action.payload || action.error.message;
            })

            // Pause subscription
            .addCase(pauseUserSubscription.pending, (state) => { state.loading.pause = true; state.error = null; })
            .addCase(pauseUserSubscription.fulfilled, (state, action) => {
                state.loading.pause = false;
                // Update the subscription in the list
                const updated = action.payload.subscription;
                if (updated) {
                    const idx = state.subscriptions.findIndex(s => s.id === updated.id);
                    if (idx !== -1) state.subscriptions[idx] = updated;
                }
            })
            .addCase(pauseUserSubscription.rejected, (state, action) => {
                state.loading.pause = false;
                state.error = action.payload || action.error.message;
            })

            // Resume subscription
            .addCase(resumeUserSubscription.pending, (state) => { state.loading.resume = true; state.error = null; })
            .addCase(resumeUserSubscription.fulfilled, (state, action) => {
                state.loading.resume = false;
                const updated = action.payload.subscription;
                if (updated) {
                    const idx = state.subscriptions.findIndex(s => s.id === updated.id);
                    if (idx !== -1) state.subscriptions[idx] = updated;
                }
            })
            .addCase(resumeUserSubscription.rejected, (state, action) => {
                state.loading.resume = false;
                state.error = action.payload || action.error.message;
            })

            // Dashboard stats
            .addCase(fetchDashboardStats.pending, (state) => { state.loading.stats = true; state.error = null; })
            .addCase(fetchDashboardStats.fulfilled, (state, action) => {
                state.loading.stats = false;
                state.stats = action.payload; // { totalOrders, nextDelivery, activeSubscription }
            })
            .addCase(fetchDashboardStats.rejected, (state, action) => {
                state.loading.stats = false;
                state.error = action.payload || action.error.message;
            })
            .addCase(skipUserSubscription.pending, (state) => { state.loading.skip = true; state.error = null; })
            .addCase(skipUserSubscription.fulfilled, (state, action) => {
                state.loading.skip = false;
                const updated = action.payload.subscription;
                if (updated) {
                    const idx = state.subscriptions.findIndex(s => s.id === updated.id);
                    if (idx !== -1) state.subscriptions[idx] = updated;
                }
            })
            .addCase(skipUserSubscription.rejected, (state, action) => {
                state.loading.skip = false;
                state.error = action.payload || action.error.message;
            });
    },
});

export const { clearDashboardError, clearOrderDetail } = dashboardSlice.actions;
export default dashboardSlice.reducer;