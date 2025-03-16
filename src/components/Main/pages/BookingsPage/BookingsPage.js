import {
	fetchBookingsAsync,
	selectBookings,
	selectLoading,
	selectRooms,
	selectUser,
} from '../../../../store';
import styles from './Bookings.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useFetchRooms, useRequestServer } from '../../../../hooks';
import { Loader } from '../../../components/Loader/Loader';
import { roomName } from '../../../../constants';

export const BookingsPage = () => {
	const bookings = useSelector(selectBookings);
	const rooms = useSelector(selectRooms);
	const { id, role } = useSelector(selectUser);
	const isLoading = useSelector(selectLoading);
	const fetchBookings = useRequestServer();
	const fetchRooms = useFetchRooms();
	const dispatch = useDispatch();

	useEffect(() => {
		const loadRoomsAndBookings = async () => {
			if (!rooms.length) {
				await fetchRooms();
			}
			if (!bookings.length) {
				dispatch(fetchBookingsAsync(fetchBookings, role));
			}
		};

		loadRoomsAndBookings();
	}, []);

	const booksUser = bookings.filter(({ userId }) => id === userId);

	const bookRooms = rooms.filter(({ name }) =>
		booksUser.some(({ roomName }) => roomName === name),
	);

	const bookingsOfUser = booksUser.map((booking) => ({
		...booking,
		room: bookRooms.find(({ name }) => name === booking.roomName),
	}));

	const sumOfDays = (checkIn, checkOut) => {
		const start = new Date(checkIn).getTime();
		const end = new Date(checkOut).getTime();
		return (end - start) / (1000 * 3600 * 24);
	};
	const totalPrice = (price, sumOfDays) => {
		return price * sumOfDays;
	};

	return isLoading ? (
		<Loader />
	) : bookingsOfUser.length ? (
		<div className={styles.containerBookings}>
			{bookingsOfUser.map(({ id, startDate, endDate, room }) => (
				<div className={styles.booking} key={id}>
					<img src={room.img} alt={room.name} />
					<div className={styles.infoContainer}>
						<div>
							Name of room: <b>{roomName(room)}</b>
						</div>
						<div>
							Number of booking: <b>{id}</b>
						</div>
						<div>
							Check-in: <b>{startDate}</b>
						</div>
						<div>
							Check-out: <b>{endDate}</b>
						</div>
						<div>
							Number of days: <b>{sumOfDays(startDate, endDate)}</b>
						</div>
						<div>
							Total price: $
							<b>{totalPrice(room.price, sumOfDays(startDate, endDate))}</b>
						</div>
					</div>
				</div>
			))}
		</div>
	) : (
		<div className={styles.noBooking}>You don't have a booking</div>
	);
};
