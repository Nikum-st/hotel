import { useState } from 'react';
import { ROLE } from '../../../../../../../constants';
import { Icon } from '../../../../../../components';
import { useDispatch } from 'react-redux';
import { CLOSE_MODAL, openModal } from '../../../../../../../store';
import { useRequest } from '../../../../../../../hooks/useRequest';

export const UserRaw = ({ user, setUsers }) => {

	const dispatch = useDispatch();
	const { sendRequest } = useRequest();

	const saveRoleForUser = async ({ target }) => {
		const newRole = target.value;

		dispatch(
			openModal({
				text: 'save the new role for the user?',
				onConfirmModal: async () => {
					try {
						const data = await sendRequest(
							`/admin/users/${user.id}`,
							'PATCH',
							{ role: newRole },
						);
						if (data) {
							dispatch(CLOSE_MODAL);
							setUsers((prevUsers) =>
								prevUsers.map((u) => {
									if (u.id === user.id) {
										console.log('updating user:', u);
										return { ...u, role: newRole };
									}
									return u;
								}),
							);

						
						}
					} catch (error) {
						dispatch(CLOSE_MODAL);
						console.error(error);
					}
				},
			}),
		);
	};

	const deleteUser = async (userId) => {
		dispatch(
			openModal({
				text: 'remove the user',
				onConfirmModal: async () => {
					try {
						const data = sendRequest(`/admin/users/${userId}`, 'DELETE');
						if (data) {
							setUsers((prevUsers) =>
								prevUsers.filter((user) => userId !== user.id),
							);
						}
					} catch (error) {
						console.error(error);
					}
					dispatch(CLOSE_MODAL);
				},
			}),
		);
	};

	return (
		<>
			<tr key={user.id}>
				<td>{user.login}</td>
				<td>{user.email}</td>
				<td>
					<select value={user.role} onChange={saveRoleForUser}>
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
