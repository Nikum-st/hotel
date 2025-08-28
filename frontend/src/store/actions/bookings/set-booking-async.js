import { loading } from '../app/loading';
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
		dispatch(loading(true));
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

		if (result.res) {
			const updatedBookings = await useRequestServer('fetchBookings', roleUser);
			dispatch(fetchBookings(updatedBookings));
			dispatch(loading(false));
			return result;
		} else {
			dispatch(loading(false));
			return result;
		}
	};
