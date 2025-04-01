const Booking = require('../../models/bookings');
const Rooms = require('../../models/rooms');
const moment = require('moment');

module.exports = async function (
	{ startDate, endDate, firstName, lastName, phone },
	roomId,
	userId,
) {
	try {
		const id = new Date().getTime().toString().slice(5, 10);
		const checkIn = moment(startDate).format('YYYY-MM-DD');
		const checkOut = moment(endDate).format('YYYY-MM-DD');

		const newBooking = await Booking.create({
			firstName,
			lastName,
			phone,
			room: roomId,
			user: userId,
			checkIn,
			checkOut,
			id,
		});

		const roomOfBooking = await Rooms.findByIdAndUpdate(roomId, {
			$push: {
				bookings: {
					checkIn: newBooking.checkIn,
					checkOut: newBooking.checkOut,
				},
			},
		});

		return {
			id: newBooking.id,
			checkIn: newBooking.checkIn,
			checkOut: newBooking.checkOut,
			roomName: roomOfBooking.name,
		};
	} catch (e) {
		throw e;
	}
};
