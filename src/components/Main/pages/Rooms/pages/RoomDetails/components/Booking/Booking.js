import { Button, ErrorMessage, Input } from '../../../../../../../components';
import 'react-datepicker/dist/react-datepicker.css';
import { useState } from 'react';
import {
	selectBookings,
	selectIsAuthenticated,
	selectUser,
} from '../../../../../../../../store';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import { useRequestServer } from '../../../../../../../../hooks';
import styles from './Booking.module.css';
import { setBookingAsync } from '../../../../../../../../store';

export const Booking = ({ onClickBookingMode, room }) => {
	const [state, setState] = useState({
		firstName: null,
		lastName: null,
		phone: null,
		startDate: null,
		endDate: null,
		errorDate: false,
		errorOverlap: false,
	});

	const bookings = useSelector(selectBookings);
	const { id: userId, role } = useSelector(selectUser);
	const isAuthenticated = useSelector(selectIsAuthenticated);
	const fetchRequestServer = useRequestServer();
	const dispatch = useDispatch();

	const handleBooking = () => {
		if (!isAuthenticated) {
		}

		setState((prevState) => ({
			...prevState,
			errorDate: false,
			errorOverlap: false,
		}));

		if (!state.startDate || !state.endDate) {
			setState((prevState) => ({
				...prevState,
				errorDate: true,
			}));
			return;
		}

		const hasOverlap = bookings
			.filter((booking) => booking.roomName === room.name)
			.some(({ startDate: existingStart, endDate: existingEnd }) => {
				const start = moment(existingStart).startOf('day');
				const end = moment(existingEnd).endOf('day');
				return (
					moment(state.startDate).isBetween(start, end, null, '[]') ||
					moment(state.endDate).isBetween(start, end, null, '[]') ||
					(moment(state.startDate).isBefore(start) &&
						moment(state.endDate).isAfter(end))
				);
			});

		if (hasOverlap) {
			setState((prevState) => ({
				...prevState,
				errorOverlap: true,
			}));
			return;
		}

		dispatch(
			setBookingAsync(
				fetchRequestServer,
				userId,
				state.firstName,
				state.lastName,
				state.phone,
				room.name,
				state.startDate,
				state.endDate,
				role,
			),
		);

		onClickBookingMode();
	};

	const handleOnChange = (field) => (value) =>
		setState((prevState) => ({
			...prevState,
			[field]: value,
		}));

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
				<div>
					<Input
						type="text"
						name="firstName"
						onChange={(e) => handleOnChange('firstName')(e.target.value)}
					/>
					<Input
						type="text"
						name="lastName"
						onChange={(e) => handleOnChange('lastName')(e.target.value)}
					/>
					<Input
						type="tel"
						name="phone"
						onChange={(e) => handleOnChange('phone')(e.target.value)}
					/>
				</div>
				<DatePicker
					className={styles.reactDatepicker}
					selected={state.startDate}
					onChange={handleOnChange('startDate')}
					minDate={new Date()}
					filterDate={(date) => !isDateDisabled(date)}
					selectsStart
					startDate={state.startDate}
					endDate={state.endDate}
					dateFormat="dd.MM.yyyy"
					placeholderText="Select your check-in date"
				/>
				<DatePicker
					className={styles.reactDatepicker}
					selected={state.endDate}
					onChange={handleOnChange('endDate')}
					minDate={state.startDate || new Date()}
					filterDate={(date) => !isDateDisabled(date)}
					selectsEnd
					startDate={state.startDate}
					endDate={state.endDate}
					dateFormat="dd.MM.yyyy"
					placeholderText="Select departure date"
				/>
				<div className={styles.bookingSection}>
					<Button onClick={onClickBookingMode}>Cancel</Button>
					<Button onClick={handleBooking}>Save</Button>
				</div>
			</div>
			{state.errorDate && (
				<ErrorMessage>
					{state.startDate && state.endDate
						? 'The end date cannot be earlier than the start date'
						: 'Please fill in both the start and end dates'}
				</ErrorMessage>
			)}
			{state.errorOverlap && (
				<ErrorMessage>
					Selected dates overlap with an existing booking.
				</ErrorMessage>
			)}
		</div>
	);
};
