import { Routes, Route } from 'react-router-dom';
import { MainPage, Registration, Authorization, Error404 } from '../../pages';

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
		<Route path="*" element={<Error404 />} />
	</Routes>
);
