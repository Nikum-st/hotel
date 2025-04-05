import { ACTION_TYPE } from '../../../constants';

export const loading = (tof) => ({
	type: ACTION_TYPE.APP.LOADING,
	payload: tof,
});
