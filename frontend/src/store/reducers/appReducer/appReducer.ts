import { initialStateApp } from './inititalStateApp';
import { createSlice } from '@reduxjs/toolkit';
import { logOut, logUser } from '../users-reducer/users-reducer';

const appSlice = createSlice({
	name: 'app',
	initialState: initialStateApp,
	reducers: {
		setTotalPages(state, action) {
			state.totalPages = action.payload;
		},
		setCurrentPage(state, action) {
			state.currentPage = action.payload;
		},
		loading(state, action) {
			state.loading = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(logUser, (state) => {
				state.isAuthenticated = true;
			})
			.addCase(logOut, (state) => {
				state.isAuthenticated = false;
			});
	},
});

export const appReducer = appSlice.reducer;
export const { setTotalPages, setCurrentPage, loading } = appSlice.actions;
