const Rooms = require('../../models/rooms');

module.exports = async function (newValues, roomId) {
	try {
		const updatedRoom = await Rooms.findByIdAndUpdate(roomId, newValues, {
			new: true,
		});
		return updatedRoom;
	} catch (e) {
		throw e;
	}
};
