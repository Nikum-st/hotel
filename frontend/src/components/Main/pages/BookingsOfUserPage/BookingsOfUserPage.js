import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	selectBookings,
	selectLoading,
	selectRole,
	deleteBookingAsync,
	loading,
	fetchBookingsAsyncOfUser,
} from '../../../../store';
import { BookingsPageLayout } from './BookingsPageLayout';

export const BookingsOfUserPage = () => {
	const [errorServer, setErrorServer] = useState(null);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const bookingsOfUser = useSelector(selectBookings);
	const role = useSelector(selectRole);
	const isLoading = useSelector(selectLoading);

	useEffect(() => {
		const fetchData = async () => {
			try {
				window.scrollTo(0, 0);
				dispatch(loading(true));

				if (!bookingsOfUser.length) {
					await dispatch(fetchBookingsAsyncOfUser());
				}
			} catch (err) {
				setErrorServer('Unexpected error. Please try again later');
			} finally {
				dispatch(loading(false));
			}
		};

		fetchData();
	}, []);

	const deleteBooking = async (id) => {
		await dispatch(deleteBookingAsync(id));
	};

	return (
		<BookingsPageLayout
			errorServer={errorServer}
			navigate={navigate}
			role={role}
			deleteBooking={deleteBooking}
			bookingsOfUser={bookingsOfUser}
			isLoading={isLoading}
		/>
	);
};
