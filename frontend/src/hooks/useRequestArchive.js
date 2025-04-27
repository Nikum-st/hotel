import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { loading } from '../store';

export const useRequest = () => {
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(null);

	const handleArchiveList = async () => {
		const isOpening = !archiveListIsOpen;
		setArchiveListIsOpen(isOpening);

		if (!isOpening) return;

		try {
			setLoadingArchive(true);
			const response = await fetch('/admin/archive');

			setArchive(archive);
		} catch ({ message }) {
			console.error(message || 'Error server');
		} finally {
			setLoadingArchive(false);
			setTimeout(() => {
				archiveRef.current?.scrollIntoView({ behavior: 'smooth' });
			}, 100);
		}
	};

	return { sendRequest, error };
};
