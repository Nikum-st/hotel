import { ACTION_TYPE } from '../../../constants';
import { initialStateApp } from './inititalStateApp';

export const appReducer = (state = initialStateApp, action) => {
	const { type, payload } = action;

	switch (type) {
		default:
			return state;
	}
};
