require('dotenv').config();
const path = require("path")
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
app.use('/uploads', express.static('uploads'));
app.use(express.static(path.join(__dirname, '../frontend/build')));

const port = 2050;

app.use('/api', routes);
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

mongoose.connect(process.env.MONGODB_URI).then(() => {
	app.listen(port, () => {
		console.log(`Server was started on port:${port}`);
	});
})