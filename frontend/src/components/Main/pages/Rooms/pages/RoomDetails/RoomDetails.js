import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { roomName } from '../../../../../../constants';
import { Loader } from '../../../../../components/Loader/Loader';
import {
	fetchBookingsAsync,
	selectBookings,
	selectLoading,
	selectRole,
	selectRooms,
} from '../../../../../../store';
import { useEffect } from 'react';
import { useFetchRooms, useRequestServer } from '../../../../../../hooks';
import styles from './RoomDetails.module.css';
import { Info } from './components/Info/Info';
import { Button } from '../../../../../components/Button/Button';
import { Icon } from '../../../../../components';

export const RoomDetails = () => {
	const fetchRooms = useFetchRooms();
	const fetchBookings = useRequestServer();
	const role = useSelector(selectRole);
	const bookings = useSelector(selectBookings);
	const rooms = useSelector(selectRooms);
	const dispatch = useDispatch();
	const { name } = useParams();
	const navigate = useNavigate();
	const isLoading = useSelector(selectLoading);

	useEffect(() => {
		const loadRoomsAndBookings = async () => {
			if (!rooms.length) {
				await fetchRooms();
			}
			if (!bookings.length) {
				console.log(role);
				dispatch(fetchBookingsAsync(fetchBookings, role));
			}
		};
		loadRoomsAndBookings();
	}, []);

	const room = rooms?.find((room) => room.name === name);
	if (!room) {
		return <Loader />;
	}

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
				<h1 className={styles.name}>{roomName(room.name)}</h1>
			</div>
			<div>
				<div className={styles.containerDetails}>
					<img src={room.img} alt={room.name} />
					<Info room={room}>
						<Link to={`/rooms/${name}/booking`}>
							<Button style={{ width: `40%` }}>Book</Button>
						</Link>
					</Info>
				</div>
			</div>
		</div>
	);
};
