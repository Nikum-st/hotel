import { Link } from 'react-router-dom';
import styles from './ControlPanel.module.css';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../../../../store';
import { Authenticated } from './components/Authenticated';
import { Icon } from '../../../components/Icon/Icon';

export const ControlPanel = () => {
	const isAuthenticated = useSelector(selectIsAuthenticated);

	return isAuthenticated ? (
		<Authenticated />
	) : (
		<div className={styles.controlPanel}>
			<Link to="/rooms">
				<Icon size={'30px'} id={'fa fa-bed'} title="All rooms" />
			</Link>
			<Link to="/authorize">
				<button>Log In</button>
			</Link>
			<Link to="/register">
				<button>Sign Up</button>
			</Link>
		</div>
	);
};
