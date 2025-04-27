import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../store';

export const useIsAuthorized = () => {
	const [isAuthorizedError, setIsAuthorizedError] = useState(null);
	const isAuthorized = useSelector(selectIsAuthenticated);

	useEffect(() => {
		if (isAuthorized) {
			setIsAuthorizedError('You are already authorized');
		}
	}, [isAuthorized]);
	return isAuthorizedError;
};
