import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { deleteBooking as deleteBookingFromStore, selectRole } from '../../../../store';
import { BookingsPageLayout } from './BookingsPageLayout';
import { useRequest } from '../../../../hooks/useRequest';
import { ROLE } from '../../../../constants';
import { useNavigate } from 'react-router-dom';

export const BookingsOfUserPage = () => {
	const [bookingsOfUser, setBookingsOfUser] = useState([]);
	const dispatch = useDispatch();
	const { sendRequest, error } = useRequest();
	const role = useSelector(selectRole);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchData = async () => {
			if (bookingsOfUser.length && role !== ROLE.USER) {
				navigate('/admin');
				return null;
			}
			window.scrollTo(0, 0);

			const bookings = await sendRequest('/bookings/user');
			if (bookings) {
				setBookingsOfUser(bookings);
			}
		};

		fetchData();
	}, [sendRequest, bookingsOfUser.length, navigate, role]);

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
