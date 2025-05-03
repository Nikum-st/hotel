import { useDispatch, useSelector } from 'react-redux';
import { useMatch, useParams } from 'react-router-dom';
import { selectRooms, setRoom, setRooms } from '../../../../../../store';
import { useEffect } from 'react';
import { useRequest } from '../../../../../../hooks/useRequest';
import { Wrapper } from '../../../../../components';
import { HighPanel } from './components/HighPanel/HighPanel';
import { LowPanel } from './components/LowPanel/LowPanel';
import styles from './RoomDetails.module.css';

export const RoomDetails = () => {
	const rooms = useSelector(selectRooms);
	const dispatch = useDispatch();
	const { name } = useParams();
	const { sendRequest, error } = useRequest();
	const isEditing = useMatch('/rooms/:name/edit');

	useEffect(() => {
		const fetchData = async () => {
			window.scrollTo(0, 0);

			const result = await sendRequest(`/rooms/${name}`);
			if (result) {
				dispatch(setRoom(result));
			}

			if (!rooms.length) {
				const result = await sendRequest('/rooms');
				if (result?.rooms) {
					dispatch(setRooms(result.rooms));
				}
			}
		};

		fetchData();
	}, [name, dispatch, sendRequest, rooms.length]);

	return (
		<Wrapper adminAccess={isEditing ? true : false} error={error}>
			<div className={styles.content}>
				<HighPanel />
				<LowPanel />
			</div>
		</Wrapper>
	);
};
