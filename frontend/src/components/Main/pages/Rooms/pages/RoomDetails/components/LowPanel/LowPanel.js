import { useSelector } from 'react-redux';
import { selectRoom } from '../../../../../../../../store';
import { useMatch } from 'react-router-dom';
import { RoomInfoPanel } from '../RoomInfoPanel/RoomInfoPanel';
import styles from './LowPanel.module.css';

export const LowPanel = () => {
	const room = useSelector(selectRoom);
	const isEditing = useMatch('/rooms/:name/edit');
	return (
		<div>
			<div className={styles.containerDetails}>
				<img src={room?.img} alt={room?.name} />
				<div className={styles.infoContainer} style={isEditing && { gap: '0px' }}>
					<RoomInfoPanel room={room} />
				</div>
			</div>
		</div>
	);
};
