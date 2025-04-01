const Rooms = require('../../models/rooms');
const roomMapper = require('./roomMapper');

module.exports = async function (booking) {
	try {
		const roomOfBooking = await Rooms.findById(booking.room);

		if (!roomOfBooking) throw new Error('Room not found');

		return {
			id: booking.id,
			firstName: booking.firstName,
			lastName: booking.lastName,
			phone: booking.phone,
			room: roomMapper(roomOfBooking),
			checkIn: booking.checkIn,
			checkOut: booking.checkOut,
		};
	} catch (e) {
		throw new Error(e.message);
	}
};
