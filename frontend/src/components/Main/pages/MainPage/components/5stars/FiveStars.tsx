import styles from './FiveStars.module.css';

export const FiveStars = () => {
	return (
		<div className={styles.fiveStarsContainer}>
			<img
				src="/img/fonstola.ru_142327.jpg"
				alt="5 stars Img Background"
				className={styles.backgroundImage}
			/>
			<div className={styles.textBox}>
				<h2>Luxury</h2>
				<img src="/img/e3da8b3ef35c86ff76b148a6ee88a1c5.png" alt="five stars" />
				<p>
					Whether you're seeking the refined luxury of a five-star resort, the
					elegance of a boutique hotel, or first-class comfort in the heart of
					the city — we have the perfect stay for you.
				</p>
			</div>
		</div>
	);
};
