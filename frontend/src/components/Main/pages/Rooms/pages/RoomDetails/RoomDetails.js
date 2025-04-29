import { useDispatch, useSelector } from 'react-redux';
import { useMatch, useParams } from 'react-router-dom';
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

			if (!rooms.length) {
				const result = await sendRequest('/rooms');
				if (result.rooms) {
					dispatch(setRooms(result.rooms));
				}
			}
			if (!room || Object.keys(room).length === 0) {
				const room = await sendRequest(`/rooms/${name}`);
				if (room) {
					dispatch(setRoom(room));
				} else {
				}
			}
		};

		fetchData();
	}, [rooms.length, name, room, dispatch, sendRequest]);

	return (
		<Wrapper alwaysAccess={true} error={error}>
			<div className={styles.content}>
				<HighPanel />
				<LowPanel />
			</div>
		</Wrapper>
	);
};
