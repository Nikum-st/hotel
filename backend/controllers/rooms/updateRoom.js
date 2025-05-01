const Rooms = require('../../models/rooms');
const sanitizeDescription = require('../../utils/sanitize-description');

module.exports = async function (newValues, roomId) {
	try {
		console.log(newValues);
		const data = {
			...newValues,
			description: sanitizeDescription(newValues.description),
			price: Number(newValues.price),
			size: Number(newValues.size),
			name: newValues.name.trim(),
			shortDescription: newValues.shortDescription.trim(),
			category: newValues.category.trim(),
			beds: newValues.beds.trim(),
			amenities: newValues.amenities
				.replace(/\s*,\s*/g, ',')
				.trim()
				.split(','),
		};

		const updatedRoom = await Rooms.findByIdAndUpdate(roomId, data, {
			new: true,
		});
		return updatedRoom;
	} catch (e) {
		throw e;
	}
};
