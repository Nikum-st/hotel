import { addUserToServer } from '../api/add-user-to-server';
import { sessions } from '../sessions';
import { getUser } from '../api/get-user';

export const registration = async (login, password, email) => {
	const extendedUser = await getUser(login);

	if (extendedUser) {
		return {
			error: 'Такой логин уже существует.Придумайте другой',
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
