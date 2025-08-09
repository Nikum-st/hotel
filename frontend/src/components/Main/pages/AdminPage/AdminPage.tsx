import { useEffect, useState } from 'react';
import { Info } from '../../../components';
import { useRequest } from '../../../../hooks/useRequest';
import { Bookings } from './components/Bookings/Bookings';
import { ArchiveList } from './components/ArchiveList/ArchiveList';
import styles from './AdminPage.module.css';
import { UserList } from './components/UserList/UserList';
import { useSelector } from 'react-redux';
import { ROLE } from '../../../../constants';
import { useMatch } from 'react-router-dom';
import { bookingType } from '../../../../types/bookingsType';
import { RootState } from '../../../../store/store';

export const AdminPage = () => {
	const [searchActive, setSearchActive] = useState('');
	const [bookings, setBookings] = useState<bookingType[]>([]);
	const { sendRequest, error } = useRequest();
	const role = useSelector((state: RootState) => state.user?.role);

	const isCurrentBookingsPage = useMatch('/admin/current-bookings');
	const isArchivePage = useMatch('/admin/archive');
	const isUsersPage = useMatch('/admin/users');
	const hasAccess = role === ROLE.ADMIN || role === ROLE.MANAGER;

	useEffect(() => {
		window.scrollTo(0, 0);

		const fetchBookings = async () => {
			const bookings = await sendRequest('/admin/bookings');
			setBookings(bookings);
		};

		fetchBookings();
	}, [sendRequest]);

	const bookingsProps = {
		bookings,
		search: searchActive,
		setSearch: setSearchActive,
		setBookings,
		sendRequest,
	};

	return hasAccess ? (
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
