import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { roomName } from '../../../../../../constants';
import { Loader } from '../../../../../components/Loader/Loader';
import { loading, selectLoading, selectRooms, setRooms } from '../../../../../../store';
import { useEffect, useState } from 'react';
import styles from './RoomDetails.module.css';
import { Info } from './components/Info/Info';
import { Button } from '../../../../../components/Button/Button';
import { Icon } from '../../../../../components';
import { request } from '../../../../../../utils/request';

export const RoomDetails = () => {
	const rooms = useSelector(selectRooms);
	const dispatch = useDispatch();
	const { name } = useParams();
	const navigate = useNavigate();
	const isLoading = useSelector(selectLoading);
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
	}, [rooms.length, dispatch]);
	const room = rooms?.find((room) => room.name === name);
	if (!room) {
		return <Loader />;
	}

	return isLoading ? (
		<Loader />
	) : errorFromServer ? (
		<Info>{errorFromServer}</Info>
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
