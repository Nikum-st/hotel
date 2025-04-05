const Archive = require('../../models/archive');

module.exports = async () => {
	return await Archive.find();
};
