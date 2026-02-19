import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Get all active bundles (public)
export const fetchActiveBundles = createAsyncThunk(
    'bundles/fetchActiveBundles',
    async (params = {}, { rejectWithValue }) => {
        try {
            // Build query string from params
            const queryParams = new URLSearchParams();

            if (params.page) queryParams.append('page', params.page);
            if (params.limit) queryParams.append('limit', params.limit);
            if (params.search) queryParams.append('search', params.search);
            if (params.sortBy) queryParams.append('sortBy', params.sortBy);
            if (params.sortOrder) queryParams.append('sortOrder', params.sortOrder);

            const queryString = queryParams.toString();
            const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/bundles${queryString ? `?${queryString}` : ''}`;

            const response = await fetch(url);

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

// Get bundle by ID (public)
export const fetchActiveBundleById = createAsyncThunk(
    'bundles/fetchActiveBundleById',
    async (id, { rejectWithValue }) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/bundles/${id}`);

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

const bundleSlice = createSlice({
    name: 'bundles',
    initialState: {
        // List bundles state
        bundles: [],
        loading: false,
        error: null,

        // Single bundle state
        bundle: null,
        bundleLoading: false,
        bundleError: null,

        // Pagination (if your API returns paginated response)
        total: 0,
        page: 1,
        totalPages: 0,
        hasNextPage: false,
        hasPrevPage: false,
    },
    reducers: {
        resetBundleState: (state) => {
            state.loading = false;
            state.error = null;
            state.bundleLoading = false;
            state.bundleError = null;
            state.success = false;
        },
        clearError: (state) => {
            state.error = null;
            state.bundleError = null;
        },
        resetBundles: (state) => {
            state.bundles = [];
            state.total = 0;
            state.page = 1;
            state.totalPages = 0;
            state.hasNextPage = false;
            state.hasPrevPage = false;
        },
        resetCurrentBundle: (state) => {
            state.bundle = null;
            state.bundleLoading = false;
            state.bundleError = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch all active bundles
            .addCase(fetchActiveBundles.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchActiveBundles.fulfilled, (state, action) => {
                state.loading = false;

                // Handle different response structures
                if (action.payload.bundles) {
                    // Paginated response
                    state.bundles = action.payload.bundles;
                    state.total = action.payload.total || 0;
                    state.page = action.payload.page || 1;
                    state.totalPages = action.payload.totalPages || 0;
                    state.hasNextPage = action.payload.hasNextPage || false;
                    state.hasPrevPage = action.payload.hasPrevPage || false;
                } else if (Array.isArray(action.payload)) {
                    // Direct array response
                    state.bundles = action.payload;
                } else {
                    // Single bundle or empty response
                    state.bundles = action.payload ? [action.payload] : [];
                }
            })
            .addCase(fetchActiveBundles.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
                state.bundles = [];
            })

            // Fetch single bundle by ID
            .addCase(fetchActiveBundleById.pending, (state) => {
                state.bundleLoading = true;
                state.bundleError = null;
            })
            .addCase(fetchActiveBundleById.fulfilled, (state, action) => {
                state.bundleLoading = false;
                state.bundle = action.payload;
            })
            .addCase(fetchActiveBundleById.rejected, (state, action) => {
                state.bundleLoading = false;
                state.bundleError = action.payload || action.error.message;
                state.bundle = null;
            });
    },
});

export const {
    resetBundleState,
    clearError,
    resetBundles,
    resetCurrentBundle
} = bundleSlice.actions;

export default bundleSlice.reducer;