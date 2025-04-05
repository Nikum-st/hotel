import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	selectBookings,
	selectRooms,
	selectUserId,
	selectLoading,
	selectRole,
	deleteBookingAsync,
} from '../../../../store';
import { fetchBookingsAsync } from '../../../../store';
import { useFetchRooms, useRequestServer } from '../../../../hooks';
import { Loader } from '../../../components/Loader/Loader';
import styles from './Bookings.module.css';
import { BookingInfo, Button, NoBookingInfo } from '../../../components';

export const BookingsPage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const bookings = useSelector(selectBookings);
	const rooms = useSelector(selectRooms);
	const id = useSelector(selectUserId);
	const role = useSelector(selectRole);
	const isLoading = useSelector(selectLoading);
	const fetchBookings = useRequestServer();
	const fetchRooms = useFetchRooms();

	useEffect(() => {
		window.scrollTo(0, 0);
		if (!rooms.length) {
			fetchRooms();
		}
		if (!bookings.length) {
			dispatch(fetchBookingsAsync(fetchBookings, role));
		}
	}, []);

	const deleteBooking = (id) => {
		dispatch(deleteBookingAsync(fetchBookings, id, role));
	};

	const booksUser = bookings.filter(({ userId }) => id === userId);

	const bookRooms = rooms.filter(({ name }) =>
		booksUser.some(({ roomName }) => roomName === name),
	);

	const bookingsOfUser = booksUser.map((booking) => ({
		...booking,
		room: bookRooms.find(({ name }) => name === booking.roomName),
	}));

	return isLoading ? (
		<Loader />
	) : !role ? (
		navigate('*')
	) : bookingsOfUser.length ? (
		<div className={styles.containerBookings}>
			{bookingsOfUser.map((booking) => (
				<div className={styles.booking} key={booking.id}>
					<img src={booking.room.img} alt={booking.room.name} />
					<BookingInfo
						room={booking.room}
						id={booking.id}
						startDate={booking.startDate}
						endDate={booking.endDate}
						price={booking.room.price}
					/>
					<Button
						onClick={() => deleteBooking(booking.id)}
						style={{ background: '#af0303', height: '50px' }}
					>
						Delete
					</Button>
				</div>
			))}
		</div>
	) : (
		<NoBookingInfo>You don't have a booking</NoBookingInfo>
	);
};
