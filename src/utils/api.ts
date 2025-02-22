import axios from "axios";

const API_URL = "http://89.46.33.188/api/"; // Используем проксированный путь

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Если используешь сессионную авторизацию
  headers: {
    "Content-Type": "application/json",
  },
});

// Добавляем токен в заголовки перед каждым запросом
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });