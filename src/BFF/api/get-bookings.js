import { roomName } from '../../constants';
import { getData } from './get-data';
export const getBookings = async () => {
	try {
		const bookings = await getData('bookings');
		if (!bookings) {
			throw new Error('Не удалось загрузить данные: bookings');
		}
		return bookings.map((booking) => ({
			id: booking.id,
			userId: booking.user_id,
			roomName: booking.room_name,
			startDate: booking.start_date,
			endDate: booking.end_date,
		}));
	} catch (error) {
		throw error;
	}
};
