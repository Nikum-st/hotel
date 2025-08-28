import { userType } from './userType';

export type bookingType = {
	id: string;
	user: { login: string; email: string };
	firstName: string;
	lastName: string;
	phone: string;
	room: string;
	checkIn: string;
	checkOut: string;
};
