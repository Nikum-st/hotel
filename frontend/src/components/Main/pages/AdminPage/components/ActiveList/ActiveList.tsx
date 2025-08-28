import { useEffect, useState } from 'react';
import { Bookings } from '../Bookings/Bookings';
import styles from './ActiveList.module.css';
import { bookingType } from '../../../../../../types/bookingsType';
import { useRequest } from '../../../../../../hooks';
import { IconDelete, Wrapper } from '../../../../../components';

export const ActiveList = () => {
	const [searchActive, setSearchActive] = useState('');
	const [activeBookings, setActiveBookings] = useState<bookingType[]>([]);

	const { sendRequest, error } = useRequest();

	useEffect(() => {
		window.scrollTo(0, 0);

		const fetchBookings = async () => {
			const bookings = await sendRequest('/admin/bookings');
			setActiveBookings(bookings);
		};

		fetchBookings();
	}, [sendRequest]);

	const bookingsProps = {
		isIcon: true,
		bookings: activeBookings,
		search: searchActive,
		setSearch: setSearchActive,
		setBookings: setActiveBookings,
		sendRequest,
	};

	return (
		<Wrapper error={error}>
			<div className={styles.activeContent}>
				<h1>Admin panel</h1>
				<Bookings {...bookingsProps} />
			</div>
		</Wrapper>
	);
};
