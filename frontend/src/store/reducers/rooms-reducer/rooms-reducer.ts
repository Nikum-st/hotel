import { setRoom } from '../room-reducer/room-reducer';
import { roomType } from './../../../types/roomType';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialStateRooms: roomType[] = [];

const sliceRooms = createSlice({
	name: 'rooms',
	initialState: initialStateRooms,
	reducers: {
		deleteBooking(state, action) {
			return state.map((r) =>
				r.name === action.payload.roomName
					? {
							...r,
							bookings: r.bookings.filter(
								(b) => b.checkIn !== action.payload.checkIn,
							),
						}
					: r,
			);
		},
		setRooms(state, action) {
			return action.payload;
		},
		updateRoomBookings(state, action) {
			return state.map((r) =>
				r.id === action.payload.roomId
					? {
							...r,
							bookings: [
								...(r.bookings ?? []),
								{
									checkIn: action.payload.checkIn,
									checkOut: action.payload.checkOut,
								},
							],
						}
					: r,
			);
		},
	},
	extraReducers: (builder) => {
		builder.addCase(setRoom, (state, action: PayloadAction<roomType>) => {
			return state.map((room) =>
				room.id === action.payload.id ? { ...action.payload } : room,
			);
		});
	},
});

export const roomsReducer = sliceRooms.reducer;
export const { deleteBooking, setRooms, updateRoomBookings } = sliceRooms.actions;
