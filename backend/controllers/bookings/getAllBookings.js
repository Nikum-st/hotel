const Bookings = require('../../models/bookings');

module.exports = async function () {
	try {
		const bookings = await Bookings.find().populate(['user', 'room']);

		return bookings;
	} catch (e) {
		throw e;
	}
};
