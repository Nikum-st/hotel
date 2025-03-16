import { getData } from './get-data';
export const getBookings = async () => {
	try {
		const bookings = await getData('bookings');

		return bookings.map((booking) => ({
			id: booking.id,
			userId: booking.user_id,
			firstName: booking.first_name,
			lastName: booking.last_name,
			phone: booking.phone,
			roomName: booking.room_name,
			startDate: booking.start_date,
			endDate: booking.end_date,
		}));
	} catch (error) {
		throw error;
	}
};
