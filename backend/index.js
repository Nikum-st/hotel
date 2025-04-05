const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());
app.use(
	express.urlencoded({
		extended: true,
	}),
);
app.use(cookieParser());

const port = 2000;

app.get('/author', (req, res) => {});

mongoose
	.connect(
		`mongodb+srv://nikitaumanskiy1998:1998Nikum@cluster0.mj3bt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,
	)
	.then(() => {
		app.listen(port, () => {
			console.log(`Server was started on port:${port}`);
		});
	});
