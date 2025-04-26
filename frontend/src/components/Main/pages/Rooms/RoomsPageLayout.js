import { Wrapper } from '../../../components';
import { RoomCard } from './components/RoomCart/RoomCard';
import styles from './Rooms.module.css';

export const RoomsPageLayout = ({ errorFromServer, rooms }) => (
	<Wrapper error={errorFromServer}>
		<div className={styles.content}>
			<div className={styles.containerRooms}>
				{rooms.map((room) => (
					<RoomCard {...room} key={room.id} />
				))}
			</div>
		</div>
	</Wrapper>
);
