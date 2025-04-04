const Booking = require('../../models/bookings');
const Archive = require('../../models/archive');
const Rooms = require('../../models/rooms');
const mongoose = require('mongoose');

module.exports = async (bookingId) => {
	try {
		const booking = await Booking.findOne({ id: bookingId });
		if (!booking) {
			throw new Error('Booking is not found');
		}

		await Archive.create({
			id: booking.id,
			user: booking.user,
			firstName: booking.firstName,
			lastName: booking.lastName,
			phone: booking.phone,
			room: booking.room,
			checkIn: booking.checkIn,
			checkOut: booking.checkOut,
		});

		await Rooms.findByIdAndUpdate(booking.room, {
			$pull: { bookings: { _id: new mongoose.Types.ObjectId(booking._id) } },
		});

		await Booking.deleteOne(booking);
	} catch (e) {
		throw e;
	}
};
