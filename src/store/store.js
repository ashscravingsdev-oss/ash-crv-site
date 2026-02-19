import { configureStore } from '@reduxjs/toolkit';
import productReducer from './productSlice';
import bundleReducer from './bundleSlice';
import cartReducer from './cartSlice';

export const makeStore = () => {
    return configureStore({
        reducer: {
            products: productReducer,
            bundles: bundleReducer,
            cart: cartReducer,
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: {
                    ignoredActions: ['products/uploadImage/pending'],
                },
            }),
    });
};