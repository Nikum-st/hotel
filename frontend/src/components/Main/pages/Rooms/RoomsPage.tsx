import { setRooms, setTotalPages } from '../../../../store';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { RoomsPageLayout } from './RoomsPageLayout';
import { LIMIT_ROOMS_PER_PAGES } from '../../../../constants';
import { useRequest } from '../../../../hooks/useRequest';
import { RootState } from '../../../../store/store';

export const RoomsPage = () => {
	const currentPage = useSelector((state: RootState) => state.app.currentPage);
	const { sendRequest, error } = useRequest();
	const dispatch = useDispatch();
	const rooms = useSelector((state: RootState) => state.rooms);

	useEffect(() => {
		const fetchData = async () => {
			window.scrollTo(0, 0);
			if (rooms.length === 0 || currentPage) {
				const data = await sendRequest(
					`/rooms?page=${currentPage}&limit=${LIMIT_ROOMS_PER_PAGES}`,
				);
				if (data?.rooms) {
					dispatch(setTotalPages(data.totalPages));
					dispatch(setRooms(data.rooms));
				}
			}
		};

		fetchData();
	}, [currentPage, dispatch, rooms.length, sendRequest]);

	return <RoomsPageLayout errorFromServer={error} rooms={rooms} />;
};
