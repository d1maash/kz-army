const BASE_URL = 'https://api.myarmy.kz/api';

// interface Article {
//     id: number;
//     title: string;
//     short_description: string;
//     content: string;
//     category: string;
//     published_date: string;
//     main_photo: string;
// }

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
        const token = localStorage.getItem('token');
        if (!token) {
            // Убираем автоматическое перенаправление и очистку localStorage
            // localStorage.removeItem('token');
            // localStorage.removeItem('user');
            // window.location.href = '/auth/login';
            throw new Error('Требуется авторизация');
        }

        const response = await fetch(`${BASE_URL}/auth/me/`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (response.status === 401) {
            // Убираем автоматическое перенаправление и очистку localStorage
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            localStorage.removeItem('is_admin');
            // window.location.href = '/auth/login';
            throw new Error('Сессия истекла');
        }

        const data = await response.json();
        if (!response.ok) throw new Error(data.detail || 'Ошибка загрузки профиля');
        return data;
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
        if (!token) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/auth/login';
            throw new Error('Требуется авторизация');
        }

        try {
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
                throw new Error('Сессия истекла');
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
    getApplications: async (token: string, page: number, pageSize: number) => {
        const response = await fetch(`${BASE_URL}/admin/applications/?page=${page}&page_size=${pageSize}`, {
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

    deleteApplicationById: async (id: number) => {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('Требуется авторизация');

        const response = await fetch(`${BASE_URL}/admin/applications/${id}/`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error("Failed to delete application");
        }

        return true;
    },

    // Админ Вопросы:
    getQuestions: async (token: string, page: number, pageSize: number) => {
        const response = await fetch(`${BASE_URL}/admin/questions/?page=${page}&page_size=${pageSize}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.detail || 'Ошибка загрузки вопросов');
        return data;
    },

    answerQuestion: async (token: string, questionId: number, answer: string) => {
        const response = await fetch(`${BASE_URL}/admin/questions/${questionId}/`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                answer: answer,
                status: "answered" // Add if your API requires status change
            })
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.detail || 'Ошибка отправки ответа');
        return data;
    },

    deleteQuestionById: async (id: number) => {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('Требуется авторизация');

        const response = await fetch(`${BASE_URL}/admin/questions/${id}/`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error("Failed to delete application");
        }

        return true;
    },


    // Articles методы:
    getArticles: async (page: number = 1, pageSize: number = 6) => {
        try {
            const response = await fetch(
                `${BASE_URL}/articles/?page=${page}&page_size=${pageSize}`,
                { method: 'GET' }
            );

            const data = await response.json();
            if (!response.ok) throw new Error(data.detail || 'Ошибка загрузки статей');

            return {
                results: data.results,
                count: data.count // Total number of items
            };
        } catch (error) {
            console.error('Error fetching articles:', error);
            throw error;
        }
    },

    getArticleById: async (id: number) => {
        try {
            const response = await fetch(`${BASE_URL}/articles/${id}/`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                },
            });

            return await response.json();
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Failed to fetch article: ${error.message}`);
            }
            throw new Error('Unknown error occurred while fetching article');
        }
    },

    // Profiles методы:
    getProfiles: async () => {
        const response = await fetch(`${BASE_URL}/profiles/`, {
            method: 'GET',
        });

        const data = await response.json();
        if (!response.ok) {
            console.error('Error fetching Profiles:', data);
            throw new Error(data.detail || 'Ошибка загрузки сотрудников');
        }
        return data;
    },

    getProfileById: async (id: number | string) => {
        const response = await fetch(`${BASE_URL}/profiles/${id}/`, {
            method: 'GET',
        });

        const data = await response.json();
        if (!response.ok) {
            console.error('Error fetching Profile:', data);
            throw new Error(data.detail || 'Ошибка загрузки профиля сотрудника');
        }
        return data;
    },

    // Вопросы для сотрудников
    createQuestion: async (formData: FormData) => {
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

        const headers = new Headers();
        if (token) {
            headers.append('Authorization', `Bearer ${token}`);
        }

        const response = await fetch(`${BASE_URL}/questions/questions/`, {
            method: 'POST',
            headers: headers,
            body: formData
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || "Error posting question");
        }
        return response.json();
    },

    // Добавляем новый метод для создания заявки
    createCommunication: async (formData: FormData) => {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Требуется авторизация');
        }

        const response = await fetch(`${BASE_URL}/applications/applications/communications/`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData,
        });

        if (response.status === 401) {
            throw new Error('Сессия истекла');
        }

        if (response.status === 409) {
            throw new Error('У вас уже есть активная заявка');
        }

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || 'Ошибка при создании заявки');
        }

        return response.json();
    },

    // Получение статуса заявки пользователя
    getUserApplicationStatus: async (applicationId: string) => {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Требуется авторизация');
        }

        const response = await fetch(`${BASE_URL}/applications/${applicationId}/`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (response.status === 401) {
            throw new Error('Сессия истекла');
        }

        if (response.status === 404) {
            throw new Error('Заявка не найдена');
        }

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.detail || 'Ошибка получения статуса заявки');
        }

        return data;
    },

    // Получение списка заявок пользователя
    getUserApplications: async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Требуется авторизация');
        }

        const response = await fetch(`${BASE_URL}/auth/me/applications/`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (response.status === 401) {
            throw new Error('Сессия истекла');
        }

        const data = await response.json();
        if (!response.ok) throw new Error(data.detail || 'Ошибка загрузки заявок');
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
