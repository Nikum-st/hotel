import { sessions } from '../sessions';
import { getUser } from '../api/get-user';

export const authorization = async (login, password) => {
	const user = await getUser(login);

	if (!user) {
		return {
			error: 'Такого пользователя не существует',
			res: null,
		};
	}

	if (user.password !== password) {
		return {
			error: 'Неверный пароль',
			res: null,
		};
	}

	return {
		error: null,
		res: {
			id: user.id,
			login,
			role: user.role,
			session: sessions.create(user),
		},
	};
};
