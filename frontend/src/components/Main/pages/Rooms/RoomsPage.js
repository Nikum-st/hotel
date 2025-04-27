import { loading, selectRooms, setRooms } from '../../../../store';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { request } from '../../../../utils/request';
import { RoomsPageLayout } from './RoomsPageLayout';
import { LIMIT_ROOMS_PER_PAGES } from '../../../../constants';

export const RoomsPage = () => {
	const [errorFromServer, setErrorFromServer] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalRooms, setTotalRooms] = useState('');

	const dispatch = useDispatch();
	const rooms = useSelector(selectRooms);

	useEffect(() => {
		const fetchData = async () => {
			try {
				window.scrollTo(0, 0);
				dispatch(loading(true));

				if (!rooms.length || currentPage) {
					const { totalRooms, rooms } = await request(
						`/rooms?page=${currentPage}&limit=${LIMIT_ROOMS_PER_PAGES}`,
					);
					if (rooms) {
						setTotalRooms(totalRooms);
						dispatch(setRooms(rooms));
					}
				}
			} catch ({ message }) {
				setErrorFromServer(message);
			} finally {
				dispatch(loading(false));
			}
		};

		fetchData();
	}, [dispatch, rooms.length, currentPage]);

	return (
		<RoomsPageLayout
			errorFromServer={errorFromServer}
			rooms={rooms}
			totalRooms={totalRooms}
			currentPage={currentPage}
			onChangePage={setCurrentPage}
		/>
	);
};
