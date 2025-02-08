import { selectLoading, selectRooms } from '../../../../store';
import styles from './Rooms.module.css';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useFetchRooms } from '../../../../hooks';
import { Loader } from '../../../components/Loader/Loader';

export const Rooms = () => {
	const rooms = useSelector(selectRooms);
	const fetchRooms = useFetchRooms();
	const isLoading = useSelector(selectLoading);

	useEffect(() => {
		window.scrollTo(0, 0);
		if (!rooms.length) {
			fetchRooms();
		}
	}, [rooms.length]);

	return isLoading ? (
		<Loader />
	) : (
		<div className={styles.content}>
			<div className={styles.containerRooms}>
				{rooms.map(({ id, img, name }) => (
					<div className={styles.room} key={id}>
						<Link to={`/rooms/${name}`}>
							<img src={img} alt={name} />
						</Link>
					</div>
				))}
			</div>
		</div>
	);
};
