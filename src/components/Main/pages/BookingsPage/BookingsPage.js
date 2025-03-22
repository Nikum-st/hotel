import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	selectBookings,
	selectRooms,
	selectUserId,
	selectLoading,
	selectRole,
} from '../../../../store';
import { fetchBookingsAsync } from '../../../../store';
import { useFetchRooms, useRequestServer } from '../../../../hooks';
import { Loader } from '../../../components/Loader/Loader';
import styles from './Bookings.module.css';
import { BookingInfo, Button } from '../../../components';

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
		if (!role) {
			navigate('*');
		}
		if (!rooms.length) {
			fetchRooms();
		}
		if (!bookings.length) {
			dispatch(fetchBookingsAsync(fetchBookings, role));
		}
	}, []);

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
				</div>
			))}
		</div>
	) : (
		<div className={styles.noBooking}>You don't have a booking</div>
	);
};
