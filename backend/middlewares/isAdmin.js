module.exports = async function (req, res, next) {
	const role = req.user.role;

	if (!role) {
		return res.status(401).send({ error: 'User is not authorized' });
	}

	if (role === 'user') {
		return res.status(403).send({ error: 'Access denied' });
	}

	next();
};
