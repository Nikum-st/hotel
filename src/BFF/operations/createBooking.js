import { addBookingToServer } from '../api';

export const createBooking = async (userId, roomName, startDate, endDate) => {
	if (!userId) {
		return {
			error: 'Пользователь не авторизован',
			res: null,
		};
	} else if (!roomName) {
		return {
			error: 'Номер не выбран',
			res: null,
		};
	} else if (!startDate || !endDate) {
		return {
			error: 'Некоректная дата',
			res: null,
		};
	}
	await addBookingToServer(userId, roomName, startDate, endDate);
};
