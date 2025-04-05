const mongoose = require('mongoose');

const schemaBooking = mongoose.Schema({
	id: {
		type: String,
		required: true,
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		require: true,
	},
	firstName: {
		type: String,
		required: true,
		max: 40,
	},
	lastName: {
		type: String,
		required: true,
		max: 40,
	},
	phone: {
		type: String,
		required: true,
		validate: () => /^[0-9]+$/,
		min: 6,
	},
	room: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Rooms',
		required: true,
	},
	checkIn: {
		type: String,
		required: true,
		unique: true,
	},
	checkOut: {
		type: String,
		required: true,
		unique: true,
	},
});

module.exports = mongoose.model('Booking', schemaBooking);
