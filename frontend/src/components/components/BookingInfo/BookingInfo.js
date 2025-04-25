import { roomName } from '../../../constants';
import styles from './BookingInfo.module.css';

export const BookingInfo = ({
	room,
	id,
	checkIn,
	checkOut,
	firstName,
	lastName,
	phone,
	numOfDays,
	totalPrice,
}) => {
	return (
		<div className={styles.infoBooking}>
			{room && (
				<div>
					Name of room: <b>{room.name}</b>
				</div>
			)}
			{id && (
				<div>
					Number of booking: <b>{id}</b>
				</div>
			)}
			{checkIn && (
				<div>
					Check-in: <b>{checkIn}</b>
				</div>
			)}
			{checkOut && (
				<div>
					Check-out: <b>{checkOut}</b>
				</div>
			)}
			{numOfDays && (
				<div>
					Number of days: <b>{numOfDays}</b>
				</div>
			)}
			{totalPrice && (
				<div>
					Total price: $<b>{totalPrice}</b>
				</div>
			)}
			{firstName && lastName && (
				<div>
					Name:{' '}
					<b>
						{firstName} {lastName}
					</b>
				</div>
			)}
			{phone && (
				<div>
					Phone: <b>{phone}</b>
				</div>
			)}
		</div>
	);
};
