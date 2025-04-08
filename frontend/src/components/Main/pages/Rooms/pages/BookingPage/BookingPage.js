import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'react-datepicker/dist/react-datepicker.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import moment from 'moment';
import {
	loading,
	selectIsAuthenticated,
	selectLoading,
	selectRooms,
	setBookingAsync,
	setRooms,
} from '../../../../../../store';
import { yupSchemaAppoint } from '../../../../../../yup/yupSchemaAppoint';
import { BookingLayout } from './BookingLayout';
import { useParams } from 'react-router-dom';
import { request } from '../../../../../../utils/request';
import { Info } from '../../../../../components';

export const BookingPage = () => {
	const [errorsGeneral, setErrorsGeneral] = useState(null);
	const [booking, setBooking] = useState(null);
	const { name } = useParams();
	const isAuthenticated = useSelector(selectIsAuthenticated);
	const isLoading = useSelector(selectLoading);
	const rooms = useSelector(selectRooms);
	const dispatch = useDispatch();
	const [errorFromServer, setErrorFromServer] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				window.scrollTo(0, 0);
				dispatch(loading(true));

				if (!rooms.length) {
					const { error, data } = await request('/rooms');
					if (error) {
						setErrorFromServer('Error from server. Please try again later');
					} else {
						dispatch(setRooms(data));
					}
				}
			} catch (e) {
				setErrorFromServer('Unexpected error. Please try again later');
			} finally {
				dispatch(loading(false));
			}
		};

		fetchData();
	}, [dispatch, rooms.length]);

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

		try {
			const { error, data } = await dispatch(
				setBookingAsync(
					{
						firstName,
						lastName,
						phone,
						startDate,
						endDate,
					},
					roomCurrent.id,
				),
			);
			if (data) {
				dispatch(setBooking(data));
			} else {
				setErrorFromServer(error);
			}
		} catch {
			setErrorsGeneral('Booking failed. Please try again later.');
		}
	};

	const isDateDisabled = (date) => {
		return roomCurrent.bookings?.some(({ checkIn, checkOut }) => {
			const start = moment(checkIn).startOf('day');
			const end = moment(checkOut).endOf('day');
			const current = moment(date).startOf('day');
			return current.isBetween(start, end, null, '[]');
		});
	};

	return errorFromServer ? (
		<Info>{errorFromServer}</Info>
	) : (
		<BookingLayout
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
