'use client';

import { useRef } from 'react';
import { Provider } from 'react-redux';
import { makeStore } from '@/store/store';
// Wakes the free backend early and quietly retries while it wakes up
import '@/lib/backend-wake';

export default function StoreProvider({ children }) {
    const storeRef = useRef();
    if (!storeRef.current) {
        storeRef.current = makeStore();
    }

    return <Provider store={storeRef.current}>{children}</Provider>;
}