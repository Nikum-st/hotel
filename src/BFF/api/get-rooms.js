import { getData } from './get-dates';
export const getRooms = async () => {
	try {
		const rooms = await getData('rooms');
		if (!rooms) {
			console.log('Не удалось загрузить данные');
			return [];
		}
		return rooms.map((room) => ({
			id: room.id,
			category: room.category,
			name: room.name,
			size: room.size,
			beds: room.beds,
			description: room.description,
			amenities: room.amenities,
			price: room.price,
			img: room.img,
		}));
	} catch (error) {
		console.error('Ошибка при запросе номеров от сервера:', error);
		return [];
	}
};
