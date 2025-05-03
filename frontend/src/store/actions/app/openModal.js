import { ACTION_TYPE } from '../../../constants';

export const openModal = (modalProps) => ({
	type: ACTION_TYPE.APP.OPEN_MODAL,
	payload: modalProps,
});
