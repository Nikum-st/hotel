import { ACTION_TYPE } from '../../../constants';

export const deleteBookingOfUser = (bookingId) => ({
	type: ACTION_TYPE.BOOKINGS.DELETE_BOOKING,
	payload: bookingId,
});
