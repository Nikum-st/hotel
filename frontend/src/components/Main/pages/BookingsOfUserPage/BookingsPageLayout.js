import styles from './Bookings.module.css';
import { Info, Wrapper } from '../../../components';
import { BookingCard } from './components/bookingCard/BookingCard';

export const BookingsPageLayout = ({ errorServer, deleteBooking, bookingsOfUser }) => {
	return (
		<Wrapper error={errorServer}>
			{bookingsOfUser.length ? (
				<>
					<div className={styles.containerBookings}>
						{bookingsOfUser.map((booking) => (
							<BookingCard
								key={booking.id}
								booking={booking}
								deleteBooking={deleteBooking}
							/>
						))}
					</div>
				</>
			) : (
				<Info>You don't have a booking</Info>
			)}
		</Wrapper>
	);
};
