import styles from './BookingInfo.module.css';
import { BookingInfoProps } from '../typesProps';

export const BookingInfo: React.FC<BookingInfoProps> = ({
	roomName,
	id,
	user,
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
			{roomName && (
				<div>
					Name of room: <b>{roomName}</b>
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
			{user && (
				<div>
					Email: <b>{user}</b>
				</div>
			)}
		</div>
	);
};
