import { ACTION_TYPE } from '../../../constants';
const initialStateRooms = {};

export const roomsReducer = (state = initialStateRooms, action) => {
	const { type, payload } = action;

	switch (type) {
		default:
			return state;
	}
};
