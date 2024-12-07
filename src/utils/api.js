import { getTokens, refreshAccessToken, storeTokens } from "./auth";

const BASE_URL = 'http://localhost:9000/api/v1/';

const authenticatedFetch = async (endpoint, options = {}) => {
    try {
        const { accessToken } = getTokens();

        if (accessToken) {
            options.headers = {
                ...options.headers,
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        }
        
        let response = await fetch(`${BASE_URL}${endpoint}`, {
            ...options,
            credentials: 'include'
        });

        if (response.status === 401) {
            const newAccessToken = await refreshAccessToken();
            if (newAccessToken) {
                options.headers = {
                    ...options.headers,
                    'Authorization': `Bearer ${newAccessToken}`
                }
                response = await fetch(`${BASE_URL}${endpoint}`, {
                    ...options,
                    credentials: 'include'
                });
            }
        }
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Network response was not ok');
        }
        
        return response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

const loginUser = async (email, password) => {
    try {
        const response = await fetch(`${BASE_URL}login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ email, password }),
            credentials: 'include'
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({
                message: 'An error occurred during login'
            }));
            throw new Error(errorData.message);
        }

        const data = await response.json();
        // Store tokens immediately
        if (data.accessToken && data.refreshToken) {
            storeTokens(data.accessToken, data.refreshToken);
        } else {
            throw new Error('Token data missing from response');
        }
        return data;
    } catch (error) {
        console.error('Error logging in user:', error);
        throw error;
    }
};

export { authenticatedFetch, loginUser };