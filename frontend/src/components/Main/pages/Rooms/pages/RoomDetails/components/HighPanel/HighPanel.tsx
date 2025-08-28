import { useNavigate } from 'react-router-dom';
import { Icon } from '../../../../../../../components';
import { useSelector } from 'react-redux';
import styles from './HighPanel.module.css';
import { RootState } from '../../../../../../../../store/store';

export const HighPanel = () => {
	const room = useSelector((state: RootState) => state.room);
	const navigate = useNavigate();
	return (
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
	);
};
