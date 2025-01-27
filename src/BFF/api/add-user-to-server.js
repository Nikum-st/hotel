import { generateDate } from '../utils/generate-date';

export const addUserToServer = (login, password, email) =>
	fetch(`http://localhost:3005/users`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json;charset=utf-8' },
		body: JSON.stringify({
			login,
			password,
			email,
			registred_at: generateDate,
		}),
	}).then((createdUser) => createdUser.json());
