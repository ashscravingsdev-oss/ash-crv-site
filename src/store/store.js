import { configureStore } from '@reduxjs/toolkit';
import productReducer from './productSlice';

export const makeStore = () => {
    return configureStore({
        reducer: {
            products: productReducer,
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: {
                    ignoredActions: ['products/uploadImage/pending'],
                },
            }),
    });
};