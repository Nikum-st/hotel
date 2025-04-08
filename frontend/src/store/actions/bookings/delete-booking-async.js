import { request } from '../../../utils/request';
import { loading } from '../app/loading';
import { setRooms } from '../rooms/fetch-rooms';
import { deleteBookingOfUser } from './delete-booking-of-user';

export const deleteBookingAsync = (id) => async (dispatch) => {
	try {
		dispatch(loading(true));
		const result = await request(`/bookings/${id}`, 'DELETE');
		if (result.data) {
			const updatedRooms = await request('/rooms');
			dispatch(deleteBookingOfUser(id));
			dispatch(setRooms(updatedRooms.data));
			dispatch(loading(false));
		} else if (result.error) {
			console.log(`Error from server`, result.error);
		}
	} finally {
		dispatch(loading(false));
	}
};
