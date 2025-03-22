import { loading } from '../app/loading';
import { fetchBookings } from './fetch-bookings';

export const deleteBookingAsync = (useRequestServer, id, role) => async (dispatch) => {
	dispatch(loading(true));
	const result = await useRequestServer('deleteBooking', id);

	if (result.res) {
		const updatedBookings = await useRequestServer('fetchBookings', role);
		dispatch(fetchBookings(updatedBookings));
		dispatch(loading(false));
	}
};
