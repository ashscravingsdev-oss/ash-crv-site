import { configureStore } from '@reduxjs/toolkit';
import productReducer from './productSlice';
import bundleReducer from './bundleSlice';

export const makeStore = () => {
    return configureStore({
        reducer: {
            products: productReducer,
            bundles: bundleReducer,
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: {
                    ignoredActions: ['products/uploadImage/pending'],
                },
            }),
    });
};