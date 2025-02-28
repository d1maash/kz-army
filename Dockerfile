# Указываем базовый образ для Node.js
FROM node:14 AS build

# Устанавливаем рабочую директорию
WORKDIR /usr/src/app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальные файлы проекта
COPY . .

# Собираем приложение
RUN npm run build

# Указываем базовый образ для Nginx
FROM nginx:alpine

# Копируем собранное приложение в директорию Nginx
COPY --from=build /usr/src/app/build /usr/share/nginx/html

# Копируем конфигурацию Nginx
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Открываем порт для Nginx
EXPOSE 80

# Запускаем Nginx
CMD ["nginx", "-g", "daemon off;"]