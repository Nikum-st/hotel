const User = require('../../models/user');
const Rooms = require('../../models/rooms');
const roomMapper = require('./roomMapper');
const userMapper = require('./userMapper');

module.exports = async function (booking) {
	try {
		const [userOfBooking, roomOfBooking] = await Promise.all([
			User.findById(booking.user),
			Rooms.findById(booking.room),
		]);

		if (!userOfBooking) throw new Error('User not found');
		if (!roomOfBooking) throw new Error('Room not found');

		return {
			id: booking.id,
			user: userMapper(userOfBooking),
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
