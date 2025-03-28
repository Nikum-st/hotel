import { roomName } from '../../../constants';
import styles from './BookingInfo.module.css';

const sumOfDays = (checkIn, checkOut) => {
	const start = new Date(checkIn).getTime();
	const end = new Date(checkOut).getTime();
	return (end - start) / (1000 * 3600 * 24);
};

const totalPrice = (price, sumOfDays) => {
	return price * sumOfDays;
};

export const BookingInfo = ({
	room,
	id,
	startDate,
	endDate,
	firstName,
	lastName,
	phone,
	roomName: name,
	price,
}) => {
	const numOfDays = sumOfDays(startDate, endDate);
	const total = totalPrice(price, numOfDays);

	return (
		<div className={styles.infoBooking}>
			{room && (
				<div>
					Name of room: <b>{roomName(room.name)}</b>
				</div>
			)}
			{id && (
				<div>
					Number of booking: <b>{id}</b>
				</div>
			)}
			{startDate && (
				<div>
					Check-in: <b>{startDate}</b>
				</div>
			)}
			{endDate && (
				<div>
					Check-out: <b>{endDate}</b>
				</div>
			)}
			{startDate && endDate && (
				<div>
					Number of days: <b>{numOfDays}</b>
				</div>
			)}
			{price && startDate && endDate && (
				<div>
					Total price: $<b>{total}</b>
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
			{name && (
				<div>
					Room name: <b>{roomName(name)}</b>
				</div>
			)}
		</div>
	);
};
