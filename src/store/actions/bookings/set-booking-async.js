import { fetchBookings } from './fetch-bookings';

export const setBookingAsync =
	(
		useRequestServer,
		userId,
		firstName,
		lastName,
		phone,
		roomName,
		startDate,
		endDate,
		roleUser,
	) =>
	async (dispatch) => {
		const result = await useRequestServer(
			'createBooking',
			userId,
			firstName,
			lastName,
			phone,
			roomName,
			startDate,
			endDate,
		);

		if (result.error) {
			console.error('Ошибка бронирования:', result.error);
			return;
		}

		const updatedBookings = await useRequestServer('fetchBookings', roleUser);
		dispatch(fetchBookings(updatedBookings));
	};
