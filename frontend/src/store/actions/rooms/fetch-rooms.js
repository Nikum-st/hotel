import { ACTION_TYPE } from '../../../constants';

export const setRooms = (rooms) => ({
	type: ACTION_TYPE.ROOMS.FETCH_ROOMS,
	payload: rooms,
});
