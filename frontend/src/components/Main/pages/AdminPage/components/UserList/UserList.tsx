import { useEffect, useRef, useState } from 'react';
import { Input, Wrapper } from '../../../../../components';
import styles from './UserList.module.css';
import { Thead } from './components/Thead';
import { UserRaw } from './components/UserRaw';
import { useRequest } from '../../../../../../hooks/useRequest';
import { userType } from '../../../../../../types/userType';

export const UserList = () => {
	const [users, setUsers] = useState<userType[]>([]);
	const [searchUsers, setSearchUsers] = useState('');
	const usersRef = useRef(null);
	const { sendRequest, error } = useRequest();

	useEffect(() => {
		window.scrollTo(0, 0);

		const fetchUsers = async () => {
			const users = await sendRequest('/admin/users');

			setUsers(users);
		};

		fetchUsers();
	}, [sendRequest]);

	const filteredUsers =
		users?.filter((user) =>
			user.login?.toLowerCase().includes(searchUsers?.toLowerCase()),
		) || [];

	return (
		<Wrapper error={error}>
			<div className={styles.userList}>
				<div className={styles.userList}>
					<Input
						type="text"
						placeholder="Search by login"
						value={searchUsers}
						style={{ margin: '20px', width: '300PX' }}
						onChange={(e) => setSearchUsers(e.target.value)}
					/>
					<table ref={usersRef} className={styles.table}>
						<Thead />
						<tbody>
							{filteredUsers.map((user) => (
								<UserRaw setUsers={setUsers} key={user.id} user={user} />
							))}
						</tbody>
					</table>
				</div>
			</div>
		</Wrapper>
	);
};
