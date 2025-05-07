import { Link, useNavigate } from 'react-router-dom';
import styles from './Authenticated.module.css';
import { Icon } from '../../../../components/Icon/Icon';
import { useDispatch, useSelector } from 'react-redux';
import {
	CLOSE_MODAL,
	loading,
	logOut,
	openModal,
	selectLogin,
	selectRole,
} from '../../../../../store';
import { ROLE } from '../../../../../constants';

export const Authenticated = () => {
	const login = useSelector(selectLogin);
	const role = useSelector(selectRole);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleLogOut = async () => {
		dispatch(
			openModal({
				text: 'log out?',
				onConfirmModal: async () => {
					dispatch(loading(true));
					await fetch('/logout', { method: 'POST' }).finally(() => {
						dispatch(loading(false));
					});
					dispatch(logOut);
					dispatch(CLOSE_MODAL);
					navigate('/');
				},
			}),
		);
	};

	return (
		<div className={styles.controlPanel}>
			<div className={styles.login}>{login}</div>
			{(role === ROLE.ADMIN || role === ROLE.MANAGER) && (
				<Link to="/admin/current-bookings">
					<Icon size="30px" id="fa-list-alt" title="Current bookings" />
				</Link>
			)}
			{role === ROLE.ADMIN && (
				<>
					<Link to="/admin/archive">
						<Icon size="30px" id="fa-archive" title="Archive bookings" />
					</Link>
					<Link to="/admin/users">
						<Icon size="30px" id="fa-users" title="Users" />
					</Link>
				</>
			)}
			{role === ROLE.USER && (
				<Link to="/bookings">
					<Icon size="30px" id="fa-calendar-check-o" title="My bookings" />
				</Link>
			)}

			<Link to="/rooms">
				<Icon size={'30px'} id={'fa fa-bed'} title="All rooms" />
			</Link>
			<div className={styles.containerIconLogOut}>
				<Icon
					size={'30px'}
					id={'fa-sign-out'}
					onClick={() => handleLogOut(logOut)}
				/>
				<div className={styles.textDescription}>Log out</div>
			</div>
		</div>
	);
};
