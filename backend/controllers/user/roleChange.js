const User = require('../../models/user');
const token = require('../../helpers/token');

module.exports = async (userId, newRole) => {
	try {
		const user = await User.findByIdAndUpdate(userId, newRole, { new: true });
		if (!user) {
			throw new Error('User is not found');
		}
	} catch (e) {
		throw e;
	}
};
