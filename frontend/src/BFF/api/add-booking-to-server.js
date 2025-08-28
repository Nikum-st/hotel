import moment from 'moment';

export const addBookingToServer = (
	userId,
	firstName,
	lastName,
	phone,
	roomName,
	startDate,
	endDate,
) =>
	fetch(`http://localhost:3005/bookings`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json;charset=utf-8' },
		body: JSON.stringify({
			id: new Date().getTime().toString().slice(5, 10),
			user_id: userId,
			first_name: firstName,
			last_name: lastName,
			phone: phone,
			room_name: roomName,
			start_date: moment(startDate).format('YYYY-MM-DD'),
			end_date: moment(endDate).format('YYYY-MM-DD'),
		}),
	})
		.then((response) => response.json())
		.then((createdBooking) => {
			return createdBooking;
		})
		.catch((error) => {
			throw new Error(`Problems with the database:${error}`);
		});
