import { useEffect, useRef, useState } from 'react';
import { Icon } from '../../../components';
import { AdminPageLayout } from './AdminPageLayout';
import { useRequest } from '../../../../hooks/useRequest';

export const AdminPage = () => {
	const [searchActive, setSearchActive] = useState('');
	const [searchArchive, setSearchArchive] = useState('');
	const [archiveListIsOpen, setArchiveListIsOpen] = useState(false);
	const [bookings, setBookings] = useState([]);
	const [archive, setArchive] = useState([]);
	const [loadingArchive, setLoadingArchive] = useState(false);
	const archiveRef = useRef(null);
	const { sendRequest, error } = useRequest();

	useEffect(() => {
		window.scrollTo(0, 0);

		const fetchBookings = async () => {
			const bookings = await sendRequest('/admin/bookings');
			setBookings(bookings);
		};

		fetchBookings();
	}, [sendRequest]);

	const handleArchiveList = async () => {
		const isOpening = !archiveListIsOpen;
		setArchiveListIsOpen(isOpening);

		if (!isOpening) return;

		try {
			setLoadingArchive(true);
			const response = await fetch('/admin/archive');
			const result = await response.json();
			if (result.error) {
				console.error(result.error);
				return;
			}
			setArchive(result.data);
		} catch ({ message }) {
			console.error(message || 'Error server');
		} finally {
			setLoadingArchive(false);
			setTimeout(() => {
				archiveRef.current?.scrollIntoView({ behavior: 'smooth' });
			}, 100);
		}
	};

	const deleteBooking = async (id) => {
		const isDeleted = await sendRequest(`/bookings/${id}`, 'DELETE');

		if (isDeleted) {
			setBookings(bookings.filter((b) => b.id !== id));
		}
	};

	const clearArchive = async () => {
		if (!archive) {
			return;
		}
		try {
			const response = await fetch(`/admin/archive`, { method: 'DELETE' });
			const result = await response.json();

			if (result.error) {
				console.error(result.error);
			}
			setArchive([]);
		} catch ({ message }) {
			console.error(message);
		}
	};

	const bookingsProps = {
		bookings,
		deleteBooking,
		Icon,
		search: searchActive,
		setSearch: setSearchActive,
		setBookings,
	};

	const archiveProps = {
		bookings: archive,
		search: searchArchive,
		setSearch: setSearchArchive,
		clearArchive: clearArchive,
		ref: archiveRef,
		styleHeader: { background: '#3d3d3d', color: '#fff' },
		styleBody: { background: '#969696' },
		type: 'archive',
	};

	return (
		<AdminPageLayout
			errorFromServer={error}
			bookingsProps={bookingsProps}
			archiveProps={archiveProps}
			handleArchiveList={handleArchiveList}
			archiveListIsOpen={archiveListIsOpen}
			loadingArchive={loadingArchive}
		/>
	);
};
