import { ACTION_TYPE } from '../../../constants';

export const fetchBookingsOfUser = (bookings) => ({
	type: ACTION_TYPE.BOOKINGS.FETCH_BOOKINGS_USER,
	payload: bookings,
});
