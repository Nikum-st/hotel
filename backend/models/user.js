const mongoose = require('mongoose');
const validator = require('validator');

const schemaUser = mongoose.Schema({
	login: {
		type: String,
		required: true,
		min: 3,
		max: 20,
		unique: true,
		validate: () => /^[A-Za-z\d_@$!%*?&]*$/,
	},
	password: {
		type: String,
		min: 3,
		required: true,
		validate: () => /^\w*$/,
	},
	email: {
		type: String,
		validate: validator.isEmail,
		unique: true,
	},
	role: {
		type: String,
		default: 'user',
	},
});

module.exports = new mongoose.model('User', schemaUser);
