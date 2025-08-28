import { ACTION_TYPE } from '../../../constants';
const sessionStorageJSON = sessionStorage.getItem('userData');
const initialStateUsers = JSON.parse(sessionStorageJSON) || {};

export const userReducer = (state = initialStateUsers, action) => {
	const { type, payload } = action;
	switch (type) {
		case ACTION_TYPE.USER.LOG_USER:
			return {
				...state,
				...payload,
			};
		case ACTION_TYPE.USER.LOG_OUT:
			sessionStorage.removeItem('userData');
			return {};
		default:
			return state;
	}
};
