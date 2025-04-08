import { loading, selectLoading, selectRooms, setRooms } from '../../../../store';
import styles from './Rooms.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Loader, Info } from '../../../components';
import { request } from '../../../../utils/request';

export const RoomsPage = () => {
	const rooms = useSelector(selectRooms);
	const isLoading = useSelector(selectLoading);
	const dispatch = useDispatch();
	const [errorFromServer, setErrorFromServer] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				window.scrollTo(0, 0);
				dispatch(loading(true));

				if (!rooms.length) {
					const { error, data } = await request('/rooms');
					if (error) {
						setErrorFromServer('Error from server. Please try again later');
					} else {
						dispatch(setRooms(data));
					}
				}
			} catch (e) {
				setErrorFromServer('Unexpected error. Please try again later');
			} finally {
				dispatch(loading(false));
			}
		};

		fetchData();
	}, [dispatch, rooms.length]);

	return isLoading ? (
		<Loader />
	) : errorFromServer ? (
		<Info>{errorFromServer}</Info>
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
