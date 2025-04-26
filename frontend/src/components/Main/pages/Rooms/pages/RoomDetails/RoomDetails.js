import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Loader } from '../../../../../components/Loader/Loader';
import { loading, selectRooms, setRooms } from '../../../../../../store';
import { useEffect, useState } from 'react';
import { request } from '../../../../../../utils/request';
import { RoomDetailsLayout } from './RoomDetailsLayout';
import { Info } from '../../../../../components/Info/Info';

export const RoomDetails = () => {
	const rooms = useSelector(selectRooms);
	const dispatch = useDispatch();
	const { name } = useParams();
	const navigate = useNavigate();
	const [errorFromServer, setErrorFromServer] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				window.scrollTo(0, 0);
				dispatch(loading(true));

				if (!rooms.length) {
					const rooms = await request('/rooms');
					if (rooms) {
						dispatch(setRooms(rooms));
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
	if (rooms.length === 0) {
		return <Loader />;
	}
	if (!room) {
		return <Info>The selected room does not exist</Info>;
	}

	return (
		<RoomDetailsLayout
			room={room}
			errorFromServer={errorFromServer}
			name={name}
			navigate={navigate}
		/>
	);
};
