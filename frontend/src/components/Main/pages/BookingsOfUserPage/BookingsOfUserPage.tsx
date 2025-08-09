import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { closeModal, deleteBooking, openModal } from '../../../../store';
import { BookingsPageLayout } from './BookingsPageLayout';
import { useRequest } from '../../../../hooks/useRequest';
import { ROLE } from '../../../../constants';
import { useNavigate } from 'react-router-dom';
import { DeleteBookingFC } from './types/BookingCardProps';
import { RootState } from '../../../../store/store';
import { bookingsUser } from '../../../../types/bookingsUser';

export const BookingsOfUserPage = () => {
	const [bookingsOfUser, setBookingsOfUser] = useState<bookingsUser[]>([]);
	const dispatch = useDispatch();
	const { sendRequest, error } = useRequest();
	const role = useSelector((state: RootState) => state.user?.role);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchData = async () => {
			if (bookingsOfUser.length && role !== ROLE.USER) {
				navigate('/admin/current-bookings');
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

	const deleteBookingFromStore: DeleteBookingFC = async (id, roomName, checkIn) => {
		dispatch(
			openModal({
				text: 'remove the booking?',
				onConfirmModal: async () => {
					const isDeleted = await sendRequest(`/bookings/${id}`, 'DELETE');
					if (isDeleted) {
						setBookingsOfUser(bookingsOfUser.filter((b) => b.id !== id));
						dispatch(deleteBooking({ roomName, checkIn }));
					}
					dispatch(closeModal());
				},
			}),
		);
	};

	return (
		<BookingsPageLayout
			errorServer={error}
			deleteBooking={deleteBookingFromStore}
			bookingsOfUser={bookingsOfUser}
		/>
	);
};
