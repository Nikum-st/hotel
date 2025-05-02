import { useRef, useState } from 'react';
import { Button, Input, Loader } from '../../../../../components';
import { handleOpenList } from '../services/hundleOpenList';
import styles from './UserList.module.css';
import { Thead } from './components/Thead';
import { UserRaw } from './components/UserRaw';

export const UserList = () => {
	const [userListIsOpen, setUsersListIsOpen] = useState(false);
	const [loadingUsers, setLoadingUsers] = useState(false);
	const [users, setUsers] = useState([]);
	const [searchUsers, setSearchUsers] = useState('');
	const usersRef = useRef(null);

	const filteredUsers =
		users?.filter((users) =>
			users.login?.toLowerCase().includes(searchUsers?.toLowerCase()),
		) || [];

	return (
		<div className={styles.userList}>
			<Button
				style={{ margin: '40px' }}
				onClick={() =>
					handleOpenList(
						userListIsOpen,
						setUsersListIsOpen,
						setLoadingUsers,
						setUsers,
						usersRef,
						'/admin/users',
					)
				}
			>
				Users list
			</Button>
			{userListIsOpen &&
				(loadingUsers ? (
					<Loader />
				) : (
					<div className={styles.userList}>
						<Input
							type="text"
							placeholder="Search by login"
							value={searchUsers}
							style={{ margin: '20px', width: '300px' }}
							onChange={(e) => setSearchUsers(e.target.value)}
						/>
						<table ref={usersRef} className={styles.table}>
							<Thead />
							<tbody>
								{filteredUsers.map((user) => (
									<UserRaw
										users={users}
										setUsers={setUsers}
										key={user.id}
										user={user}
									/>
								))}
							</tbody>
						</table>
					</div>
				))}
		</div>
	);
};
