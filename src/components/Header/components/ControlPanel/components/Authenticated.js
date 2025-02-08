import { Link, useNavigate } from 'react-router-dom';
import styles from './Authenticated.module.css';
import { Icon } from '../../../../components/Icon/Icon';
import { useDispatch, useSelector } from 'react-redux';
import { logOut, selectLogin, selectRole } from '../../../../../store';

export const Authenticated = () => {
	const login = useSelector(selectLogin);
	const role = useSelector(selectRole);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	return (
		<div className={styles.controlPanel}>
			<div className={styles.login}>{login}</div>
			{role === 'admin' && (
				<Link to="/admin">
					<Icon size={'30px'} id={'fa-user-secret'} title="Админ страница" />
				</Link>
			)}
			<Link to="/bookings">
				<Icon size={'30px'} id={'fa-calendar-check-o'} title="Мои номера" />
			</Link>
			<Link to="/rooms">
				<Icon size={'30px'} id={'fa fa-bed'} title="Забронировать" />
			</Link>
			<div className={styles.containerIcon}>
				<Icon
					size={'30px'}
					id={'fa-sign-out'}
					onClick={() => {
						dispatch(logOut);
						navigate('/');
					}}
				/>
				<div className={styles.textDescription}>Выйти</div>
			</div>
		</div>
	);
};
