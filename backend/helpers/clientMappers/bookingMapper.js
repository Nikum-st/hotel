module.exports = (booking) => ({
	id: booking.id,
	user: { login: booking.user.login, email: booking.user.email },
	firstName: booking.firstName,
	lastName: booking.lastName,
	phone: booking.phone,
	room: booking.room.name,
	checkIn: booking.checkIn,
	checkOut: booking.checkOut,
});
