import { useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logUser } from '../store';

export const useGetSessionStorage = () => {
	const dispatch = useDispatch();

	return useLayoutEffect(() => {
		const currentUserDataJSON = sessionStorage.getItem('userData');

		if (!currentUserDataJSON) return;

		const currentUserData = JSON.parse(currentUserDataJSON);
		dispatch(logUser(currentUserData));
	}, [dispatch]);
};
