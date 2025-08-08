import { Link } from 'react-router-dom';
import styles from './RoomCard.module.css';
import { roomType } from '../../../../../../types/roomType';

export const RoomCard = ({
	id,
	img,
	name,
	price,
	shortDescription,
	category,
	beds,
}: roomType) => (
	<div className={styles.room} key={id}>
		<Link to={`/rooms/${name}`}>
			<img src={img} alt={name} />
			<div className={styles.infoRoom}>
				<div className={styles.price}>${price}</div>
				<div>Description: {shortDescription}</div>
				<div>Category: {category}</div>
				<div>Beds: {beds}</div>
			</div>
		</Link>
	</div>
);
