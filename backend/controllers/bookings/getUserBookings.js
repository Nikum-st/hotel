const Bookings = require('../../models/bookings');

module.exports = async function (userId) {
	try {
		const bookings = await Bookings.find({ user: userId }).populate('room');

		return bookings;
	} catch (e) {
		throw e;
	}
};
