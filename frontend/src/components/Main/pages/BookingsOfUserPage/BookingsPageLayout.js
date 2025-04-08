import styles from './Bookings.module.css';
import { Loader } from '../../../components/Loader/Loader';
import { BookingInfo, Button, Info } from '../../../components';

export const BookingsPageLayout = ({
	errorServer,
	deleteBooking,
	bookingsOfUser,
	isLoading,
}) => {
	return isLoading ? (
		<Loader />
	) : bookingsOfUser.length ? (
		<>
			<div className={styles.containerBookings}>
				{bookingsOfUser.map((booking) => (
					<div className={styles.booking} key={booking.id}>
						<img src={booking.room.img} alt={booking.room.name} />
						<BookingInfo
							room={booking.room}
							id={booking.id}
							checkIn={booking.checkIn}
							checkOut={booking.checkOut}
							totalPrice={booking.totalPrice}
							numOfDays={booking.numOfDays}
							phone={booking.phone}
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
			{errorServer && <Info>{errorServer}</Info>}
		</>
	) : (
		<Info>You don't have a booking</Info>
	);
};
