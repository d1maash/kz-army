(Due to technical issues, the search service is temporarily unavailable.)

Давайте исправим проблему поэтапно:

1. **Исправление ошибки 405 Method Not Allowed**

Измените URL в методе login вашего API:

```typescript
// api.ts
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
```

Убедитесь что в Django есть view для обработки POST на этом URL. Пример view:

```python
# views.py
from rest_framework_simplejwt.views import TokenObtainPairView

class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        # Добавляем дополнительные данные в ответ
        if response.status_code == 200:
            user = User.objects.get(username=request.data['username'])
            response.data['is_staff'] = user.is_staff
        return response
```

2. **Модифицируем обработчик входа в admin.tsx**

```typescript
const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
        // 1. Выполняем вход
        const loginResponse = await api.login(username, password);
        localStorage.setItem("token", loginResponse.access);

        // 2. Проверяем наличие флага is_staff в ответе
        if (loginResponse.is_staff) {
            router.push("/admin/dashboard");
        } else {
            setError('You dont have enough permission for this');
            localStorage.removeItem("token");
        }

    } catch (err) {
        if (err instanceof Error) {
            setError(err.message);
        } else {
            setError('Произошла неизвестная ошибка');
        }
    }
};
```

3. **Обновим Django сериализатор для включения is_staff**

```python
# serializers.py
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        data['is_staff'] = self.user.is_staff
        return data
```

4. **Добавим проверку CORS (если проблема сохраняется)**

Установите и настройте django-cors-headers:

```python
# settings.py
INSTALLED_APPS = [
    ...,
    'corsheaders',
]

MIDDLEWARE = [
    ...,
    'corsheaders.middleware.CorsMiddleware',
    ...,
]

CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://your-frontend-domain.com",
]

CORS_ALLOW_CREDENTIALS = True
```

5. **Проверьте URL endpoints в Django**

```python
# urls.py
from .views import CustomTokenObtainPairView

urlpatterns = [
    path('auth/login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    # ... другие URL
]
```

6. **Добавьте защиту для админ-роутов**

Создайте HOC для проверки администратора:

```typescript
// components/AdminGuard.tsx
"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { api } from '@/utils/api'

export default function AdminGuard({ children }: { children: React.ReactNode }) {
    const router = useRouter()

    useEffect(() => {
        const checkAdmin = async () => {
            try {
                const token = localStorage.getItem('token')
                if (!token) throw new Error()
                
                const response = await fetch(`${BASE_URL}/auth/profile/`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                })
                
                if (!response.ok) throw new Error()
                const profile = await response.json()
                
                if (!profile.is_staff) throw new Error()
                
            } catch (error) {
                router.push('/admin/login?error=no-access')
            }
        }

        checkAdmin()
    }, [router])

    return <>{children}</>
}
```

Использование в layout:

```typescript
// app/admin/layout.tsx
import AdminGuard from '@/components/AdminGuard'

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <AdminGuard>{children}</AdminGuard>
}
```

7. **Обновите метод getProfile в API**

```typescript
// api.ts
getProfile: async () => {
    const token = localStorage.getItem('token')
    if (!token) throw new Error('Требуется авторизация')

    const response = await fetch(`${BASE_URL}/auth/profile/`, {
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
```

Для тестирования выполните в консоли:

```bash
curl -X POST 'http://89.46.33.188/api/auth/login/' \
  -H 'Content-Type: application/json' \
  -d '{"username":"admin","password":"password"}'
```

Ожидаемый ответ:
```json
{
    "access": "token...",
    "refresh": "token...",
    "is_staff": true
}
```

Если проблема сохраняется:
1. Проверьте Network в DevTools
2. Убедитесь в правильности CORS-настроек
3. Проверьте логи сервера Django
4. Убедитесь что пользователь существует с is_staff=True