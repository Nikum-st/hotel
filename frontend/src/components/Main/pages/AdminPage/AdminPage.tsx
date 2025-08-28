import { Info } from '../../../components';
import { ArchiveList } from './components/ArchiveList/ArchiveList';
import { UserList } from './components/UserList/UserList';
import { useSelector } from 'react-redux';
import { ROLE } from '../../../../constants';
import { useMatch } from 'react-router-dom';
import { RootState } from '../../../../store/store';
import { ActiveList } from './components/ActiveList/ActiveList';

export const AdminPage = () => {
	const role = useSelector((state: RootState) => state.user?.role);

	const isCurrentBookingsPage = useMatch('/admin/active-bookings');
	const isArchivePage = useMatch('/admin/archive');
	const isUsersPage = useMatch('/admin/users');
	const hasAccess = role === ROLE.ADMIN || role === ROLE.MANAGER;

	return hasAccess ? (
		<>
			{isCurrentBookingsPage && <ActiveList />}
			{isArchivePage && <ArchiveList />}
			{isUsersPage && <UserList />}
		</>
	) : (
		<Info style={{ fontSize: '25px', margin: 'auto' }}>Access denied!</Info>
	);
};
