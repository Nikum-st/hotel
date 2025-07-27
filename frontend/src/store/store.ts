// store.ts
import { configureStore } from '@reduxjs/toolkit';
import { roomsReducer } from './reducers/rooms-reducer/rooms-reducer';
import { userReducer } from './reducers/users-reducer/users-reducer';
import { appReducer } from './reducers/appReducer/appReducer';
import { roomReducer } from './reducers/room-reducer/room-reducer';

export const store = configureStore({
	reducer: {
		app: appReducer,
		user: userReducer,
		rooms: roomsReducer,
		room: roomReducer,
	},
	devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
