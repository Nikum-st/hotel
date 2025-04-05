import { useSelector } from 'react-redux';
import { selectSessionUser } from '../store';
import { server } from '../BFF';
import { useCallback } from 'react';

export const useRequestServer = () => {
	const session = useSelector(selectSessionUser);
	return useCallback(
		(operation, ...params) => {
			const request = ['authorization', 'registration'].includes(operation)
				? params
				: [...params, session];
			return server[operation](...request);
		},
		[session],
	);
};
