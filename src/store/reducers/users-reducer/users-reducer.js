import { ACTION_TYPE } from '../../../constants';
const initialStateUsers = {};

export const userReducer = (state = initialStateUsers, action) => {
	const { type, payload } = action;
	switch (type) {
		case ACTION_TYPE.USER.LOG_USER:
			return {
				...state,
				...payload,
			};
		case ACTION_TYPE.USER.LOG_OUT:
			return initialStateUsers;
		default:
			return state;
	}
};
