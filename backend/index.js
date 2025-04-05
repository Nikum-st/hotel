require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const routes = require('./routes');

const uri = process.env.MONGODB_URI; // Получаем строку подключения из переменной окружения

if (!uri) {
	console.error('MONGODB_URI is not defined in .env');
	process.exit(1); // Останавливаем выполнение, если переменная не определена
}
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

mongoose.connect(process.env.MONGODB_URI).then(() => {
	app.listen(port, () => {
		console.log(`Server was started on port:${port}`);
	});
});
