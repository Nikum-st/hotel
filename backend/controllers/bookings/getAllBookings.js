const Bookings = require('../../models/bookings');

module.exports = async function () {
	try {
		const bookings = await Bookings.find();

		return bookings;
	} catch (e) {
		throw e;
	}
};
