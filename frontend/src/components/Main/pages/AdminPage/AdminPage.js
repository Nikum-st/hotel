import { useEffect, useState } from 'react';
import { Icon, Info } from '../../../components';
import { useRequest } from '../../../../hooks/useRequest';
import { Bookings } from './components/Bookings/Bookings';
import { ArchiveList } from './components/ArchiveList/ArchiveList';
import styles from './AdminPage.module.css';
import { UserList } from './components/UserList/UserList';
import { useDispatch, useSelector } from 'react-redux';
import { CLOSE_MODAL, openModal, selectRole } from '../../../../store';
import { ROLE } from '../../../../constants';
import { useMatch } from 'react-router-dom';

export const AdminPage = () => {
	const [searchActive, setSearchActive] = useState('');
	const [bookings, setBookings] = useState([]);
	const { sendRequest, error } = useRequest();
	const role = useSelector(selectRole);
	const dispatch = useDispatch();
	const isCurrentBookingsPage = useMatch('/admin/current-bookings');
	const isArchivePage = useMatch('/admin/archive');
	const isUsersPage = useMatch('/admin/users');
	const accessToPage = [ROLE.ADMIN, ROLE.MANAGER];

	useEffect(() => {
		window.scrollTo(0, 0);

		const fetchBookings = async () => {
			const bookings = await sendRequest('/admin/bookings');
			setBookings(bookings);
		};

		fetchBookings();
	}, [sendRequest]);

	const deleteBooking = async (id) => {
		dispatch(
			openModal({
				text: 'remove the booking?',
				onConfirmModal: async () => {
					const isDeleted = await sendRequest(`/bookings/${id}`, 'DELETE');

					if (isDeleted) {
						setBookings(bookings.filter((b) => b.id !== id));
					}
					dispatch(CLOSE_MODAL);
				},
			}),
		);
	};

	const bookingsProps = {
		bookings,
		deleteBooking,
		Icon,
		search: searchActive,
		setSearch: setSearchActive,
		setBookings,
	};

	return accessToPage.includes(role) ? (
		<>
			{isCurrentBookingsPage && (
				<div className={styles.adminContent}>
					<h1>Admin panel</h1>
					<Bookings {...bookingsProps} />
				</div>
			)}
			{isArchivePage && <ArchiveList sendRequest={sendRequest} error={error} />}
			{isUsersPage && <UserList />}
		</>
	) : (
		<Info style={{ fontSize: '25px', margin: 'auto' }}>Access denied!</Info>
	);
};
