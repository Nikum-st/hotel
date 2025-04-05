import { useDispatch, useSelector } from 'react-redux';
import { roomName } from '../../../../../constants';
import { deleteBookingAsync, selectRole } from '../../../../../store';
import { Input, NoBookingInfo } from '../../../../components';
import styles from './Bookings.module.css';
import { useRequestServer } from '../../../../../hooks';

export const Bookings = ({
	bookings,
	Icon,
	styleHeader,
	styleBody,
	search,
	setSearch,
	type,
}) => {
	const dispatch = useDispatch();
	const role = useSelector(selectRole);
	const fetchBookings = useRequestServer();

	const filteredBookings =
		bookings.filter(
			(b) =>
				b.firstName?.toLowerCase().includes(search.toLowerCase()) ||
				b.id?.toLowerCase().includes(search.toLowerCase()),
		) || [];

	const deleteBooking = (id) => {
		dispatch(deleteBookingAsync(fetchBookings, id, role));
	};

	return (
		<>
			<Input
				type="text"
				placeholder="Search by name or booking..."
				value={search}
				style={{ margin: '20px', width: '300px' }}
				onChange={(e) => setSearch(e.target.value)}
			/>
			{filteredBookings.length === 0 ? (
				<NoBookingInfo>No reservations</NoBookingInfo>
			) : (
				<div className={type === 'archive' && styles.archive}>
					<table className={styles.tableAdmin}>
						<thead style={styleHeader}>
							<tr>
								<th>Booking</th>
								<th>User id</th>
								<th>First name</th>
								<th>Last name</th>
								<th>Phone</th>
								<th>Room</th>
								<th>Check in</th>
								<th>Check out</th>
								{Icon && <th>Action</th>}
							</tr>
						</thead>
						<tbody style={styleBody}>
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
										{Icon && (
											<td>
												<Icon
													onClick={() => deleteBooking(b.id)}
													size={'30px'}
													id={'fa-times'}
													title={'Сomplete'}
													color={'#f43232'}
												/>
											</td>
										)}
									</tr>
								))
							)}
						</tbody>
					</table>
				</div>
			)}
		</>
	);
};
