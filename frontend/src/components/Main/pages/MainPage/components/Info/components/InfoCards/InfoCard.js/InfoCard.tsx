import { Icon } from '../../../../../../../../components';
import styles from './InfoCard.module.css';

type InfoCardProps = {
	color: string;
	text: string;
	idIcon: string;
	style: { backgroundColor: string };
};

export const InfoCard = ({ style, text, idIcon, color }: InfoCardProps) => {
	return (
		<div className={styles.infoCardContainer} style={style}>
			<Icon id={idIcon} size="50px" cursor="auto" color={color} />
			<h2 style={{ color: color }}>{text}</h2>
			<p style={{ color: color }}>
				Sample text. Lorem ipsum dolor sit amet, consectetur adipiscing elit
				nullam nunc justo sagittis suscipit ultrices
			</p>
		</div>
	);
};
