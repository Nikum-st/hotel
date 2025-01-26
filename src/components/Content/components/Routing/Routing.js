import { Routes, Route } from 'react-router-dom';
import { MainPage } from '../../pages/MainPage/MainPage';

export const Routing = () => (
	<Routes>
		<Route path="/" element={<MainPage />} />
		<Route path="/rooms" element={<div>Доступные номера</div>} />
		<Route path="/admin" element={<div>Панель администратора</div>} />
		<Route path="/login" element={<div>Авторизация</div>} />
		<Route path="/register" element={<div>Регистрация</div>} />
		<Route path="/booking" element={<div>Страница номера и забронировать</div>} />
		<Route
			path="/bookings"
			element={<div>Все забронированные номера пользователя</div>}
		/>
	</Routes>
);
