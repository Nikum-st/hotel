import { Link } from 'react-router-dom';
import styles from './ControlPanel.module.css';
import { useSelector } from 'react-redux';
import { Authenticated } from './components/Authenticated';
import { Icon } from '../../../components/Icon/Icon';
import { RootState } from '../../../../store/store';

export const ControlPanel = () => {
	const isAuthenticated = useSelector((state: RootState) => state.app.isAuthenticated);

	return isAuthenticated ? (
		<Authenticated />
	) : (
		<div className={styles.controlPanel}>
			<Link to="/rooms">
				<Icon size={'30px'} id={'fa fa-bed'} title="All rooms" />
			</Link>
			<Link to="/authorize">
				<button>Log in</button>
			</Link>
			<Link to="/register">
				<button>Sign Up</button>
			</Link>
		</div>
	);
};
