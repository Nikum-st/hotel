import { InfoCards } from './components/InfoCards/InfoCards';
import { InfoField } from './components/InfoField/InfoField';
import styles from './Info.module.css';

export const Info = () => {
	return (
		<div className={styles.infoContainer}>
			<InfoCards />
			<InfoField />
		</div>
	);
};
