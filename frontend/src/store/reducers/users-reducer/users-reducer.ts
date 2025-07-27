import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { userType } from '../../../types/userType';

const sessionStorageRaw = sessionStorage.getItem('userData');

const sessionStorageJSON: userType | null = sessionStorageRaw
	? JSON.parse(sessionStorageRaw)
	: null;

export type UserState = userType | null;

const usersSlice = createSlice({
	name: 'users',
	initialState: sessionStorageJSON as UserState,
	reducers: {
		logUser(state, action: PayloadAction<userType>) {
			return {
				...state,
				...action.payload,
			};
		},
		logOut() {
			sessionStorage.removeItem('userData');
			return null;
		},
	},
});

export const userReducer = usersSlice.reducer;
export const { logUser, logOut } = usersSlice.actions;
