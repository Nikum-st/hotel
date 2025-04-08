module.exports = function (room) {
	return {
		id: room.id,
		name: room.name,
		category: room.category,
		size: room.size,
		beds: room.beds,
		description: room.description,
		shortDescription: room.short_description,
		amenities: room.amenities,
		price: room.price,
		img: room.img,
		bookings:
			room.bookings.length > 0
				? room.bookings.map((b) => ({ checkIn: b.checkIn, checkOut: b.checkOut }))
				: [],
	};
};
