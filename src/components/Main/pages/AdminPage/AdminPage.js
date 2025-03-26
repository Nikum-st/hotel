import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	deleteBookingAsync,
	fetchBookingsAsync,
	selectBookings,
	selectLoading,
	selectRole,
} from '../../../../store';
import { Button, Input, Loader, NoBookingInfo } from '../../../components';
import { useRequestServer } from '../../../../hooks';
import { useNavigate } from 'react-router-dom';
import styles from './AdminPage.module.css';
import { roomName } from '../../../../constants';

export const AdminPage = () => {
	const [search, setSearch] = useState('');
	const bookings = useSelector(selectBookings);
	const role = useSelector(selectRole);
	const isLoading = useSelector(selectLoading);
	const fetchBookings = useRequestServer();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		window.scrollTo(0, 0);
		if (!bookings.length) {
			dispatch(fetchBookingsAsync(fetchBookings, role));
		}
	}, [role, bookings.length, fetchBookings, dispatch, navigate]);

	const filteredBookings =
		bookings.filter(
			(b) =>
				b.firstName?.toLowerCase().includes(search.toLowerCase()) ||
				b.id?.toLowerCase().includes(search.toLowerCase()),
		) || [];

	const deleteBooking = (id) => {
		dispatch(deleteBookingAsync(fetchBookings, id, role));
	};

	return isLoading ? (
		<Loader />
	) : !role || role === 'user' ? (
		navigate('*')
	) : (
		<div className={styles.adminContent}>
			<h1>Admin panel</h1>
			<Input
				type="text"
				placeholder="Search by name or booking..."
				value={search}
				style={{ margin: '20px', width: '300px' }}
				onChange={(e) => setSearch(e.target.value)}
			/>
			<table className={styles.tableAdmin}>
				<thead>
					<tr>
						<th>Booking</th>
						<th>User id</th>
						<th>First name</th>
						<th>Last name</th>
						<th>Phone</th>
						<th>Room</th>
						<th>Check in</th>
						<th>Check out</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{filteredBookings.length === 0 ? (
						<tr>
							<td
								colSpan="9"
								style={{ textAlign: 'center', padding: '20px' }}
							>
								<NoBookingInfo>No reservations</NoBookingInfo>
							</td>
						</tr>
					) : (
						filteredBookings.map((b) => (
							<tr key={b.id}>
								<td>{b.id}</td>
								<td>{b.userId}</td>
								<td>{b.firstName}</td>
								<td>{b.lastName}</td>
								<td>{b.phone}</td>
								<td>{roomName(b.roomName)}</td>
								<td>{b.startDate}</td>
								<td>{b.endDate}</td>
								<td>
									<Button
										onClick={() => deleteBooking(b.id)}
										style={{ background: '#af0303', height: '30px' }}
									>
										Удалить
									</Button>
								</td>
							</tr>
						))
					)}
				</tbody>
			</table>
		</div>
	);
};
