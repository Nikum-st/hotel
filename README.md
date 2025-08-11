(Eng)
Grand Lotus Hotel
Project Description
Grand Lotus Hotel is a responsive full-stack website for hotel room booking with personal accounts for clients and administrators, as well as an admin panel. Users can view room availability, make and manage reservations online.

Technologies
Frontend: TypeScript, React (TSX), Redux Toolkit,React Context, React Router, CSS Modules, YUP, Moment, Datepicker, FontAwesome
Backend: Node.js, Express, MongoDB, Mongoose, Multer, JWT, Bcrypt

Features
User registration and authentication using JWT and Yup

- Personal dashboards for clients, managers, and administrators
- Pagination on the rooms page
- Viewing and searching available rooms with a calendar
- Creating, editing, and deleting bookings
- Admin panel for managing rooms and users
- Room image uploads via Multer
- Error handling and form validation on both client and server sides

Project Setup
Clone the repository:
git clone https://github.com/Nikum-st/hotel.git

Run Backend:

cd backend
npm install
npm run server

Run Frontend:
cd frontend
npm install
npm start

Project Structure

/backend — server-side logic and API
models/ — MongoDB schemas and models (Rooms, Users, Bookings)
routes/ — API routes (auth, rooms, bookings, etc.)
controllers/ — request handlers and database logic
middleware/ — authorization, file upload, error handling, validation
uploads/ — storage for uploaded room images
helpers/ — utility functions (e.g., mappers, JWT logic)

/frontend — React client app
components/ — reusable UI components, as well as inside pages/ — application pages (login, profile, booking, etc.)
constants/ — project constants (roles, statuses, routes, etc.)
fonts/ — Font Awesome configuration and icons
hooks/ — custom React hooks (only 1:useRequest remained at the final stage)
store/ — Redux Toolkit: slices, store configuration
types/ - types of the main project entities
yup/ — form validation schemes (registration, login, booking)

Backend Environment Variables
Create a .env file in /backend with:

MONGODB_URI=<your MongoDB URI, e.g., mongodb+srv://user:password@cluster.mongodb.net/hotel>
TOKEN_SECRET=<your secret JWT key>

BFF Stub Server Support
This project includes the ability to run a BFF stub server using json-server for early-stage preview and testing without a full backend on Express/Node.js.

Where the logic lives

Go to the branch HOTEL-008.01
Go to the folder frontend

The /BFF folder contains:
api — endpoints for data handling
operations — basic operations
sessions — session simulation
db.json — simple JSON database

How to run

Install dependencies:
npm install

Start the project (frontend + json-server):
npm start

⚡ This script will automatically launch both the React app and the JSON server on port 3005.

Warning
This is an early-stage version of the project. Many features are not yet implemented. However, the stub server lets you explore the frontend architecture and BFF principles without a real backend.

Technology Stack
Vanilla JavaScript
React + JSX
JSON Server

Contact
For questions and suggestions, feel free to reach out:

📧 Email: nikita.italia2023@gmail.com, nikitaumanskiy1998@mail.ru,
📱 Telegram / WhatsApp: +39 380 14-666-17(it), +7 914 744-30-83(rus)

(Rus)
Grand Lotus Hotel

Описание проекта
Grand Lotus Hotel — адаптивный full-stack сайт для онлайн-бронирования отеля с личными кабинетами для клиентов и администраторов, а также административной панелью. 
Позволяет просматривать доступность номеров, создавать и управлять бронированиями.

Технологии:

- Frontend: TypeScript, React (TSX), Redux Toolkit, React Context,React Router, CSS module, YUP, Moment,Datepicker, FontsAwesome
- Backend: Node.js, Express, MongoDB, Mongoose, Multer, JWT, Bcrypt

Функционал:

- Регистрация и аутентификация пользователей с JWT и Yup
- Личные кабинеты для клиентов, менеджеров и администратора
- Паджинация на странице номеров
- Просмотр и поиск доступных номеров с календарём доступности
- Создание, редактирование и удаление бронирований
- Административная панель для управления номерами и пользователями
- Загрузка изображений номеров через Multer
- Обработка ошибок и валидация данных на сервере и клиенте

Запуск проекта:

 1. Клонировать репозиторий:
    git clone https://github.com/Nikum-st/hotel.git
 2. Запустить backend:
    
    cd backend
    npm install
    npm run server
    
  3. Запустить frontend:
    cd frontend
    npm install
    npm start

Структура проекта:

/backend — серверная часть с API и бизнес-логикой
/frontend — клиентская часть с React-приложением

Backend (/server):
models/ — схемы и модели MongoDB (номера, пользователи, бронирования)
routes/ — API-маршруты (auth, rooms, bookings и др.)
controllers/ — логика обработки запросов и взаимодействия с БД
middleware/ — авторизация, обработка ошибок, загрузка файлов и валидация
uploads/ — директория для хранения загружаемых изображений номеров
helpers/ — вспомогательные функции (например, мапперы, JWT-логика)

Frontend (/client)
components/ — переиспользуемые UI-компоненты, а также внутри pages/ — страницы приложения (вход, профиль, бронирования и т.д.)
constants/ — константы проекта (роли, статусы, маршруты и др.)
fonts/ — конфигурация и иконки Font Awesome
hooks/ — кастомные хуки React (на финальном этапе остался только 1:useRequest)
store/ — Redux Toolkit: слайсы, конфигурация стора
types/ - типы основных сущностей проекта
yup/ — схемы валидации форм (регистрация, логин, бронирование)

Переменные окружения backend:

MONGODB_URI=<ваш MongoDB URI, например mongodb+srv://user:password@cluster.mongodb.net/hotel>
TOKEN_SECRET=<секретный ключ для генерации JWT-токенов>

Возможность запуска с BFF-заглушкой
В проекте предусмотрена возможность запуска BFF-заглушки на основе json-server для раннего просмотра и тестирования без полноценного бэкенда на Express/Node.js.

Где находится логика

Перейдите в ветку HOTEL-008.01
Перейдите в папку frontend

Папка /BFF содержит:
api — ручки для работы с данными
operations — базовые операции
sessions — имитация работы сессии
db.json — простая база данных в JSON-формате

Как запустить

Установите зависимости:
npm install

Запустите проект (фронт + json-server):
npm start

⚡ Скрипт автоматически поднимет и React-приложение, и JSON-сервер на порте 3005.

Предупреждение
Это ранняя версия проекта. Часть функционала ещё не реализована, многие возможности отсутствуют. Однако заглушка позволяет посмотреть архитектуру фронтенда и принцип работы BFF без реального бэкенда.

Стек технологий

JavaScript (Vanilla)
React + JSX
JSON Server

Контакты
По вопросам и предложениям пишите: 

📧 Email: nikitaumanskiy1998@mail.ru
📱 Telegram / WhatsApp: +7 914 744-30-83
