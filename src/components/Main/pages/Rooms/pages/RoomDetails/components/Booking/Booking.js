import { Button, ErrorMessage } from '../../../../../../../components';
import 'react-datepicker/dist/react-datepicker.css';
import { useState } from 'react';
import { selectBookings, selectUserId } from '../../../../../../../../store';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import { useRequestServer } from '../../../../../../../../hooks';
import styles from './Booking.module.css';
import { setBookingAsync } from '../../../../../../../../store';

export const Booking = ({ onClickBookingMode, room }) => {
	const [startDate, setStartDate] = useState(null);
	const [endDate, setEndDate] = useState(null);
	const bookings = useSelector(selectBookings);
	const fetchRequestServer = useRequestServer();
	const userId = useSelector(selectUserId);
	const [errorDate, setErrorDate] = useState(false);
	const [errorOverlap, setErrorOverlap] = useState(false);
	const dispatch = useDispatch();

	const handleBooking = () => {
		setErrorDate(false);
		setErrorOverlap(false);

		if (!startDate || !endDate) {
			setErrorDate(true);
			return;
		}

		if (moment(endDate).isBefore(startDate)) {
			setErrorDate(true);
			return;
		}

		const hasOverlap = bookings
			.filter((booking) => booking.roomName === room.name)
			.some(({ startDate: existingStart, endDate: existingEnd }) => {
				const start = moment(existingStart).startOf('day');
				const end = moment(existingEnd).endOf('day');
				return (
					moment(startDate).isBetween(start, end, null, '[]') ||
					moment(endDate).isBetween(start, end, null, '[]') ||
					(moment(startDate).isBefore(start) && moment(endDate).isAfter(end))
				);
			});

		if (hasOverlap) {
			setErrorOverlap(true);
			return;
		}

		dispatch(
			setBookingAsync(fetchRequestServer, userId, room.name, startDate, endDate),
		);

		onClickBookingMode();
	};

	const isDateDisabled = (date) => {
		return bookings
			.filter((booking) => booking.roomName === room.name)
			.some(({ startDate, endDate }) => {
				const start = moment(startDate).startOf('day');
				const end = moment(endDate).endOf('day');
				const current = moment(date).startOf('day');

				return current.isBetween(start, end, null, '[]');
			});
	};

	return (
		<div className={styles.content}>
			<div className={styles.bookingContainer}>
				<DatePicker
					className={styles.reactDatepicker}
					selected={startDate}
					onChange={(date) => setStartDate(date)}
					minDate={new Date()}
					filterDate={(date) => !isDateDisabled(date)}
					selectsStart
					startDate={startDate}
					endDate={endDate}
					dateFormat="dd.MM.yyyy"
					placeholderText="Select your check-in date"
				/>
				<DatePicker
					className={styles.reactDatepicker}
					selected={endDate}
					onChange={(date) => setEndDate(date)}
					minDate={startDate || new Date()}
					filterDate={(date) => !isDateDisabled(date)}
					selectsEnd
					startDate={startDate}
					endDate={endDate}
					dateFormat="dd.MM.yyyy"
					placeholderText="Select departure date"
				/>
				<div className={styles.bookingSection}>
					<Button onClick={onClickBookingMode}>Cancel</Button>
					<Button onClick={handleBooking}>Save</Button>
				</div>
			</div>
			{errorDate && (
				<ErrorMessage>
					The end date cannot be earlier than the start date
				</ErrorMessage>
			)}
			{errorOverlap && (
				<ErrorMessage>
					Selected dates overlap with an existing booking.
				</ErrorMessage>
			)}
		</div>
	);
};
