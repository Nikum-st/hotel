const SECRET = process.env.SECRET;
const jwt = require('jsonwebtoken');

module.exports = {
	create: (id) => jwt.sign(id, SECRET, { expiresIn: '10d' }),
	verify: (id) => jwt.verify(id, SECRET),
};
