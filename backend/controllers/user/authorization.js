const User = require('../../models/user');
const bcrypt = require('bcrypt');
const token = require('../../helpers/token');

module.exports = async (login, password) => {
	try {
		if (!login) {
			throw new Error('login is required');
		}
		if (!password) {
			throw new Error('Password is required');
		}

		const user = await User.findOne({ login });

		if (!user) {
			throw new Error('User is not found');
		}

		const hashPassword = await bcrypt.compare(password, user.password);

		if (!hashPassword) {
			throw new Error('Password is wrong');
		}

		const newToken = token.create({
			id: user._id,
			login: user.login,
			role: user.role,
		});

		return { user, token: newToken };
	} catch (e) {
		throw e;
	}
};
