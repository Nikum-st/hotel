import { ACTION_TYPE } from '../../../constants';
const initialStateRooms = [];

export const roomsReducer = (state = initialStateRooms, action) => {
	const { type, payload } = action;

	switch (type) {
		case ACTION_TYPE.ROOMS.FETCH_ROOMS:
			return payload;
		case ACTION_TYPE.ROOMS.UPDATE_ROOM_BOOKINGS:
			return state.map((r) =>
				r.id === payload.roomId
					? {
							...r,
							bookings: [
								...(r.bookings ?? []),
								{ checkIn: payload.checkIn, checkOut: payload.checkOut },
							],
						}
					: r,
			);

		case ACTION_TYPE.ROOMS.DELETE_ROOM_BOOKING:
			return state.map((r) =>
				r.name === payload.roomName
					? {
							...r,
							bookings: r.bookings.filter(
								(b) => b.checkIn !== payload.checkIn,
							),
						}
					: r,
			);
		default:
			return state;
	}
};
