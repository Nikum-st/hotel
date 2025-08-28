module.exports = function (room) {
	return {
		id: room.id,
		name: room.name,
		category: room.category,
		size: room.size,
		beds: room.beds,
		description: room.description,
		shortDescription: room.shortDescription,
		amenities: room.amenities,
		price: room.price,
		img: `/uploads/${room.img}`,
		bookings:
			room.bookings?.length > 0
				? room.bookings.map((b) => ({ checkIn: b.checkIn, checkOut: b.checkOut }))
				: [],
	};
};
