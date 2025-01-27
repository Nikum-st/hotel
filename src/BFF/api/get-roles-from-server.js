import { getData } from './get-dates';

export const getRolesFromServer = async () => {
	try {
		const roles = await getData('roles');
		if (!roles) {
			return null;
		}
		return roles;
	} catch {
		return null;
	}
};
