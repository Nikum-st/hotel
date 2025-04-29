import { ACTION_TYPE } from '../../../constants';

export const setRoom = (room) => ({
	type: ACTION_TYPE.ROOM.SET_ROOM,
	payload: room,
});
