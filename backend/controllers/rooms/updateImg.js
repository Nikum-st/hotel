const fs = require('fs');
const path = require('path');
const Rooms = require('../../models/rooms');

module.exports = async function (file, roomId) {
	const existingRoom = await Rooms.findById(roomId);
	if (!existingRoom) {
		throw new Error(`Room is not find`);
	}

	if (file && existingRoom.img) {
		const oldImgPath = path.join(__dirname, '../../uploads', existingRoom.img);
		if (fs.existsSync(oldImgPath)) {
			fs.unlinkSync(oldImgPath);
		}
	}

	return {
		img: file ? file.filename : existingRoom.img,
	};
};
