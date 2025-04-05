const token = require('../helpers/token');
const User = require('../models/user');

module.exports = async function (req, res, next) {
	const tokenFromCookie = req.cookies.token;

	if (!tokenFromCookie) {
		return res.status(401).send({ error: 'User is not authorized' });
	}

	let tokenData;
	try {
		tokenData = await token.verify(tokenFromCookie);
	} catch (err) {
		return res.status(401).send({ error: 'Invalid or expired token' });
	}

	const user = await User.findOne({ _id: tokenData.id });
	if (!user) {
		return res.status(401).send({ error: 'User not found' });
	}

	req.user = user;
	next();
};
