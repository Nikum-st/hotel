const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
require('dotenv').config();
const registration = require('./controllers/user/registration');
const authorization = require('./controllers/user/authorization');
const userMapper = require('./helpers/mappers/userMapper');
const getRooms = require('./controllers/rooms/getRooms');

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
		const rooms = await getRooms();

		res.status(200).send({ error: null, data: rooms });
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
