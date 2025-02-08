import { Link, useNavigate } from 'react-router-dom';
import styles from './ControlPanel.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../../../../store';
import { Authenticated } from './components/Authenticated';

export const ControlPanel = () => {
	const isAuthenticated = useSelector(selectIsAuthenticated);

	return isAuthenticated ? (
		<Authenticated />
	) : (
		<div className={styles.controlPanel}>
			<Link to="/authorize">
				<button>Войти</button>
			</Link>
			<Link to="/register">
				<button>Зарегестрироваться</button>
			</Link>
		</div>
	);
};
