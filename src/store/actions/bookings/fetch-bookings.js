import { ACTION_TYPE } from '../../../constants';

export const fetchBookings = (bookings) => ({
	type: ACTION_TYPE.BOOKINGS.FETCH_BOOKINGS,
	payload: bookings,
});
