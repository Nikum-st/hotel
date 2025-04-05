import { deleteBookingFromServer } from '../api';

export const deleteBooking = async (id, session) => {
	if (!session) {
		return { error: 'User is not authorized', res: false };
	}

	try {
		await deleteBookingFromServer(id);

		return {
			error: null,
			res: true,
		};
	} catch (e) {
		console.log(`Error from server: ${e}`);
		return { error: e, res: true };
	}
};
