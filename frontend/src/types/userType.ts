export interface userType {
	login: string;
	email: string;
	role: 'admin' | 'manager' | 'user';
	id: string;
}
