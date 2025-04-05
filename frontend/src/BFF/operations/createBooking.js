import { addBookingToServer } from '../api';

export const createBooking = async (
	userId,
	firstName,
	lastName,
	phone,
	roomName,
	startDate,
	endDate,
	session,
) => {
	if (!userId || !session) {
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

	try {
		const createdBooking = await addBookingToServer(
			userId,
			firstName,
			lastName,
			phone,
			roomName,
			startDate,
			endDate,
		);

		return {
			error: null,
			res: {
				id: createdBooking.id,
				userId: createdBooking.user_id,
				firstName: createdBooking.first_name,
				lastName: createdBooking.last_name,
				phone: createdBooking.phone,
				roomName: createdBooking.room_name,
				startDate: createdBooking.start_date,
				endDate: createdBooking.end_date,
			},
		};
	} catch (e) {
		console.log(`Error from server: ${e}`);
	}
};
