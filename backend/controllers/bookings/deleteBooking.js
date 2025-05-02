const Booking = require('../../models/bookings');
const Archive = require('../../models/archive');
const Rooms = require('../../models/rooms');
const mongoose = require('mongoose');

module.exports = async (bookingId, roleUser) => {
	try {
		const booking = await Booking.findOne({ id: bookingId }).populate([
			'user',
			'room',
		]);
		if (!booking) {
			throw new Error('Booking is not found');
		}
		const accessArchiveCreate = ['admin', 'manager'];

		if (accessArchiveCreate.includes(roleUser)) {
			await Archive.create({
				id: booking.id,
				user: booking.user,
				firstName: booking.firstName,
				lastName: booking.lastName,
				phone: booking.phone,
				room: booking.room,
				checkIn: booking.checkIn,
				checkOut: booking.checkOut,
				totalPrice: booking.totalPrice,
				numOfDays: booking.numOfDays,
			});
		}

		await Rooms.findByIdAndUpdate(booking.room, {
			$pull: { bookings: { _id: new mongoose.Types.ObjectId(booking._id) } },
		});

		await Booking.deleteOne(booking);
	} catch (e) {
		throw e;
	}
};
