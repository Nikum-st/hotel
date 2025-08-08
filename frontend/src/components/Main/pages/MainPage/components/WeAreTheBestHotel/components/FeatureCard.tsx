import { Icon } from '../../../../../../components/Icon/Icon';
import styles from './FeatureCard.module.css';

export const FeatureCard = ({ idIcon }: { idIcon: string }) => (
	<div className={styles.featureCard}>
		<Icon cursor="auto" color="black" id={idIcon} size="50px" margin="30px" />
		<p>
			Sample text. Lorem ipsum dolor sit amet, consectetur adipiscing elit nullam
			nunc justo sagittis suscipit ultrices.
		</p>
	</div>
);
