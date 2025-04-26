import { BookingInfo, Button } from '../../../../../components';
import styles from './BookingCard.module.css';

export const BookingCard = ({ booking, deleteBooking }) => (
	<div className={styles.booking} key={booking.id}>
		<img src={booking.room.img} alt={booking.room.name} />
		<BookingInfo
			firstName={booking.firstName}
			lastName={booking.lastName}
			roomName={booking.room}
			id={booking.id}
			checkIn={booking.checkIn}
			checkOut={booking.checkOut}
			totalPrice={booking.totalPrice}
			numOfDays={booking.numOfDays}
			phone={booking.phone}
		/>
		<Button
			onClick={() => deleteBooking(booking.id, booking.room, booking.checkIn)}
			style={{ background: '#af0303', height: '50px' }}
		>
			Delete
		</Button>
	</div>
);
