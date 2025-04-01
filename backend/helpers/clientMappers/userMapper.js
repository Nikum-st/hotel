module.exports = function (user) {
	return {
		login: user.login,
		email: user.email,
		role: user.role,
		id: user.id,
	};
};
