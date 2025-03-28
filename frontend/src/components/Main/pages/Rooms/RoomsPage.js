import { selectLoading, selectRooms } from '../../../../store';
import styles from './Rooms.module.css';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useFetchRooms } from '../../../../hooks';
import { Loader } from '../../../components/Loader/Loader';

export const RoomsPage = () => {
	const rooms = useSelector(selectRooms);
	const fetchRooms = useFetchRooms();
	const isLoading = useSelector(selectLoading);

	useEffect(() => {
		window.scrollTo(0, 0);
		if (!rooms.length) {
			fetchRooms();
		}
	}, [rooms.length, fetchRooms]);

	return isLoading ? (
		<Loader />
	) : (
		<div className={styles.content}>
			<div className={styles.containerRooms}>
				{rooms.map(
					({ id, img, name, price, shortDescription, category, beds }) => (
						<div className={styles.room} key={id}>
							<Link to={`/rooms/${name}`}>
								<img src={img} alt={name} />
								<div className={styles.infoRoom}>
									<div className={styles.price}>${price}</div>
									<div>Description: {shortDescription}</div>
									<div>Category: {category}</div>
									<div>Beds: {beds}</div>
								</div>
							</Link>
						</div>
					),
				)}
			</div>
		</div>
	);
};
