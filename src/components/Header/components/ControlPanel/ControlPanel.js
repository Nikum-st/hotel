import { Link } from 'react-router-dom';
import styles from './ControlPanel.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
	logOut,
	selectIsAuthenticated,
	selectLogin,
	selectRole,
} from '../../../../store';
import { Icon } from '../../../components/Icon/Icon';

export const ControlPanel = () => {
	const isAuthenticated = useSelector(selectIsAuthenticated);
	const login = useSelector(selectLogin);
	const role = useSelector(selectRole);

	const dispatch = useDispatch();

	return isAuthenticated ? (
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
				<Icon size={'30px'} id={'fa-sign-out'} onClick={() => dispatch(logOut)} />
				<div className={styles.textDescription}>Выйти</div>
			</div>
		</div>
	) : (
		<div className={styles.controlPanel}>
			<Link to="/authorize">
				<button width="auto">Войти</button>
			</Link>
			<Link to="/register">
				<button width="auto">Зарегестрироваться</button>
			</Link>
		</div>
	);
};
