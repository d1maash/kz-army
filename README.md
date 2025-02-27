(Due to technical issues, the search service is temporarily unavailable.)

Вот как модифицировать ваш код для реализации проверки прав администратора:

1. Обновите обработчик входа в `admin.tsx`:

```typescript
const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
        // 1. Выполняем вход
        const loginResponse = await api.login(username, password);
        localStorage.setItem("token", loginResponse.access);

        // 2. Получаем профиль пользователя
        const profile = await api.getProfile();
        
        // 3. Проверяем флаг is_staff
        if (profile.is_staff) {
            router.push("/admin"); // Перенаправляем в админку
        } else {
            setError('You dont have enough permission for this');
            localStorage.removeItem("token"); // Удаляем токен не-админа
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

2. Убедитесь, что ваш API endpoint `/auth/profile/` возвращает поле `is_staff`. Для этого в Django нужно:

```python
# serializers.py
from rest_framework import serializers
from .models import User

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'is_staff', 'status']  # Добавьте нужные поля
```

3. Добавьте проверку прав в админ-роуты (рекомендуется). Создайте Higher-Order Component:

```typescript
// components/AdminRoute.tsx
"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { api } from '@/utils/api'

export default function AdminRoute(WrappedComponent: React.ComponentType) {
  return function ProtectedRoute() {
    const router = useRouter()
    const [isAllowed, setIsAllowed] = useState(false)

    useEffect(() => {
      const checkAdmin = async () => {
        try {
          const token = localStorage.getItem('token')
          if (!token) throw new Error('Требуется авторизация')

          const profile = await api.getProfile()
          if (!profile.is_staff) throw new Error('Доступ запрещен')

          setIsAllowed(true)
        } catch (error) {
          router.push('/admin/login')
        }
      }

      checkAdmin()
    }, [router])

    return isAllowed ? <WrappedComponent /> : null
  }
}
```

Использование в админ-страницах:

```typescript
// app/admin/page.tsx
import AdminRoute from '@/components/AdminRoute'
import AdminDashboard from './AdminDashboard'

export default AdminRoute(AdminDashboard)
```

4. Обновите API методы для лучшей обработки ошибок:

```typescript
// api.ts
getProfile: async () => {
    const token = localStorage.getItem('token')
    if (!token) throw new Error('Требуется авторизация')

    try {
        const response = await fetch(`${BASE_URL}/auth/profile/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        if (response.status === 401) {
            localStorage.removeItem('token')
            throw new Error('Сессия истекла')
        }

        const data = await response.json()
        if (!response.ok) throw new Error(data.detail || 'Ошибка загрузки профиля')
        
        return data
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : 'Ошибка сети')
    }
},
```

5. Добавьте logout функциональность:

```typescript
// api.ts
logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
},
```

Эти изменения обеспечат:
- Проверку прав администратора при входе
- Защиту админ-роутов
- Корректную обработку истечения сессии
- Безопасное хранение и удаление токенов