const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
require('dotenv').config();
const registration = require('./controllers/user/registration');
const authorization = require('./controllers/user/authorization');
const getAllBookings = require('./controllers/bookings/getAllBookings');
const getUserBookings = require('./controllers/bookings/getUserBookings');
const createBooking = require('./controllers/bookings/createBooking');
const getRooms = require('./controllers/rooms/getRooms');
const userMapper = require('./helpers/clientMappers/userMapper');
const roomMapper = require('./helpers/clientMappers/roomMapper');
const bookingMapper = require('./helpers/clientMappers/bookingMapper');
const userBookingMapper = require('./helpers/clientMappers/userBookingMapper');
const isAuthorizated = require('./middlewares/isAuthorizated');
const isAdmin = require('./middlewares/isAdmin');

const app = express();

app.use(express.json());
app.use(
	express.urlencoded({
		extended: true,
	}),
);
app.use(cookieParser());

const port = 2000;

app.get('/logout', (req, res) => {
	res.cookie('token', '', { httpOnly: true, expires: new Date(0) });
	res.sendStatus(204);
});

app.post('/register', async (req, res) => {
	try {
		const { login, password, email, role } = req.body;
		const { user, token } = await registration(login, password, email, role);

		res.cookie('token', token, { httpOnly: true });
		res.status(200).send({ error: null, data: userMapper(user) });
	} catch (error) {
		res.status(500).send({ error: error.message });
	}
});

app.post('/authorize', async (req, res) => {
	try {
		const { login, password } = req.body;
		const { user, token } = await authorization(login, password);

		res.cookie('token', token, { httpOnly: true });
		res.status(200).send({ error: null, data: userMapper(user) });
	} catch (error) {
		res.status(500).send({ error: error.message, data: null });
	}
});

app.get('/rooms', async (req, res) => {
	try {
		const rooms = (await getRooms()).map((r) => roomMapper(r));

		res.status(200).send({ error: null, data: rooms });
	} catch (e) {
		res.status(500).send({ error: e.message, data: null });
	}
});

app.use(isAuthorizated);

app.get('/admin/bookings', isAdmin, async (req, res) => {
	try {
		const bookings = await getAllBookings();
		const mappedBookings = await Promise.all(bookings.map((b) => bookingMapper(b)));

		res.status(200).send({ error: null, data: mappedBookings });
	} catch (e) {
		res.status(500).send({ error: e.message, data: null });
	}
});

app.get('/user/bookings', async (req, res) => {
	try {
		const userId = req.user.id;
		const bookings = await getUserBookings(userId);
		const mappedBookings = await Promise.all(
			bookings.map((b) => userBookingMapper(b)),
		);

		res.status(200).send({ error: null, data: mappedBookings });
	} catch (e) {
		res.status(500).send({ error: e.message, data: null });
	}
});

app.post('/rooms/:id/booking', async (req, res) => {
	try {
		const roomId = req.params.id;
		const userId = req.user.id;

		if (!mongoose.Types.ObjectId.isValid(roomId)) {
			return res.status(400).send({ error: 'Invalid room ID', data: null });
		}

		const booking = await createBooking(req.body, roomId, userId);

		res.status(200).send({ error: null, data: booking });
	} catch (e) {
		res.status(500).send({ error: e.message, data: null });
	}
});

mongoose
	.connect(
		`mongodb+srv://nikitaumanskiy1998:1998Nikum@cluster0.mj3bt.mongodb.net/HOTEL?retryWrites=true&w=majority&appName=Cluster0`,
	)
	.then(() => {
		app.listen(port, () => {
			console.log(`Server was started on port:${port}`);
		});
	});
