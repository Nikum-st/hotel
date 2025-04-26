import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { loading } from '../../../../store';
import { Icon } from '../../../components';
import { useNavigate } from 'react-router-dom';
import { request } from '../../../../utils/request';
import { AdminPageLayout } from './AdminPageLayout';

export const AdminPage = () => {
	const [errorFromServer, setErrorFromServer] = useState(null);
	const [searchActive, setSearchActive] = useState('');
	const [searchArchive, setSearchArchive] = useState('');
	const [archiveListIsOpen, setArchiveListIsOpen] = useState(false);
	const [bookings, setBookings] = useState([]);
	const [archive, setArchive] = useState([]);
	const [loadingArchive, setLoadingArchive] = useState(false);

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const archiveRef = useRef(null);

	useEffect(() => {
		window.scrollTo(0, 0);

		dispatch(loading(true));

		const fetchBookings = async () => {
			try {
				const bookings = await request('/admin/bookings');

				setBookings(bookings);
			} catch (e) {
				setErrorFromServer(e);
			} finally {
				dispatch(loading(false));
			}
		};

		fetchBookings();
	}, [dispatch, navigate]);

	const handleArchiveList = async () => {
		const isOpening = !archiveListIsOpen;
		setArchiveListIsOpen(isOpening);

		if (!isOpening) return;

		try {
			setLoadingArchive(true);
			const archive = await request('/admin/archive');

			setArchive(archive);
		} catch ({ message }) {
			console.error(message);
			setErrorFromServer(message);
		} finally {
			setLoadingArchive(false);
			setTimeout(() => {
				archiveRef.current?.scrollIntoView({ behavior: 'smooth' });
			}, 100);
		}
	};

	const deleteBooking = async (id) => {
		try {
			const isDeleted = await request(`/bookings/${id}`, 'DELETE');

			if (isDeleted) {
				setBookings(bookings.filter((b) => b.id !== id));
			}
		} catch ({ message }) {
			console.error(message);
			setErrorFromServer(message);
		}
	};

	const clearArchive = async () => {
		if (!archive) {
			return;
		}
		try {
			const isClear = await request(`/admin/archive`, 'DELETE');

			if (isClear) {
				setArchive([]);
			}
		} catch ({ message }) {
			console.error(message);
			setErrorFromServer(message);
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
			errorFromServer={errorFromServer}
			bookingsProps={bookingsProps}
			archiveProps={archiveProps}
			handleArchiveList={handleArchiveList}
			archiveListIsOpen={archiveListIsOpen}
			loadingArchive={loadingArchive}
		/>
	);
};
