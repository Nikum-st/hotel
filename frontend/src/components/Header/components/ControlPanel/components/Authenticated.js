import { Link, useNavigate } from 'react-router-dom';
import styles from './Authenticated.module.css';
import { Icon } from '../../../../components/Icon/Icon';
import { useDispatch, useSelector } from 'react-redux';
import { loading, logOut, selectLogin, selectRole } from '../../../../../store';

export const Authenticated = () => {
	const login = useSelector(selectLogin);
	const role = useSelector(selectRole);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleLogOut = async () => {
		dispatch(loading(true));
		await fetch('/logout', { method: 'POST' }).finally(() => {
			dispatch(loading(false));
		});
		dispatch(logOut);
		navigate('/');
	};

	return (
		<div className={styles.controlPanel}>
			<div className={styles.login}>{login}</div>
			{role === 'admin' && (
				<Link to="/admin">
					<Icon
						size={'30px'}
						id={'fa-user-secret'}
						title="Admin page
"
					/>
				</Link>
			)}
			<Link to="/bookings">
				<Icon size={'30px'} id={'fa-calendar-check-o'} title="My rooms" />
			</Link>
			<Link to="/rooms">
				<Icon size={'30px'} id={'fa fa-bed'} title="Book" />
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
