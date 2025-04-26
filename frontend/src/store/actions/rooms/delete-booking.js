import { ACTION_TYPE } from '../../../constants';

export const deleteBooking = (roomName, checkIn) => ({
	type: ACTION_TYPE.ROOMS.DELETE_ROOM_BOOKING,
	payload: { roomName, checkIn },
});
