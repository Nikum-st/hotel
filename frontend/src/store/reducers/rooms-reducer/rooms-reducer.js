import { ACTION_TYPE } from '../../../constants';
const initialStateRooms = [];

export const roomsReducer = (state = initialStateRooms, action) => {
	const { type, payload } = action;

	switch (type) {
		case ACTION_TYPE.ROOMS.FETCH_ROOMS:
			return payload;
		default:
			return state;
	}
};
