import { sessions } from '../sessions';

export const accessAdmin = async (session) => {
	sessions.access(session);
};
