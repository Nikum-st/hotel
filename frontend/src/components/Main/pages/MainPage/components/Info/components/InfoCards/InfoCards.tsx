import { InfoCard } from './InfoCard.js/InfoCard';
import styles from './InfoCards.module.css';

export const InfoCards = () => {
	return (
		<div className={styles.infoCards}>
			<InfoCard
				idIcon="fa-trophy"
				text="Award Winning Customer Satisfaction"
				color="white"
				style={{ backgroundColor: '#8f7e6d' }}
			></InfoCard>
			<InfoCard
				color="#0b0e14"
				idIcon="fa-heart-o"
				text="We put our heart and soul into everything we do"
				style={{ backgroundColor: '#d0c2b4' }}
			></InfoCard>
			<InfoCard
				color="#0b0e14"
				idIcon="fa-coffee"
				text="The comfort we offer has no limits"
				style={{ backgroundColor: '#e4e2e0' }}
			></InfoCard>
		</div>
	);
};
