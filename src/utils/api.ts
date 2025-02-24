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
    login: (username: string, password: string) => request('/auth/login/', 'POST', { username, password }),
    register: (email: string, password: string, username: string) =>
        request('/auth/register/', 'POST', { email, password, username }),
    getProfile: (token: string) => request('/auth/profile/', 'GET', undefined, token),
    updateProfile: (token: string, userData: any) => request('/auth/profile/', 'PUT', userData, token),
    getUsers: (token: string) => request('/users/', 'GET', undefined, token),
};



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