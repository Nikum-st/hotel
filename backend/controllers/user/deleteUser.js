const User = require('../../models/user');
const token = require('../../helpers/token');

module.exports = async (userId) => {
	try {
		const user = await User.findOneAndDelete({ _id: userId });
		if (!user) {
			throw new Error('User is not found');
		}
	} catch (e) {
		throw e;
	}
};
