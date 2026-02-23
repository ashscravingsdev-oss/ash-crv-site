'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function ProtectedRoute({ children }) {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuth = () => {
            // Check cookies directly
            const token = Cookies.get('accessToken');
            const user = Cookies.get('user');

            if (!token || !user) {
                // No token, redirect to login
                router.replace('/login?redirect=' + encodeURIComponent(window.location.pathname));
                return;
            }

            setIsAuthenticated(true);
        };

        checkAuth();
    }, [router]);

    // If not authenticated, don't render children (redirect will happen)
    if (!isAuthenticated) {
        return null;
    }

    // Authenticated, render children
    return children;
}