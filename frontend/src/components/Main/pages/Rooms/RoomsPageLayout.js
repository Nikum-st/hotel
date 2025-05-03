import { Wrapper } from '../../../components';
import { Pagination } from './components/Pagination/Pagination';
import { RoomCard } from './components/RoomCard/RoomCard';
import styles from './Rooms.module.css';

export const RoomsPageLayout = ({ errorFromServer, rooms }) => (
	<Wrapper alwaysAccess={true} error={errorFromServer}>
		<div className={styles.content}>
			<div className={styles.containerRooms}>
				{rooms.map((room) => (
					<RoomCard {...room} key={room.id} />
				))}
			</div>
		</div>
		<Pagination />
	</Wrapper>
);
