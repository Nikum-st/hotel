const Archive = require('../../models/archive');

module.exports = async (bookingId) => {
	try {
		const booking = await Archive.findOneAndDelete({ id: bookingId });
		if (!booking) {
			throw new Error('Booking is not found');
		}
	} catch (e) {
		throw e;
	}
};
