import { useDispatch, useSelector } from 'react-redux';
import { useMatch, useNavigate, useParams } from 'react-router-dom';
import { Loader } from '../../../../../components/Loader/Loader';
import { selectRooms, setRooms } from '../../../../../../store';
import { useEffect } from 'react';
import { RoomDetailsLayout } from './RoomDetailsLayout';
import { Info } from '../../../../../components/Info/Info';
import { useRequest } from '../../../../../../hooks/useRequest';

export const RoomDetails = () => {
	const rooms = useSelector(selectRooms);
	const dispatch = useDispatch();
	const { name } = useParams();
	const navigate = useNavigate();
	const { sendRequest, error } = useRequest();
	const isEditing = useMatch('/rooms/:name/edit');

	useEffect(() => {
		const fetchData = async () => {
			window.scrollTo(0, 0);

			if (!rooms.length) {
				const result = await sendRequest('/rooms');
				if (result.rooms) {
					dispatch(setRooms(result.rooms));
				}
			}
		};

		fetchData();
	}, [rooms.length, dispatch, sendRequest]);

	const room = rooms?.find((room) => room.name === name);
	if (rooms.length === 0) {
		return <Loader />;
	}
	if (!room) {
		return <Info>The selected room does not exist</Info>;
	}

	return (
		<RoomDetailsLayout
			room={room}
			errorFromServer={error}
			name={name}
			navigate={navigate}
			isEditing={isEditing}
		/>
	);
};
