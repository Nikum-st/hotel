import { Link } from 'react-router-dom';
import { Button, Icon, Wrapper } from '../../../../../components';
import { Info } from './components/Info/Info';
import styles from './RoomDetails.module.css';

export const RoomDetailsLayout = ({ room, errorFromServer, name, navigate }) => (
	<Wrapper error={errorFromServer}>
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
					<Info room={room}>
						<div className={styles.buttons}>
							<Link to={`/rooms/${name}/booking`}>
								<Button style={{ width: `40%` }}>Book</Button>
							</Link>
						</div>
					</Info>
				</div>
			</div>
		</div>
	</Wrapper>
);
