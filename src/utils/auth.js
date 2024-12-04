export const storeTokens = (accessToken, refreshToken) => {
    if (!accessToken || !refreshToken) {
        console.error('Missing tokens in storeTokens');
        return false;
    }
    try {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        return true;
    } catch (error) {
        console.error('Error storing tokens:', error);
        return false;
    }
};

export const getTokens = () => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');
        return { accessToken, refreshToken };
    } catch (error) {
        console.error('Error retrieving tokens:', error);
        return { accessToken: null, refreshToken: null };
    }
};

export const removeTokens = () => {
    try {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
    } catch (error) {
        console.error('Error removing tokens:', error);
    }
};

export const refreshAccessToken = async () => {
    try {
        const { refreshToken } = getTokens();
        if (!refreshToken) {
            throw new Error('No refresh token available');
        }

        const response = await fetch('http://localhost:9000/api/v1/refresh-token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ refreshToken })
        });

        if (!response.ok) {
            throw new Error('Failed to refresh token');
        }

        const data = await response.json();
        if (data.accessToken) {
            localStorage.setItem('accessToken', data.accessToken);
            return data.accessToken;
        } else {
            throw new Error('No access token in refresh response');
        }
    } catch (error) {
        console.error('Token refresh failed:', error);
        removeTokens(); // Clear tokens on refresh failure
        throw error;
    }
};