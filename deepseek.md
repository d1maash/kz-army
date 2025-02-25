(Due to technical issues, the search service is temporarily unavailable.)

Вот модифицированный код с динамическим отображением данных пользователя:

```tsx
import Image from "next/image"
import { useEffect, useState } from "react"
import { api } from "@/utils/api"
import { useRouter } from "next/navigation"

const Profile = () => {
  const router = useRouter()
  const [user, setUser] = useState<{
    full_name?: string
    first_name?: string
    last_name?: string
    is_staff?: boolean
    username?: string
  } | null>(null)

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const profile = await api.getProfile()
        setUser(profile)
      } catch (error) {
        console.error('Ошибка загрузки профиля:', error)
        router.push('/auth/login')
      }
    }

    loadProfile()
  }, [router])

  if (!user) return <div>Загрузка...</div>

  const displayName = user.full_name 
    || [user.last_name, user.first_name].filter(Boolean).join(' ') 
    || user.username

  return (
    <div className="absolute top-5 right-5 flex items-center gap-3">
      <div className="flex flex-col">
        <h3 className="font-bold">{displayName}</h3>
        {user.is_staff && (
          <p className="text-[#C8C8C8] text-xs">Администратор</p>
        )}
      </div>
      <Image
        src="/Ivan.png"
        alt="user avatar"
        width={40}
        height={40}
      />
      <Image 
        src="/icons/down-arrow.svg"
        alt="down-arrow"
        width={10}
        height={10}
      />
    </div>
  )
}

export default Profile
```

Для работы этого кода необходимо:

1. Убедиться что ваш эндпоинт `/auth/profile/` возвращает следующие поля:
```python
# serializers.py
class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id', 
            'username',
            'first_name',
            'last_name',
            'full_name',
            'is_staff',
            'email'
        ]
        read_only_fields = fields
```

2. Добавить обработку ошибок в API метод getProfile:
```typescript
// api.ts
getProfile: async () => {
    const token = localStorage.getItem('token')
    if (!token) throw new Error('Требуется авторизация')

    try {
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
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : 'Ошибка сети')
    }
},
```

3. Добавить стили для состояния загрузки (по желанию) в CSS:
```css
/* styles/globals.css */
@keyframes spin {
  to { transform: rotate(360deg); }
}

.loading-spinner {
  width: 1.5rem;
  height: 1.5rem;
  border: 3px solid #ddd;
  border-top-color: #666;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}
```

4. Обновить компонент для отображения индикатора загрузки:
```tsx
if (!user) return (
  <div className="absolute top-5 right-5 flex items-center gap-3">
    <div className="loading-spinner"></div>
  </div>
)
```