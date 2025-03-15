import { getData } from './get-data';

export const getUser = async (loginToFind) => {
	try {
		const users = await getData('users');
		if (!users) {
			return null;
		}
		return users.find(({ login }) => login === loginToFind);
	} catch (error) {
		return error;
	}
};
