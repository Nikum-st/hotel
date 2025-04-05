const User = require('../../models/user');

module.exports = async function () {
	try {
		return await User.find();
	} catch (e) {
		throw e;
	}
};
