import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { deleteBooking as deleteBookingFromStore } from '../../../../store';
import { BookingsPageLayout } from './BookingsPageLayout';
import { useRequest } from '../../../../hooks/useRequest';

export const BookingsOfUserPage = () => {
	const [bookingsOfUser, setBookingsOfUser] = useState([]);
	const dispatch = useDispatch();
	const { sendRequest, error } = useRequest();

	useEffect(() => {
		const fetchData = async () => {
			window.scrollTo(0, 0);

			const bookings = await sendRequest('/bookings/user');
			if (bookings) {
				setBookingsOfUser(bookings);
			}
		};

		fetchData();
	}, [sendRequest]);

	const deleteBooking = async (id, roomName, checkIn) => {
		const isDeleted = await sendRequest(`/bookings/${id}`, 'DELETE');
		if (isDeleted) {
			setBookingsOfUser(bookingsOfUser.filter((b) => b.id !== id));
			dispatch(deleteBookingFromStore(roomName, checkIn));
		}
	};
	return (
		<BookingsPageLayout
			errorServer={error}
			deleteBooking={deleteBooking}
			bookingsOfUser={bookingsOfUser}
		/>
	);
};
