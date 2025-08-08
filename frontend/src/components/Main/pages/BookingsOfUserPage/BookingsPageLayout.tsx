import styles from './Bookings.module.css';
import { Info, Wrapper } from '../../../components';
import { BookingCard } from './components/bookingCard/BookingCard';
import { DeleteBookingFC } from './types/BookingCardProps';
import { bookingsUser } from '../../../../types/bookingsUser';

type BookingPageProps = {
	errorServer: string | null;
	deleteBooking: DeleteBookingFC;
	bookingsOfUser: bookingsUser[];
};

export const BookingsPageLayout = ({
	errorServer,
	deleteBooking,
	bookingsOfUser,
}: BookingPageProps) => {
	return (
		<Wrapper error={errorServer}>
			{bookingsOfUser.length ? (
				<>
					<div className={styles.containerBookings}>
						{bookingsOfUser.map((booking) => {
							return (
								<BookingCard
									key={booking.id}
									booking={booking}
									deleteBooking={deleteBooking}
								/>
							);
						})}
					</div>
				</>
			) : (
				<Info>You don't have a booking</Info>
			)}
		</Wrapper>
	);
};
