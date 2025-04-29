import { ACTION_TYPE } from '../../../constants';
const initialStateRoom = {};

export const roomReducer = (state = initialStateRoom, action) => {
	const { type, payload } = action;

	switch (type) {
		case ACTION_TYPE.ROOM.SET_ROOM:
			return { ...payload };
		default:
			return state;
	}
};
