require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(
	express.urlencoded({
		extended: true,
	}),
);
app.use(cookieParser());

const port = 2000;

app.use((req, res, next) => {
	if (mongoose.connection.readyState !== 1) {
		return res.status(500).send({ error: 'Database connection lost' });
	}
	next();
});

app.use('/api', routes);

mongoose
	.connect(
		`mongodb+srv://nikitaumanskiy1998:1998Nikum@cluster0.mj3bt.mongodb.net/HOTEL?retryWrites=true&w=majority&appName=Cluster0`,
	)
	.then(() => {
		app.listen(port, () => {
			console.log(`Server was started on port:${port}`);
		});
	});
