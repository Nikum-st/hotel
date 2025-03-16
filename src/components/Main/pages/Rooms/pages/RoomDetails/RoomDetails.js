import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { roomName } from '../../../../../../constants';
import { Loader } from '../../../../../components/Loader/Loader';
import {
	fetchBookingsAsync,
	selectBookings,
	selectIsAuthenticated,
	selectLoading,
	selectRole,
	selectRooms,
} from '../../../../../../store';
import { useEffect, useState } from 'react';
import { useFetchRooms, useRequestServer } from '../../../../../../hooks';
import styles from './RoomDetails.module.css';
import { Info } from './components/Info/Info';
import { Button } from '../../../../../components/Button/Button';
import { Booking } from './components/Booking/Booking';
import { Icon } from '../../../../../components';

export const RoomDetails = () => {
	const [bookingMode, setBookingMode] = useState(false);
	const fetchRooms = useFetchRooms();
	const fetchBookings = useRequestServer();
	const role = useSelector(selectRole);
	const bookings = useSelector(selectBookings);
	const rooms = useSelector(selectRooms);
	const dispatch = useDispatch();
	const { name } = useParams();
	const navigate = useNavigate();
	const isLoading = useSelector(selectLoading);
	const isAuthenticated = useSelector(selectIsAuthenticated);

	useEffect(() => {
		const loadRoomsAndBookings = async () => {
			if (!rooms.length) {
				await fetchRooms();
			}
			if (!bookings.length) {
				dispatch(fetchBookingsAsync(fetchBookings, role));
			}
		};
		loadRoomsAndBookings();
	}, []);

	const room = rooms?.find((room) => room.name === name);
	if (!room) {
		return <Loader />;
	}

	const onClickBookingMode = () => {
		setBookingMode(!bookingMode);
	};

	return isLoading ? (
		<Loader />
	) : (
		<div className={styles.content}>
			<div className={styles.highPanel}>
				<div className={styles.icon}>
					<Icon
						onClick={() => navigate('/rooms')}
						size={'20px'}
						id={'fa-chevron-left'}
						title="back"
					/>
				</div>
				<h1 className={styles.name}>{roomName(room)}</h1>
			</div>
			<div>
				{!bookingMode ? (
					<div className={styles.containerDetails}>
						<img src={room.img} alt={room.name} />
						<Info room={room}>
							<Button onClick={onClickBookingMode} style={{ width: `40%` }}>
								Book
							</Button>
						</Info>
					</div>
				) : (
					<Booking room={room} onClickBookingMode={onClickBookingMode} />
				)}
			</div>
		</div>
	);
};
