const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema(
	{
		bookings: [
			{
				checkIn: String,
				checkOut: String,
				_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking' },
			},
		],
	},
	{ strict: false },
);
module.exports = mongoose.model('Rooms', roomSchema);
