import { selectRooms, setRooms } from '../../../../store';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { RoomsPageLayout } from './RoomsPageLayout';
import { LIMIT_ROOMS_PER_PAGES } from '../../../../constants';
import { useRequest } from '../../../../hooks/useRequest';

export const RoomsPage = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [totalRooms, setTotalRooms] = useState('');
	const { sendRequest, error } = useRequest();
	const dispatch = useDispatch();
	const rooms = useSelector(selectRooms);

	useEffect(() => {
		const fetchData = async () => {
			window.scrollTo(0, 0);
			if (!rooms.length || currentPage) {
				const { totalRooms, rooms } = await sendRequest(
					`/rooms?page=${currentPage}&limit=${LIMIT_ROOMS_PER_PAGES}`,
				);
				if (rooms) {
					setTotalRooms(totalRooms);
					dispatch(setRooms(rooms));
				}
			}
		};

		fetchData();
	}, [currentPage, dispatch, rooms.length, sendRequest]);

	return (
		<RoomsPageLayout
			errorFromServer={error}
			rooms={rooms}
			totalRooms={totalRooms}
			currentPage={currentPage}
			onChangePage={setCurrentPage}
		/>
	);
};
