import { loading, selectRooms, setRooms } from '../../../../store';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { request } from '../../../../utils/request';
import { RoomsPageLayout } from './RoomsPageLayout';

export const RoomsPage = () => {
	const rooms = useSelector(selectRooms);
	const dispatch = useDispatch();
	const [errorFromServer, setErrorFromServer] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				window.scrollTo(0, 0);
				dispatch(loading(true));

				if (!rooms.length) {
					const roomsServer = await request('/rooms');
					if (roomsServer) {
						dispatch(setRooms(roomsServer));
					}
				}
			} catch ({ message }) {
				setErrorFromServer(message);
			} finally {
				dispatch(loading(false));
			}
		};

		fetchData();
	}, [dispatch, rooms.length]);

	return <RoomsPageLayout errorFromServer={errorFromServer} rooms={rooms} />;
};
