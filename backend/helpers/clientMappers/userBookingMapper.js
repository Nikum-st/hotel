module.exports = (booking) => {
	return {
		id: booking.id,
		firstName: booking.firstName,
		lastName: booking.lastName,
		phone: booking.phone,
		room: booking.room.name,
		checkIn: booking.checkIn,
		checkOut: booking.checkOut,
		totalPrice: booking.totalPrice,
		numOfDays: booking.numOfDays,
		img: `/uploads/${booking.room.img}`,
	};
};
