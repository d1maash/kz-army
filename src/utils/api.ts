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
        });

        let data;
        const contentType = response.headers.get("content-type");

        // Проверяем, что сервер действительно вернул JSON
        if (contentType && contentType.includes("application/json")) {
            data = await response.json();
        } else {
            throw new Error(`Ошибка сервера: ${response.status}`);
        }

        if (!response.ok) {
            const errorMessage = data?.username?.[0] ||
                data?.email?.[0] ||
                data?.password?.[0] ||
                'Ошибка регистрации';
            throw new Error(errorMessage);
        }

        return data;
    },
    // Изменил на 'auth/me
    getProfile: async () => {
        const token = localStorage.getItem('token')
        if (!token) throw new Error('Требуется авторизация')

        const response = await fetch(`${BASE_URL}/auth/me/`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })

        if (response.status === 401) {
            localStorage.removeItem('token')
            throw new Error('Сессия истекла')
        }

        const data = await response.json()
        if (!response.ok) throw new Error(data.detail || 'Ошибка загрузки профиля')
        return data
    },

    updateProfile: async (userData: any) => {
        const token = localStorage.getItem('token')
        if (!token) throw new Error('Требуется авторизация')

        const response = await fetch(`${BASE_URL}/auth/me/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(userData),
        })

        const data = await response.json()
        if (!response.ok) throw new Error(data.detail || 'Ошибка обновления профиля')
        return data
    },
    // updateProfile: (token: string, userData: any) => request('/auth/profile/', 'PUT', userData, token),
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

    logout: () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
    },
    postFormData: async (endpoint: string, formData: FormData) => {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('Требуется авторизация');

        try {
            const response = await fetch(`${BASE_URL}${endpoint}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    // Не устанавливаем Content-Type вручную!
                },
                body: formData,
            });

            // Обработка 401
            if (response.status === 401) {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                window.location.href = '/auth/login';
                return;
            }

            const data = await response.json();

            if (!response.ok) {
                let errorMessage = 'Ошибка при выполнении запроса';

                if (data.detail) {
                    errorMessage = data.detail;
                } else if (data.files) {
                    errorMessage = data.files.join(', ');
                } else if (typeof data === 'object') {
                    errorMessage = Object.entries(data)
                        .map(([field, errors]) =>
                            `${field}: ${Array.isArray(errors) ? errors.join(', ') : errors}`
                        )
                        .join('\n');
                }

                throw new Error(errorMessage);
            }

            return data;
        } catch (error) {
            console.error('Ошибка в postFormData:', error);
            throw error;
        }
    },
    // Admin методы:
    getApplications: async (token: string) => {
        const response = await fetch(`${BASE_URL}/admin/applications/`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.detail || 'Ошибка загрузки заявок');
        return data;
    },

    updateApplicationById: async (id: number, status: string) => {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('Требуется авторизация');
    
        // Делаем Гет запрос
        const applicationResponse = await fetch(`${BASE_URL}/admin/applications/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
    
        if (!applicationResponse.ok) {
            throw new Error("Failed to fetch application data");
        }
    
        const applicationData = await applicationResponse.json();
    
        // Update the object with new status
        const updatedApplication = {
            ...applicationData,
            status, // Only updating the status
        };
    
        // Send the full object as the API expects
        const response = await fetch(`${BASE_URL}/admin/applications/${id}/`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedApplication),
        });
    
        if (!response.ok) {
            throw new Error("Failed to update application status");
        }
    
        return await response.json();
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
