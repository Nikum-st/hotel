import { Routes, Route } from 'react-router-dom';
import {
	MainPage,
	RegistrationPage,
	AuthorizationPage,
	Error404Page,
	RoomsPage,
	RoomDetails,
	BookingsOfUserPage,
	AdminPage,
	BookingPage,
} from '../../pages';

export const Routing = () => (
	<Routes>
		<Route path="/" element={<MainPage />} />
		<Route path="/rooms" element={<RoomsPage />} />
		<Route path="/rooms/:name" element={<RoomDetails />} />
		<Route path="/rooms/:name/edit" element={<RoomDetails />} />
		<Route path="/rooms/:name/booking" element={<BookingPage />} />
		<Route path="/admin/active-bookings" element={<AdminPage />} />
		<Route path="/admin/archive" element={<AdminPage />} />
		<Route path="/admin/users" element={<AdminPage />} />
		<Route path="/authorize" element={<AuthorizationPage />} />
		<Route path="/register" element={<RegistrationPage />} />
		<Route path="/bookings" element={<BookingsOfUserPage />} />
		<Route path="*" element={<Error404Page />} />
	</Routes>
);
