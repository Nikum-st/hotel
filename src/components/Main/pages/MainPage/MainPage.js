import styles from './MainPage.module.css';
import { Button } from '../../../components';
import { Link } from 'react-router-dom';

export const MainPage = () => {
	return (
		<>
			{' '}
			<div className={styles.imageContainer}>
				<img
					src="/img/post_3998.jpg"
					alt="Hotel Img Background"
					className={styles.backgroundImage}
				/>
				<div className={styles.logoContainer}>
					<h1 className={styles.hotelName}>GRAND LOTUS</h1>
					<h2>HOTEL</h2>
				</div>
				<Link to="/rooms">
					<Button
						style={{
							position: 'absolute',
							top: '70%',
							left: '40%',
							padding: '20px',
						}}
					>
						Available rooms
					</Button>
				</Link>
			</div>
		</>
	);
};
