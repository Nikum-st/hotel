const mongoose = require('mongoose');

const schemaUser = mongoose.Schema({
	login: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	role: {
		type: String,
		default: 'user',
	},
});

module.exports = new mongoose.model('User', schemaUser);
