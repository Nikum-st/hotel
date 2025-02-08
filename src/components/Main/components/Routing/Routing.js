import { Routes, Route } from 'react-router-dom';
import { MainPage, Registration, Authorization, Error404, Rooms } from '../../pages';

export const Routing = () => (
	<Routes>
		<Route path="/" element={<MainPage />} />
		<Route path="/rooms" element={<Rooms />}>
			<Route path="room/:id" element={<div>Страница номера и забронировать</div>} />
		</Route>
		<Route path="/admin" element={<div>Панель администратора</div>} />
		<Route path="/authorize" element={<Authorization />} />
		<Route path="/register" element={<Registration />} />
		<Route
			path="/bookings"
			element={<div>Все забронированные номера пользователя</div>}
		/>
		<Route path="*" element={<Error404 />} />
	</Routes>
);
