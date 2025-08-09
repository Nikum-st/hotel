import { ROLE } from '../../../../../../../constants';
import { Icon } from '../../../../../../components';
import { useRequest } from '../../../../../../../hooks/useRequest';
import { userType } from '../../../../../../../types/userType';
import { useModal } from '../../../../../../components/Modal/ModalContext';

type UserRawProps = {
	user: userType;
	setUsers: React.Dispatch<React.SetStateAction<userType[]>>;
};

export const UserRaw = ({ user, setUsers }: UserRawProps) => {
	const { sendRequest } = useRequest();

	const { openModal } = useModal();

	const saveRoleForUser = async (event: React.ChangeEvent<HTMLSelectElement>) => {
		const newRole = event.target.value as 'user' | 'admin' | 'manager';
		openModal('save the new role for the user?', async () => {
			try {
				const data = await sendRequest(`/admin/users/${user.id}`, 'PATCH', {
					role: newRole,
				});
				if (data) {
					setUsers((prevUsers) =>
						prevUsers.map((u) => {
							if (u.id === user.id) {
								return { ...u, role: newRole };
							}
							return u;
						}),
					);
				}
			} catch (error) {
				console.error(error);
			}
		});
	};

	const deleteUser = async (userId: string) => {
		openModal('remove the user', async () => {
			try {
				const data: userType = await sendRequest(
					`/admin/users/${userId}`,
					'DELETE',
				);
				if (data) {
					setUsers((prevUsers) =>
						prevUsers.filter((user) => userId !== user.id),
					);
				}
			} catch (error) {
				console.error(error);
			}
		});
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
