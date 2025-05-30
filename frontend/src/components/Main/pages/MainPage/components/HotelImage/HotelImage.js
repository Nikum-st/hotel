import styles from './HotelImage.module.css';

export const HotelImage = () => {
	return (
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
		</div>
	);
};
