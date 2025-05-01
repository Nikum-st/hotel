import { ACTION_TYPE } from '../../../constants';

export const setCurrentPage = (numberPage) => ({
	type: ACTION_TYPE.APP.SET_PAGE,
	payload: numberPage,
});
