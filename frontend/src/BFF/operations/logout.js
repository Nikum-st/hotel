import { sessions } from '../sessions';

export const logOut = async (session) => {
	sessions.remove(session);
};
