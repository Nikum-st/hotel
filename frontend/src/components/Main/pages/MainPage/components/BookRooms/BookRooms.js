import { Button } from '../../../../../components';
import styles from './BookRooms.module.css';
import { Link } from 'react-router-dom';

export const BookRooms = () => (
	<div className={styles.bookRoomContainer}>
		<div className={styles.textBookRoom}>
			Can't take your eyes off us? <br /> Book a room!
		</div>
		<Link to="/rooms">
			<Button
				style={{
					border: 'none',
				}}
			>
				Available rooms
			</Button>
		</Link>
	</div>
);
