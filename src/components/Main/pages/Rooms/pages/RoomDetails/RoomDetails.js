import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { roomName } from '../../../../../../constants';
import { Loader } from '../../../../../components/Loader/Loader';
import { selectRooms } from '../../../../../../store';
import { useEffect } from 'react';
import { useFetchRooms } from '../../../../../../hooks';
import styles from './RoomDetails.module.css';
import { Info } from '../../components/Info';

export const RoomDetails = () => {
	const fetchRooms = useFetchRooms();
	const rooms = useSelector(selectRooms);
	const { name } = useParams();

	useEffect(() => {
		if (!rooms.length) {
			fetchRooms();
		}
	}, [rooms.length]);

	const room = rooms?.find((room) => room.name === name);
	if (!room) {
		return <Loader />;
	}

	return (
		<div className={styles.content}>
			<h1 className={styles.name}>{roomName(room)}</h1>
			<div className={styles.containerDetails}>
				<img src={room.img} alt={room.name} />
				<Info room={room} />
			</div>
		</div>
	);
};
