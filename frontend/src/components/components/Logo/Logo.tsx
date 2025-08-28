import { Link } from 'react-router-dom';
import styles from './Logo.module.css';

export const Logo = () => {
	return (
		<Link to="/">
			<div className={styles.logoContainer}>
				<div className={styles.logo}>GL</div>
				<div className={styles.textHotel}>HOTEL</div>
			</div>
		</Link>
	);
};
