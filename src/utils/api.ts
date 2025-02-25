const BASE_URL = 'http://89.46.33.188/api';

const request = async (endpoint: string, method = 'GET', body?: any, token?: string) => {
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
    };

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
        throw new Error(data.message || 'Ошибка при запросе');
    }

    return data;
};

// API методы
export const api = {
    register: async (email: string, password: string, username: string) => {
        const response = await fetch(`${BASE_URL}/auth/register/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                email,
                password
            }),
        })

        const data = await response.json()
        if (!response.ok) {
            const errorMessage = data.username?.[0] ||
                data.email?.[0] ||
                data.password?.[0] ||
                'Ошибка регистрации'
            throw new Error(errorMessage)
        }
        return data
    },
    getProfile: (token: string) => request('/auth/profile/', 'GET', undefined, token),
    updateProfile: (token: string, userData: any) => request('/auth/profile/', 'PUT', userData, token),
    getUsers: (token: string) => request('/users/', 'GET', undefined, token),
    login: async (username: string, password: string) => {
        const response = await fetch(`${BASE_URL}/auth/login/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        })

        const data = await response.json()
        if (!response.ok) throw new Error(data.detail || 'Ошибка входа')
        return data
    },

    postFormData: async (endpoint: string, formData: FormData) => {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('Требуется авторизация');

        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData,
        });

        if (response.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/auth/login';
        }

        const data = await response.json();
        if (!response.ok) throw new Error(data.detail || data.message || 'Ошибка отправки');
        return data;
    },
}



// import axios from "axios";

// const API_URL = "http://89.46.33.188/api/"; // Используем проксированный путь

// export const api = axios.create({
//   baseURL: API_URL,
//   withCredentials: true, // Если используешь сессионную авторизацию
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // Добавляем токен в заголовки перед каждым запросом
// api.interceptors.request.use((config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   });
