import { getRooms } from '../api';

export const fetchRooms = async () => {
	const rooms = await getRooms();

	if (!rooms) {
		return;
	}

	return rooms;
};
