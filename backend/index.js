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

app.use('/api', routes);

mongoose.connect(process.env.MONGODB_URI).then(() => {
	app.listen(port, () => {
		console.log(`Server was started on port:${port}`);
	});
});
