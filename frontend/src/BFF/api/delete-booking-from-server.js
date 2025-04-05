export const deleteBookingFromServer = async (id) => {
	try {
		const response = await fetch(`http://localhost:3005/bookings/${id}`, {
			method: 'DELETE',
		});

		if (!response.ok) {
			throw new Error(`Failed to delete booking with id ${id}`);
		}

		console.log(`Booking with id ${id} deleted successfully`);
	} catch (error) {
		console.error(`Error deleting booking: ${error.message}`);
	}
};
