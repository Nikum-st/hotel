import { ACTION_TYPE } from '../../../constants';

export const logUser = (user) => ({
	type: ACTION_TYPE.USER.LOG_USER,
	payload: user,
});
