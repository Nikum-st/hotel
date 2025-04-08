import { ACTION_TYPE } from '../../../constants';
const initialStateBookings = [];

export const bookingsReducer = (state = initialStateBookings, action) => {
	const { type, payload } = action;

	switch (type) {
		case ACTION_TYPE.BOOKINGS.FETCH_BOOKINGS_USER:
			return payload;
		case ACTION_TYPE.BOOKINGS.SET_BOOKING:
			return [...state, payload];
		case ACTION_TYPE.BOOKINGS.DELETE_BOOKING:
			return state.filter((b) => b.id !== payload);
		case ACTION_TYPE.USER.LOG_OUT:
			return initialStateBookings;
		default:
			return state;
	}
};
