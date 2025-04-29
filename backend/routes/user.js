const express = require('express');
const registration = require('../controllers/user/registration');
const authorization = require('../controllers/user/authorization');
const userMapper = require('../helpers/clientMappers/userMapper');

const router = express.Router({ mergeParams: true });

router.post('/logout', (req, res) => {
	res.cookie('token', '', { httpOnly: true, expires: new Date(0) });
	res.sendStatus(204);
});

router.post('/register', async (req, res) => {
	try {
		const { login, password, email, role } = req.body;
		const { user, token } = await registration(login, password, email, role);

		res.cookie('token', token, { httpOnly: true });
		return res.status(200).send({ error: null, data: userMapper(user) });
	} catch (error) {
		return res.send({ error: error.message });
	}
});

router.post('/authorize', async (req, res) => {
	try {
		const { login, password } = req.body;
		const { user, token } = await authorization(login, password);

		res.cookie('token', token, { httpOnly: true });
		return res.status(200).send({ error: null, data: userMapper(user) });
	} catch (error) {
		return res.send({ error: error.message, data: null });
	}
});

module.exports = router;
