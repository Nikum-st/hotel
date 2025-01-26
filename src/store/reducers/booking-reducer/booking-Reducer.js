import { ACTION_TYPE } from '../../../constants';
const initialStateBookings = {};

export const bookingsReducer = (state = initialStateBookings, action) => {
	const { type, payload } = action;

	switch (type) {
		default:
			return state;
	}
};
