const moment = require('moment');
module.exports = function (archive) {
	return {
		id: archive.id,
		user: archive.user,
		firstName: archive.firstName,
		lastName: archive.lastName,
		phone: archive.phone,
		room: archive.room,
		checkIn: archive.checkIn,
		checkOut: archive.checkOut,
		deleteAt: moment(archive.deleteAt).format('YYYY-MM-DD HH'),
	};
};
