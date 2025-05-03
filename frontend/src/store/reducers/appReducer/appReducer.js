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
		case ACTION_TYPE.APP.OPEN_MODAL:
			return {
				...state,
				modal: {
					isOpen: true,
					text: state.modal.text + payload.text,
					onConfirmModal: payload.onConfirmModal,
				},
			};
		case ACTION_TYPE.APP.CLOSE_MODAL:
			return {
				...state,
				modal: initialStateApp.modal,
			};
		default:
			return state;
	}
};
