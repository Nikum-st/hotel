const Rooms = require('../../models/rooms');

module.exports = async function (name) {
	try {
		return Rooms.findOne({ name });
	} catch (e) {
		throw e;
	}
};
