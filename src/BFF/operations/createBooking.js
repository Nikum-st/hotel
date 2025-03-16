import { addBookingToServer } from '../api';

export const createBooking = async (
	userId,
	firstName,
	lastName,
	phone,
	roomName,
	startDate,
	endDate,
) => {
	if (!userId) {
		return { error: 'User is not authorized', res: null };
	}
	if (!roomName) {
		return { error: 'Number not selected', res: null };
	}
	if (!startDate || !endDate) {
		return { error: 'Incorrect date', res: null };
	}
	if (!firstName || !lastName) {
		return { error: 'First and last name not selected', res: null };
	}

	await addBookingToServer(
		userId,
		firstName,
		lastName,
		phone,
		roomName,
		startDate,
		endDate,
	);

	return { error: null, res: 'Booking successful' };
};
