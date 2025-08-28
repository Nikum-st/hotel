import { ControlPanel } from './components/ControlPanel/ControlPanel';
import { Logo } from '../components/Logo/Logo';
import styles from './Header.module.css';

export const Header = () => {
	return (
		<header className={styles.header}>
			<Logo />
			<ControlPanel />
		</header>
	);
};
