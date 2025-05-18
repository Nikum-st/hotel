import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { loading } from '../store';

export const useRequest = () => {
	const [error, setError] = useState(null);
	const dispatch = useDispatch();

	const sendRequest = useCallback(
		async (url, method = 'GET', data = null) => {
			dispatch(loading(true));
			setError(null);
			try {
				const response = await fetch(`/api/${url}`, { method,
					headers: { 'Content-Type': 'application/json;charset=utf-8' },
					body: data ? JSON.stringify(data) : undefined,
				});
				if (!response.ok) {
					console.error(`HTTP error! Status: ${response.status}`);
					setError(`HTTP error! Status: ${response.status}`);
				}

				const result = await response.json();
				if (result.error) {
					console.error(result.error);
					setError(result.error);
				}
				return result.data;
			} catch (e) {
				console.error(e.message);
				setError('Error from server.  Please try again later');
			} finally {
				dispatch(loading(false));
			}
		},
		[dispatch],
	);

	return { sendRequest, error, setError };
};
