const User = require('../../models/user');
const bcrypt = require('bcrypt');
const token = require('../../helpers/token');
const user = require('../../models/user');

module.exports = async (login, password, email, role) => {
	try {
		if (!login) {
			throw new Error('login is required');
		}
		if (!password) {
			throw new Error('Password is required');
		}
		if (!email) {
			throw new Error('Email is required');
		}

		const hashPassword = await bcrypt.hash(password, 10);

		const newUser = await User.create({ password: hashPassword, login, email, role });
		console.log(newUser);
		const newToken = token.create({ id: user._id });

		return { user: newUser, token: newToken };
	} catch (e) {
		throw e;
	}
};
