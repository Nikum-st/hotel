import { Routes, Route } from 'react-router-dom';
import {
	MainPage,
	RegistrationPage,
	AuthorizationPage,
	Error404Page,
	RoomsPage,
	RoomDetails,
	BookingsPage,
	AdminPage,
} from '../../pages';

export const Routing = () => (
	<Routes>
		<Route path="/" element={<MainPage />} />
		<Route path="/rooms" element={<RoomsPage />} />
		<Route path="/rooms/:name" element={<RoomDetails />} />
		<Route path="/admin" element={<AdminPage />} />
		<Route path="/authorize" element={<AuthorizationPage />} />
		<Route path="/register" element={<RegistrationPage />} />
		<Route path="/bookings" element={<BookingsPage />} />
		<Route path="*" element={<Error404Page />} />
	</Routes>
);
