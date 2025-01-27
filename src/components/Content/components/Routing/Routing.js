import { Routes, Route } from 'react-router-dom';
import { MainPage } from '../../pages/MainPage/MainPage';
import { Authorization } from '../../pages/Authorize/Authorization';
import { Registration } from '../../pages/Register/Register';

export const Routing = () => (
	<Routes>
		<Route path="/" element={<MainPage />} />
		<Route path="/rooms" element={<div>Доступные номера</div>} />
		<Route path="/admin" element={<div>Панель администратора</div>} />
		<Route path="/authorize" element={<Authorization />} />
		<Route path="/register" element={<Registration />} />
		<Route path="/booking" element={<div>Страница номера и забронировать</div>} />
		<Route
			path="/bookings"
			element={<div>Все забронированные номера пользователя</div>}
		/>
	</Routes>
);
