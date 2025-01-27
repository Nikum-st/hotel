import { Link } from 'react-router-dom';
import styles from './ControlPanel.module.css';

export const ControlPanel = () => {
	return (
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
