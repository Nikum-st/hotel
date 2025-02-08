import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { roomName } from '../../../../../../constants';
import { Loader } from '../../../../../components/Loader/Loader';
import { selectRooms } from '../../../../../../store';
import { useEffect } from 'react';
import { useFetchRooms } from '../../../../../../hooks';
import styles from './RoomDetails.module.css';

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
			<h1>{roomName(room)}</h1>
			<div className={styles.containerDetails}>
				<img src={room.img} alt={room.name} />
				<div className={styles.info}></div>
			</div>
		</div>
	);
};
