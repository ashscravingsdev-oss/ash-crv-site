// utils/userApiRequest.js
import Cookies from 'js-cookie';

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const apiRequest = async (endpoint, options = {}) => {
    const token = Cookies.get('accessToken');

    const response = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }),
            ...options.headers,
        },
    });

    if (response.status === 401) {
        Cookies.remove('accessToken');
        Cookies.remove('user');
        window.location.href = '/login';
        throw new Error('Session expired');
    }

    if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw error;
    }

    return response.json();
};