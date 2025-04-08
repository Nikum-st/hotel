import styles from './Bookings.module.css';
import { Loader } from '../../../components/Loader/Loader';
import { BookingInfo, Button, Info } from '../../../components';

export const BookingsPageLayout = ({
	errorServer,
	navigate,
	role,
	deleteBooking,
	bookingsOfUser,
	isLoading,
}) => {
	return isLoading ? (
		<Loader />
	) : !role ? (
		navigate('/authorize')
	) : errorServer ? (
		<Info>{errorServer}</Info>
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
		<Info>You don't have a booking</Info>
	);
};
