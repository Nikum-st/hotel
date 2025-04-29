import { ACTION_TYPE } from '../../../constants';

export const updateRoom = (updatedData, roomId) => ({
	type: ACTION_TYPE.ROOMS.UPDATE_ROOM,
	payload: { updatedData, roomId },
});
