import { getBookings } from '../api';

export const fetchBookings = async (role) => {
	try {
		const bookings = await getBookings();
		return role === 'admin'
			? bookings
			: role === 'user'
				? bookings.map(({ id, userId, roomName, startDate, endDate }) => ({
						id,
						userId,
						roomName,
						startDate,
						endDate,
					}))
				: bookings.map(({ startDate, endDate, roomName }) => ({
						startDate,
						endDate,
						roomName,
					}));
	} catch (error) {
		throw error;
	}
};
