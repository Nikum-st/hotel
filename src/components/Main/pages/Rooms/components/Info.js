import { Button } from '../../../../components/Button/Button';
import styles from './Info.module.css';

export const Info = ({ room }) => {
	return (
		<div className={styles.infoContainer}>
			<div className={styles.shortDescription}>{room.shortDescription}</div>
			<div className={styles.category}>Категория: {room.category}</div>
			<div className={styles.size}>Размер: {room.size} кв.м</div>
			<div className={styles.beds}>Кровати: {room.beds}</div>
			<div className={styles.description}>{room.description}</div>
			<ul className={styles.amenities}>
				{room.amenities.map((amenity, index) => (
					<li key={index}>{amenity}</li>
				))}
			</ul>
			<div className={styles.bookingSection}>
				<div className={styles.price}>Цена: ${room.price}</div>
				<Button>Забронировать</Button>
			</div>
		</div>
	);
};
