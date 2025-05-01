import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectRoom, selectRooms, setRoom, setRooms } from '../../../../../../store';
import { useEffect } from 'react';
import { useRequest } from '../../../../../../hooks/useRequest';
import { Wrapper } from '../../../../../components';
import { HighPanel } from './components/HighPanel/HighPanel';
import { LowPanel } from './components/LowPanel/LowPanel';
import styles from './RoomDetails.module.css';

export const RoomDetails = () => {
	const rooms = useSelector(selectRooms);
	const room = useSelector(selectRoom);
	const dispatch = useDispatch();
	const { name } = useParams();
	const { sendRequest, error } = useRequest();

	useEffect(() => {
		const fetchData = async () => {
			window.scrollTo(0, 0);

			if (!room || room.name !== name) {
				const result = await sendRequest(`/rooms/${name}`);
				if (result) {
					dispatch(setRoom(result));
				}
			}

			if (!rooms.length) {
				const result = await sendRequest('/rooms');
				if (result?.rooms) {
					dispatch(setRooms(result.rooms));
				}
			}
		};

		fetchData();
	}, [name, room, rooms.length, dispatch, sendRequest]);

	return (
		<Wrapper alwaysAccess={true} error={error}>
			<div className={styles.content}>
				<HighPanel />
				<LowPanel />
			</div>
		</Wrapper>
	);
};
