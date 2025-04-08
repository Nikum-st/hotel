import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { selectLoading, selectRole, loading, setRooms } from '../../../../store';
import { BookingsPageLayout } from './BookingsPageLayout';
import { request } from '../../../../utils/request';

export const BookingsOfUserPage = () => {
	const [errorServer, setErrorServer] = useState(null);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [bookingsOfUser, setBookingsOfUser] = useState([]);
	const role = useSelector(selectRole);
	const isLoading = useSelector(selectLoading);

	useEffect(() => {
		if (!role) {
			navigate('/authorize');
		}
		const fetchData = async () => {
			try {
				window.scrollTo(0, 0);
				dispatch(loading(true));

				const { data } = await request('/bookings/user');
				setBookingsOfUser(data);
			} catch (err) {
				setErrorServer('Unexpected error. Please try again later');
			} finally {
				dispatch(loading(false));
			}
		};

		fetchData();
	}, [bookingsOfUser.length, dispatch, navigate, role]);

	const deleteBooking = async (id) => {
		try {
			dispatch(loading(true));
			const result = await request(`/bookings/${id}`, 'DELETE');
			if (result.data) {
				const { data } = await request('/bookings/user');
				setBookingsOfUser(data);
				const updatedRooms = await request('/rooms');
				dispatch(setRooms(updatedRooms.data));
				dispatch(loading(false));
			} else if (result.error) {
				console.log(`Error from server`, result.error);
				setErrorServer(`Error from server`, result.error);
			}
		} finally {
			dispatch(loading(false));
		}
	};
	return (
		<BookingsPageLayout
			errorServer={errorServer}
			deleteBooking={deleteBooking}
			bookingsOfUser={bookingsOfUser}
			isLoading={isLoading}
		/>
	);
};
