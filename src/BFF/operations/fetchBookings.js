import { getBookings } from '../api';

export const fetchBookings = async () => {
	try {
		const bookings = await getBookings();
		return bookings;
	} catch (e) {
		throw e;
	}
};
