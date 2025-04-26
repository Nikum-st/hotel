import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	selectRole,
	loading,
	deleteBooking as deleteBookingFromStore,
} from '../../../../store';
import { BookingsPageLayout } from './BookingsPageLayout';
import { request } from '../../../../utils/request';

export const BookingsOfUserPage = () => {
	const [errorServer, setErrorServer] = useState(null);
	const [bookingsOfUser, setBookingsOfUser] = useState([]);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const role = useSelector(selectRole);

	useEffect(() => {
		const fetchData = async () => {
			try {
				window.scrollTo(0, 0);
				dispatch(loading(true));

				const bookings = await request('/bookings/user');
				setBookingsOfUser(bookings);
			} catch (e) {
				setErrorServer(e.message);
			} finally {
				dispatch(loading(false));
			}
		};

		fetchData();
	}, [bookingsOfUser.length, dispatch, navigate, role]);

	const deleteBooking = async (id, roomName, checkIn) => {
		try {
			dispatch(loading(true));
			const isDeleted = await request(`/bookings/${id}`, 'DELETE');
			if (isDeleted) {
				setBookingsOfUser(bookingsOfUser.filter((b) => b.id !== id));
				dispatch(deleteBookingFromStore(roomName, checkIn));
			}
		} catch ({ message }) {
			console.error(message);
			setErrorServer(message);
		} finally {
			dispatch(loading(false));
		}
	};
	return (
		<BookingsPageLayout
			errorServer={errorServer}
			deleteBooking={deleteBooking}
			bookingsOfUser={bookingsOfUser}
		/>
	);
};
