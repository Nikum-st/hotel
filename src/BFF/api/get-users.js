import { getData } from './get-dates';

export const getUsers = async () => {
	try {
		const users = await getData('users');
		if (!users) {
			return null;
		}
		return users.map((user) => ({
			id: user.id,
			login: user.login,
			email: user.email,
			roleId: user.role_id,
			password: user.password,
			registredAt: user.registred_at,
		}));
	} catch {
		return null;
	}
};
