import { ACTION_TYPE } from '../../../constants';

export const setTotalPages = (totalPages) => ({
	type: ACTION_TYPE.APP.SET_TOTAL_PAGE,
	payload: totalPages,
});
