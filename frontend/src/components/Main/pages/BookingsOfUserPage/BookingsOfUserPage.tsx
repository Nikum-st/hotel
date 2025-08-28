import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { deleteBooking } from '../../../../store';
import { BookingsPageLayout } from './BookingsPageLayout';
import { useRequest } from '../../../../hooks/useRequest';
import { ROLE } from '../../../../constants';
import { useNavigate } from 'react-router-dom';
import { DeleteBookingFC } from './types/BookingCardProps';
import { RootState } from '../../../../store/store';
import { bookingsUser } from '../../../../types/bookingsUser';
import { useModal } from '../../../components/Modal/ModalContext';

export const BookingsOfUserPage = () => {
	const [bookingsOfUser, setBookingsOfUser] = useState<bookingsUser[]>([]);
	const dispatch = useDispatch();
	const { sendRequest, error } = useRequest();
	const role = useSelector((state: RootState) => state.user?.role);
	const navigate = useNavigate();

	const { openModal } = useModal();

	useEffect(() => {
		const fetchData = async () => {
			if (bookingsOfUser.length && role !== ROLE.USER) {
				navigate('/admin/active-bookings');
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
		openModal('remove the booking?', async () => {
			try {
				const isDeleted = await sendRequest(`/bookings/${id}`, 'DELETE');
				if (isDeleted) {
					setBookingsOfUser(bookingsOfUser.filter((b) => b.id !== id));
					dispatch(deleteBooking({ roomName, checkIn }));
				}
			} catch (e) {
				if (e instanceof Error) {
					console.error(e.message);
				}
			}
		});
	};

	return (
		<BookingsPageLayout
			errorServer={error}
			deleteBooking={deleteBookingFromStore}
			bookingsOfUser={bookingsOfUser}
		/>
	);
};
