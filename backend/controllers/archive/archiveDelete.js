const Archive = require('../../models/archive');

module.exports = async () => {
	try {
		await Archive.deleteMany();
	} catch (e) {
		throw e;
	}
};
