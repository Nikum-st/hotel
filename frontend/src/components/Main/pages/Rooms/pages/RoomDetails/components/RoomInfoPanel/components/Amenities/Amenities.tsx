import { roomType } from '../../../../../../../../../../types/roomType';
import styles from './Amenities.module.css';

export const Amenities = ({ room }: { room: roomType }) => (
	<ul className={styles.amenities}>
		{room.amenities?.map((amenity, index) => <li key={index}>{amenity}</li>)}
	</ul>
);
