import { fetchBookings } from './fetch-bookings';

export const setBookingAsync =
	(useRequestServer, userId, roomName, startDate, endDate) => async (dispatch) => {
		console.log('Отправка бронирования:', {
			userId,
			roomName,
			startDate,
			endDate,
		});
		try {
			await useRequestServer('createBooking', userId, roomName, startDate, endDate);
			const updatedBookings = await useRequestServer('fetchBookings');
			dispatch(fetchBookings(updatedBookings));
		} catch (error) {
			console.error('Ошибка бронирования:', error);
		}
	};
