import { sessions } from '../sessions';
import { getUser, getEmail, addUserToServer } from '../api';

export const registration = async (login, password, email) => {
	const extendedUser = await getUser(login);
	const extendedEmail = await getEmail(email);

	if (extendedUser) {
		return {
			error: 'Такой логин уже существует',
			res: null,
		};
	} else if (extendedEmail) {
		return {
			error: 'Такой email уже существует',
			res: null,
		};
	}

	const user = await addUserToServer(login, password, email);

	return {
		error: null,
		res: {
			id: user.id,
			login,
			session: sessions.create(user),
		},
	};
};
