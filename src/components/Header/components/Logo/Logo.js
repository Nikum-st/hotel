import { Link } from 'react-router-dom';
import styles from './Logo.module.css';

export const Logo = () => {
	return (
		<div className={styles.logoContainer}>
			<Link to="/">
				<div className={styles.logo}>GL</div>
			</Link>
			<div className={styles.textHotel}>HOTEL</div>
		</div>
	);
};
