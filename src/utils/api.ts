const BASE_URL = 'http://89.46.33.188/api';

const request = async (endpoint: string, method = 'GET', body?: any) => {
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
    };

    const token = localStorage.getItem('token');
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.detail || data.message || 'Ошибка при запросе');
    }

    return data;
};

export const api = {
    login: (username: string, password: string) =>
        request('/auth/login/', 'POST', { username, password }),
    register: (email: string, password: string, username: string) =>
        request('/auth/register/', 'POST', { email, password, username }),
    getProfile: () => request('/auth/profile/', 'GET'),
    updateProfile: (userData: any) =>
        request('/auth/profile/', 'PUT', userData),
    getUsers: () => request('/users/', 'GET'),
};