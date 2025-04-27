const Rooms = require('../../models/rooms');

module.exports = async function (page, limit) {
	try {
		const [totalRooms, rooms] = await Promise.all([
			Rooms.countDocuments(),
			Rooms.find()
				.limit(limit)
				.skip((page - 1) * limit)
				.sort({ price: 1 }),
		]);

		return { totalRooms, rooms };
	} catch (e) {
		throw e;
	}
};
