import { FeatureCard } from './components/FeatureCard';
import styles from './WeAreTheBestHotel.module.css';

export const WeAreTheBestHotel = () => (
	<div className={styles.container}>
		<h2>Find out what makes us the best hotel</h2>
		<div className={styles.featureCards}>
			<FeatureCard idIcon="fa-cutlery" />
			<FeatureCard idIcon="fa-briefcase" />
			<FeatureCard idIcon="fa-bed" />
			<FeatureCard idIcon="fa-medkit" />
			<FeatureCard idIcon="fa-address-card" />
			<FeatureCard idIcon="fa-map" />
		</div>
	</div>
);
