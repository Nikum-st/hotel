import { useState } from 'react';
import { ROLE } from '../../../../../../../constants';
import { Icon } from '../../../../../../components';

export const UserRaw = ({ user, setUsers }) => {
	const [selectedUserRole, setSelectedUserRole] = useState(user.role);

	const saveRoleForUser = async ({ target }) => {
		try {
			const newRole = target.value;
			const response = await fetch(`/admin/users/${user.id}`, {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json;charset=utf-8' },
				body: JSON.stringify({
					role: newRole,
				}),
			});
			const result = await response.json();
			if (result.error) {
				console.error(result.error);
			} else if (result.data) {
				setSelectedUserRole(newRole);
			}
		} catch (error) {
			console.error(error);
		}
	};

	const deleteUser = async (userId) => {
		try {
			const response = await fetch(`/admin/users/${userId}`, { method: 'DELETE' });
			const result = await response.json();
			if (result.error) {
				console.error(result.error);
			} else if (result.data) {
				setUsers((prevUsers) => prevUsers.filter((user) => userId !== user.id));
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			<tr key={user.id}>
				<td>{user.login}</td>
				<td>{user.email}</td>
				<td>
					<select defaultValue={selectedUserRole} onChange={saveRoleForUser}>
						<option value={ROLE.ADMIN}>{ROLE.ADMIN}</option>
						<option value={ROLE.MANAGER}>{ROLE.MANAGER}</option>
						<option value={ROLE.USER}>{ROLE.USER}</option>
					</select>
				</td>
				<td>
					<Icon
						onClick={() => deleteUser(user.id)}
						id="fa-trash"
						size="20px"
						color="red"
					/>
				</td>
			</tr>
		</>
	);
};
