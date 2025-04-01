const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema(
	{
		bookings: [
			{
				checkIn: String,
				checkOut: String,
			},
		],
	},
	{ strict: false },
);
module.exports = mongoose.model('Rooms', roomSchema);
