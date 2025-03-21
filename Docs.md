# Техническая документация

## Существующие роуты и их содержимое

### 1. `/`
- **Описание:** Главная страница приложения.
- **Содержимое:** Информация о службе, преимуществах, формах подачи заявок и другие важные разделы.

### 2. `/auth/login`
- **Описание:** Страница входа для пользователей.
- **Содержимое:** Форма для ввода логина и пароля.

### 3. `/auth/register`
- **Описание:** Страница регистрации нового пользователя.
- **Содержимое:** Форма для ввода логина, email и пароля.

### 4. `/auth/admin-login`
- **Описание:** Страница входа для администраторов.
- **Содержимое:** Форма для ввода логина и пароля администратора.

### 5. `/profile`
- **Описание:** Страница профиля пользователя.
- **Содержимое:** Отображает информацию о пользователе и позволяет редактировать данные.

### 6. `/admin`
- **Описание:** Административная панель.
- **Содержимое:** Основная информация и статистика по заявкам.

### 7. `/admin/application`
- **Описание:** Страница управления заявками.
- **Содержимое:** Список заявок с возможностью их обработки.

### 8. `/application`
- **Описание:** Страница подачи заявок.
- **Содержимое:** Выбор между различными типами заявок (Связист, Срочная служба).

### 9. `/application/communication`
- **Описание:** Форма подачи заявки на должность "Связист".
- **Содержимое:** Форма для ввода данных и загрузки документов.

### 10. `/application/conscription`
- **Описание:** Форма подачи заявки на "Срочную службу".
- **Содержимое:** Форма для ввода данных и загрузки документов.

### 11. `/faq`
- **Описание:** Страница часто задаваемых вопросов.
- **Содержимое:** Список вопросов и ответов, а также возможность поиска.

### 12. `/faq/profiles`
- **Описание:** Страница с вопросами к представителям министерства обороны.
- **Содержимое:** Карточки с информацией о представителях.

### 13. `/article`
- **Описание:** Страница с полезными статьями и новостями.
- **Содержимое:** Список статей с возможностью пагинации.

## Тестовые данные для логина
- **Логин:** Dimash
- **Пароль:** 1234

## Как запустить проект
1. Клонируйте репозиторий:
   ```bash
   git clone <URL_репозитория>
   ```
2. Перейдите в директорию проекта:
   ```bash
   cd <имя_директории>
   ```
3. Установите зависимости:
   ```bash
   npm install
   ```
4. Запустите проект:
   ```bash
   npm start
   ```
5. Откройте браузер и перейдите по адресу `http://localhost:3000`.

# Запуск Docker файла (for Developers)

Чтобы запустить проект с использованием Docker, выполните следующие шаги:

## 1. Убедитесь, что Docker установлен

Перед началом убедитесь, что у вас установлен Docker. Вы можете скачать и установить его с [официального сайта Docker](https://www.docker.com/get-started).

## 2. Создайте Dockerfile

Если у вас еще нет Dockerfile, создайте его в корне вашего проекта. Пример Dockerfile для Node.js приложения может выглядеть так:

```dockerfile
# Используем официальный образ Node.js
FROM node:14

# Устанавливаем рабочую директорию
WORKDIR /usr/src/app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем все файлы проекта
COPY . .

# Открываем порт, на котором будет работать приложение
EXPOSE 3000

# Команда для запуска приложения
CMD ["npm", "start"]
```

## 3. Постройте Docker образ

В терминале перейдите в директорию вашего проекта и выполните команду:

```bash
docker build -t my-app .
```

Здесь `my-app` — это имя вашего Docker образа.

## 4. Запустите контейнер

После успешного создания образа, запустите контейнер с помощью следующей команды:

```bash
docker run -p 3000:3000 my-app
```

Эта команда связывает порт 3000 вашего контейнера с портом 3000 на вашем хосте.

## 5. Откройте приложение в браузере

Теперь вы можете открыть браузер и перейти по адресу `http://localhost:3000`, чтобы увидеть ваше приложение.

## Дополнительные команды

- **Остановить контейнер:** Если вы хотите остановить работающий контейнер, используйте команду:

```bash
docker ps  # чтобы найти ID контейнера
docker stop <container_id>
```

- **Удалить контейнер:** Чтобы удалить остановленный контейнер:

```bash
docker rm <container_id>
```

- **Удалить образ:** Чтобы удалить образ:

```bash
docker rmi my-app
```

Следуя этим шагам, вы сможете успешно запустить ваше приложение в Docker.
