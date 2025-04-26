import { ACTION_TYPE } from '../../../constants';

export const updateRoomBookings = (roomId, checkIn, checkOut) => ({
	type: ACTION_TYPE.ROOMS.UPDATE_ROOM_BOOKINGS,
	payload: {
		roomId,
		checkIn,
		checkOut,
	},
});
