import { Icon, Wrapper } from '../../../../../components';
import { RoomInfoPanel } from './components/RoomInfoPanel/RoomInfoPanel';
import styles from './RoomDetails.module.css';

export const RoomDetailsLayout = ({ room, errorFromServer, navigate, isEditing }) => (
	<Wrapper alwaysAccess={true} error={errorFromServer}>
		<div className={styles.content}>
			<div className={styles.highPanel}>
				<div className={styles.icon}>
					<Icon
						onClick={() => navigate('/rooms')}
						size={'20px'}
						id={'fa-chevron-left'}
						title="back"
					/>
				</div>
				<h1 className={styles.name}>{room?.name}</h1>
			</div>

			<div>
				<div className={styles.containerDetails}>
					<img src={room?.img} alt={room?.name} />
					<div
						className={styles.infoContainer}
						style={isEditing && { gap: '0px' }}
					>
						<RoomInfoPanel room={room} />
					</div>
				</div>
			</div>
		</div>
	</Wrapper>
);
