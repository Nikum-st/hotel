import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'react-datepicker/dist/react-datepicker.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import moment from 'moment';
import {
	selectIsAuthenticated,
	selectLoading,
	selectRooms,
	setRooms,
	updateRoomBookings,
} from '../../../../../../store';
import { yupSchemaAppoint } from '../../../../../../yup/yupSchemaAppoint';
import { BookingLayout } from './BookingLayout';
import { useParams } from 'react-router-dom';
import { Info } from '../../../../../components';
import { useRequest } from '../../../../../../hooks/useRequest';

export const BookingPage = () => {
	const [errorsGeneral, setErrorsGeneral] = useState(null);
	const [booking, setBooking] = useState(null);
	const { name } = useParams();
	const isAuthenticated = useSelector(selectIsAuthenticated);
	const isLoading = useSelector(selectLoading);
	const rooms = useSelector(selectRooms);
	const dispatch = useDispatch();
	const { sendRequest, error } = useRequest();

	useEffect(() => {
		const fetchData = async () => {
			window.scrollTo(0, 0);

			if (!rooms.length) {
				const result = await sendRequest('/rooms');
				if (result.rooms) {
					dispatch(setRooms(result.rooms));
				}
			}
		};

		fetchData();
	}, [dispatch, rooms.length, sendRequest]);

	const roomCurrent = rooms?.find((r) => r.name === name);

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
		const hasOverlap = roomCurrent.bookings?.some(
			({ checkIn: existingStart, checkOut: existingEnd }) => {
				const start = moment(existingStart).startOf('day');
				const end = moment(existingEnd).endOf('day');
				return (
					moment(startDate).isBetween(start, end, null, '[]') ||
					moment(endDate).isBetween(start, end, null, '[]') ||
					(moment(startDate).isBefore(start) && moment(endDate).isAfter(end))
				);
			},
		);

		if (hasOverlap) {
			setError('endDate', {
				type: 'manual',
				message: 'Selected dates overlap with an existing booking.',
			});
			return;
		}

		const newBooking = await sendRequest(`/rooms/${roomCurrent.id}/booking`, 'POST', {
			firstName,
			lastName,
			phone,
			startDate,
			endDate,
		});
		if (newBooking) {
			dispatch(
				updateRoomBookings(
					roomCurrent.id,
					newBooking.checkIn,
					newBooking.checkOut,
				),
			);
			setBooking(newBooking);
		}
	};

	const isDateDisabled = (date) => {
		return roomCurrent.bookings?.some(({ checkIn, checkOut }) => {
			const start = moment(new Date(checkIn)).startOf('day');
			const end = moment(new Date(checkOut)).endOf('day');
			const current = moment(date).startOf('day');
			return current.isBetween(start, end, null, '[]');
		});
	};
	const room = rooms?.find((room) => room.name === name);

	if (!room) {
		return <Info>The selected room does not exist</Info>;
	}

	return (
		<BookingLayout
			errorFromServer={error}
			isLoading={isLoading}
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
