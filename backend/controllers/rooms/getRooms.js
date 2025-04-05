const Rooms = require('../../models/rooms');

module.exports = async function () {
	try {
		const rooms = await Rooms.find();
		return rooms;
	} catch (e) {
		throw e;
	}
};
