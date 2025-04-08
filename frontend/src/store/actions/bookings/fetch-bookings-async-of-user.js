import { request } from '../../../utils/request';
import { loading } from '../app/loading';
import { fetchBookingsOfUser } from './fetch-bookings-of-user';

export const fetchBookingsAsyncOfUser = () => async (dispatch) => {
	try {
		dispatch(loading(true));
		const { data } = await request('/bookings/user');
		dispatch(fetchBookingsOfUser(data));
	} catch (error) {
		console.error('Ошибка бронирования:', error);
	} finally {
		dispatch(loading(false));
	}
};
