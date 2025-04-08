import { request } from '../../../utils/request';
import { loading } from '../app/loading';
import { setRooms } from '../rooms/fetch-rooms';
import { fetchBookingsOfUser } from './fetch-bookings-of-user';

export const setBookingAsync = (bookingData, roomId) => async (dispatch) => {
	try {
		dispatch(loading(true));
		const result = await request(`/rooms/${roomId}/booking`, 'POST', bookingData);
		const [updatedBookings, updatedRooms] = await Promise.all([
			request('/bookings/user'),
			request('/rooms'),
		]);
		dispatch(fetchBookingsOfUser(updatedBookings.data));
		dispatch(setRooms(updatedRooms.data));
		return result;
	} finally {
		dispatch(loading(false));
	}
};
