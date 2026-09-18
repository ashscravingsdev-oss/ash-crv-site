import { configureStore } from '@reduxjs/toolkit';
import productReducer from './productSlice';
import bundleReducer from './bundleSlice';
import cartReducer from './cartSlice';
import authReducer from './authSlice';
import dashboardReducer from './dashboardSlice';
import subscriptionSelectionReducer from './subscriptionSelectionSlice';

export const makeStore = () => {
    return configureStore({
        reducer: {
            auth: authReducer,
            dashboard: dashboardReducer,
            products: productReducer,
            bundles: bundleReducer,
            cart: cartReducer,
            subscriptionSelection: subscriptionSelectionReducer,
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: {
                    ignoredActions: ['products/uploadImage/pending'],
                },
            }),
    });
};