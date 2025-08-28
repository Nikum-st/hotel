import { createSlice } from '@reduxjs/toolkit';
import { initialStateRoom } from './initialStateRoom';

const sliceRoom = createSlice({
	name: 'room',
	initialState: initialStateRoom,
	reducers: {
		setRoom(state, action) {
			return action.payload;
		},
	},
});

export const roomReducer = sliceRoom.reducer;
export const { setRoom } = sliceRoom.actions;
