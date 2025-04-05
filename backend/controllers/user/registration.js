const User = require('../../models/user');
const bcrypt = require('bcrypt');
const token = require('../../helpers/token');
const HASH_SALT = process.env.HASH_SALT;

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

		const hashPassword = await bcrypt.hash(password, HASH_SALT);

		const newUser = await User.create({ password: hashPassword, login, email, role });

		const newToken = token.create({
			id: newUser._id,
			login: newUser.login,
			role: newUser.role,
		});

		return { user: newUser, token: newToken };
	} catch (e) {
		throw e;
	}
};
