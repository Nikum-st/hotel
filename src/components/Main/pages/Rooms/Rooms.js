import { selectRooms } from '../../../../store';
import styles from './Rooms.module.css';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

export const Rooms = () => {
	const rooms = useSelector(selectRooms);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<div className={styles.content}>
			{' '}
			<div className={styles.containerRooms}>
				{rooms.map(({ id, img, name }) => (
					<div className={styles.room} key={id}>
						<Link to={`room/${id}`}>
							<img src={img} alt={name} />
						</Link>
					</div>
				))}
			</div>
		</div>
	);
};
