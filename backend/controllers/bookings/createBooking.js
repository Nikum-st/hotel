const Booking = require('../../models/bookings');
const Rooms = require('../../models/rooms');
const moment = require('moment');

const sumOfDays = (checkIn, checkOut) => {
	const start = new Date(checkIn).getTime();
	const end = new Date(checkOut).getTime();
	return (end - start) / (1000 * 3600 * 24);
};

const totalPrice = (price, sumOfDays) => {
	return price * sumOfDays;
};

module.exports = async function (
	{ startDate, endDate, firstName, lastName, phone },
	roomId,
	userId,
) {
	try {
		const numOfDays = sumOfDays(startDate, endDate);
		const id = new Date().getTime().toString().slice(5, 10);
		const checkIn = moment(startDate).format('YYYY-MM-DD');
		const checkOut = moment(endDate).format('YYYY-MM-DD');
		const priceRoom = (await Rooms.findById(roomId)).price;

		const newBooking = await Booking.create({
			firstName,
			lastName,
			phone,
			room: roomId,
			user: userId,
			checkIn,
			checkOut,
			id,
			numOfDays,
			totalPrice: totalPrice(priceRoom, numOfDays),
		});

		const room = await Rooms.findByIdAndUpdate(roomId, {
			$push: {
				bookings: {
					checkIn: newBooking.checkIn,
					checkOut: newBooking.checkOut,
					_id: newBooking._id,
				},
			},
		});

		return {
			id: newBooking.id,
			user: newBooking.user.email,
			firstName: newBooking.firstName,
			lastName: newBooking.lastName,
			phone: newBooking.phone,
			roomName: room.name,
			checkIn: newBooking.checkIn,
			checkOut: newBooking.checkOut,
			numOfDays: newBooking.numOfDays,
			totalPrice: newBooking.totalPrice,
		};
	} catch (e) {
		throw e;
	}
};
