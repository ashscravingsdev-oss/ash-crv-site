import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { fetchCart, setCart } from './cartSlice';

// Signup user
export const signup = createAsyncThunk(
    'auth/signup',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: userData.username,
                    email: userData.email,
                    password: userData.password
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                return rejectWithValue(data);
            }
            console.log(data, 'data');

            if (data.accessToken) {
                Cookies.set('accessToken', data.accessToken, { expires: 7 });

                const user = {
                    id: data.id,
                    email: data.email,
                    username: data.username,
                    roles: data.roles,
                    is_verified: data.is_verified
                };

                Cookies.set('user', JSON.stringify(user), { expires: 7 });
            }

            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const signin = createAsyncThunk(
    'auth/signin',
    async (credentials, { rejectWithValue, dispatch }) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/signin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: credentials.email,
                    password: credentials.password
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                return rejectWithValue(data);
            }

            // Store token and user in cookies
            if (data.accessToken) {
                Cookies.set('accessToken', data.accessToken, { expires: 7 });

                const user = {
                    id: data.id,
                    email: data.email,
                    username: data.username,
                    roles: data.roles,
                    is_verified: data.is_verified
                };

                Cookies.set('user', JSON.stringify(user), { expires: 7 });

                // Get session_id before potentially removing it
                const sessionId = Cookies.get('session_id');

                // Call backend to merge carts
                if (sessionId) {
                    try {
                        const mergeResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/cart/merge`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${data.accessToken}`
                            },
                            body: JSON.stringify({ session_id: sessionId })
                        });

                        if (mergeResponse.ok) {
                            const mergedCart = await mergeResponse.json();
                            // Update cart in Redux with merged cart
                            dispatch(setCart(mergedCart));

                        }
                    } catch (mergeError) {
                        console.error('Error merging cart:', mergeError);
                    }
                }

                // Fetch fresh cart after merge
                await dispatch(fetchCart());
            }

            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
// Logout user
export const logout = createAsyncThunk(
    'auth/logout',
    async (_, { rejectWithValue }) => {
        try {
            // Clear cookies
            Cookies.remove('accessToken');
            Cookies.remove('user');

            return { success: true };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        // User info
        user: null,
        accessToken: null,

        // Loading states
        signupLoading: false,
        signinLoading: false,
        logoutLoading: false,
        checkingAuth: true, // Start as true while checking initial auth state

        // Error states
        signupError: null,
        signinError: null,
        logoutError: null,

        // Success states
        signupSuccess: false,
        signinSuccess: false,
        isAuthenticated: false,
    },
    reducers: {
        resetAuthState: (state) => {
            state.signupLoading = false;
            state.signinLoading = false;
            state.logoutLoading = false;
            state.signupError = null;
            state.signinError = null;
            state.logoutError = null;
            state.signupSuccess = false;
            state.signinSuccess = false;
        },
        clearAuthErrors: (state) => {
            state.signupError = null;
            state.signinError = null;
            state.logoutError = null;
        },
        resetSignupState: (state) => {
            state.signupLoading = false;
            state.signupError = null;
            state.signupSuccess = false;
        },
        resetSigninState: (state) => {
            state.signinLoading = false;
            state.signinError = null;
            state.signinSuccess = false;
        },
        // Manual logout (without API call)
        manualLogout: (state) => {
            state.user = null;
            state.accessToken = null;
            state.isAuthenticated = false;
            Cookies.remove('accessToken');
            Cookies.remove('user');
        },
    },
    extraReducers: (builder) => {
        builder
            // Signup cases
            .addCase(signup.pending, (state) => {
                state.signupLoading = true;
                state.signupError = null;
                state.signupSuccess = false;
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.signupLoading = false;
                state.signupSuccess = true;
            })
            .addCase(signup.rejected, (state, action) => {
                state.signupLoading = false;
                state.signupError = action.payload || action.error.message;
                state.signupSuccess = false;
            })

            // Signin cases
            .addCase(signin.pending, (state) => {
                state.signinLoading = true;
                state.signinError = null;
                state.signinSuccess = false;
            })
            .addCase(signin.fulfilled, (state, action) => {
                state.signinLoading = false;
                state.signinSuccess = true;
                state.isAuthenticated = true;
                state.user = action.payload.user || action.payload;
                state.accessToken = action.payload.accessToken;
            })
            .addCase(signin.rejected, (state, action) => {
                state.signinLoading = false;
                state.signinError = action.payload || action.error.message;
                state.signinSuccess = false;
                state.isAuthenticated = false;
                state.user = null;
                state.accessToken = null;
            })

            // Logout cases
            .addCase(logout.pending, (state) => {
                state.logoutLoading = true;
                state.logoutError = null;
            })
            .addCase(logout.fulfilled, (state) => {
                state.logoutLoading = false;
                state.user = null;
                state.accessToken = null;
                state.isAuthenticated = false;
                state.signupSuccess = false;
                state.signinSuccess = false;
            })
            .addCase(logout.rejected, (state, action) => {
                state.logoutLoading = false;
                state.logoutError = action.payload || action.error.message;
                state.user = null;
                state.accessToken = null;
                state.isAuthenticated = false;
            })
            ;
    },
});

export const {
    resetAuthState,
    clearAuthErrors,
    resetSignupState,
    resetSigninState,
    manualLogout
} = authSlice.actions;

// Selectors
export const selectUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectAccessToken = (state) => state.auth.accessToken;
export const selectAuthLoading = (state) => ({
    signup: state.auth.signupLoading,
    signin: state.auth.signinLoading,
    logout: state.auth.logoutLoading,
    checking: state.auth.checkingAuth
});
export const selectAuthErrors = (state) => ({
    signup: state.auth.signupError,
    signin: state.auth.signinError,
    logout: state.auth.logoutError
});

export default authSlice.reducer;