import { loading, setRooms } from '../store';
import { useRequestServer } from '../hooks';
import { useDispatch } from 'react-redux';

export const useFetchRooms = () => {
	const dispatch = useDispatch();
	const fetchRequesRooms = useRequestServer();

	const fetchRooms = async () => {
		try {
			dispatch(loading(true));
			const loadedRooms = await fetchRequesRooms('fetchRooms');
			dispatch(setRooms(loadedRooms));
		} catch (error) {
			console.log('Ошибка при получении данных:', error);
		} finally {
			dispatch(loading(false));
		}
	};

	return fetchRooms;
};
