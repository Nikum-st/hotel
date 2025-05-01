import { ACTION_TYPE } from '../../../constants';
import { initialStateApp } from './inititalStateApp';

export const appReducer = (state = initialStateApp, action) => {
	const { type, payload } = action;

	switch (type) {
		case ACTION_TYPE.USER.LOG_USER:
			return {
				...state,
				isAuthenticated: true,
			};
		case ACTION_TYPE.USER.LOG_OUT:
			return {
				...state,
				isAuthenticated: false,
			};
		case ACTION_TYPE.APP.LOADING:
			return {
				...state,
				loading: payload,
			};
		case ACTION_TYPE.APP.SET_PAGE:
			return {
				...state,
				currentPage: payload,
			};
		case ACTION_TYPE.APP.SET_TOTAL_PAGE:
			return {
				...state,
				totalPages: payload,
			};
		default:
			return state;
	}
};
