const Rooms = require('../../models/rooms');

module.exports = async function (page, limit) {
	try {
		const [totalRooms, rooms] = await Promise.all([
			Rooms.countDocuments(),
			Rooms.find()
				.sort({ price: 1 })
				.limit(limit)
				.skip((page - 1) * limit),
		]);
		const totalPages = Math.ceil(totalRooms / limit);

		return { totalPages, rooms };
	} catch (e) {
		throw e;
	}
};
