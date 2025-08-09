interface Booking {
	checkIn: string;
	checkOut: string;
}

export interface roomType {
	id: string;
	name: string;
	category: string;
	size: number;
	beds: string;
	description: string;
	shortDescription: string;
	amenities: string[];
	price: number;
	img: string;
	bookings: Booking[];
}
