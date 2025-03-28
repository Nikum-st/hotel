import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'react-datepicker/dist/react-datepicker.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import moment from 'moment';
import {
	selectBookings,
	selectIsAuthenticated,
	selectUser,
	setBookingAsync,
} from '../../../../../../store';
import { useRequestServer } from '../../../../../../hooks';
import { yupSchemaAppoint } from '../../../../../../yup/yupSchemaAppoint';
import { BookingLayout } from './BookingLayout';
import { useParams } from 'react-router-dom';

export const BookingPage = () => {
	const bookings = useSelector(selectBookings);
	const { id: userId, role } = useSelector(selectUser);
	const fetchRequestServer = useRequestServer();
	const dispatch = useDispatch();
	const isAuthenticated = useSelector(selectIsAuthenticated);
	const [errorsGeneral, setErrorsGeneral] = useState(null);
	const [booking, setBooking] = useState(null);
	const { name } = useParams();

	const {
		register,
		handleSubmit,
		watch,
		setValue,
		setError,
		formState: { errors },
	} = useForm({
		defaultValues: {
			firstName: '',
			lastName: '',
			phone: '',
			startDate: null,
			endDate: null,
		},
		mode: 'onTouched',
		shouldFocusError: false,
		resolver: yupResolver(yupSchemaAppoint),
	});
	const { startDate, endDate } = watch();

	const handleBookingSubmit = async ({
		firstName,
		lastName,
		phone,
		startDate,
		endDate,
	}) => {
		if (!isAuthenticated) {
			setErrorsGeneral(`You are not logged in, log in!`);
			return;
		}
		const hasOverlap = bookings
			.filter((booking) => booking.roomName === name)
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
			setError('endDate', {
				type: 'manual',
				message: 'Selected dates overlap with an existing booking.',
			});
			return;
		}

		const { error, res } = await dispatch(
			setBookingAsync(
				fetchRequestServer,
				userId,
				firstName,
				lastName,
				phone,
				name,
				startDate,
				endDate,
				role,
			),
		);

		if (error) {
			setErrorsGeneral(error);
		}
		if (res) {
			setBooking(res);
		}
	};

	const isDateDisabled = (date) => {
		return bookings.some(({ startDate, endDate }) => {
			const start = moment(startDate).startOf('day');
			const end = moment(endDate).endOf('day');
			const current = moment(date).startOf('day');
			return current.isBetween(start, end, null, '[]');
		});
	};

	return (
		<BookingLayout
			handleSubmit={handleSubmit}
			handleBookingSubmit={handleBookingSubmit}
			errors={errors}
			register={register}
			startDate={startDate}
			setValue={setValue}
			endDate={endDate}
			isDateDisabled={isDateDisabled}
			errorsGeneral={errorsGeneral}
			name={name}
			booking={booking}
		/>
	);
};
