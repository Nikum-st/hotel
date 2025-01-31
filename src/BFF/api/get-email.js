import { getData } from './get-dates';

export const getEmail = async (emailToFind) => {
	try {
		const users = await getData('users');
		if (!users) {
			return null;
		}
		return users.find(({ email }) => email === emailToFind);
	} catch (error) {
		return error;
	}
};
