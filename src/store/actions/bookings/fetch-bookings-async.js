import { loading } from '../app/loading';
import { fetchBookings } from './fetch-bookings';

export const fetchBookingsAsync = (useRequestServer, roleUser) => async (dispatch) => {
	try {
		dispatch(loading(true));
		await useRequestServer('fetchBookings', roleUser).then((loadedBookings) => {
			dispatch(fetchBookings(loadedBookings));
		});
	} catch (error) {
		console.error('Ошибка бронирования:', error);
	} finally {
		dispatch(loading(false));
	}
};
