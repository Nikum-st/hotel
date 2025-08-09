import { roomType } from '../../../../types/roomType';
import { Wrapper } from '../../../components';
import { Pagination } from './components/Pagination/Pagination';
import { RoomCard } from './components/RoomCard/RoomCard';
import styles from './Rooms.module.css';

type TRoomsPageProps = {
	errorFromServer: string | null;
	rooms: roomType[];
};

export const RoomsPageLayout = ({ errorFromServer, rooms }: TRoomsPageProps) => (
	<Wrapper error={errorFromServer}>
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
