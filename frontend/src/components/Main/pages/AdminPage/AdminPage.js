import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoading, selectRole } from '../../../../store';
import { Icon, Loader } from '../../../components';
import { useNavigate } from 'react-router-dom';
import styles from './AdminPage.module.css';
import { Bookings } from './components/Bookings';

export const AdminPage = () => {
	const [searchArchive, setSearchArchive] = useState('');
	const [searchActive, setSearchActive] = useState('');
	const [archiveList, setArchiveList] = useState(false);
	const [bookings, setBookings] = useState(false);

	const role = useSelector(selectRole);
	const isLoading = useSelector(selectLoading);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		window.scrollTo(0, 0);
		if (!role || role === 'user') {
			navigate('*');
		}
		// if (!bookings.length) {

		// }
	}, [role, dispatch, navigate]);

	const handleArchiveList = () => {
		setArchiveList(!archiveList);
	};

	return isLoading ? (
		<Loader />
	) : (
		<div className={styles.adminContent}>
			<h1>Admin panel</h1>
			<Bookings
				bookings={bookings}
				Icon={Icon}
				search={searchArchive}
				setSearch={setSearchArchive}
			/>
			<div className={styles.archiveList} onClick={handleArchiveList}>
				Archive bookings
			</div>
			{archiveList && (
				<Bookings
					bookings={bookings}
					styleHeader={{ background: '#3d3d3d', color: '#fff' }}
					styleBody={{ background: '#969696' }}
					search={searchArchive}
					setSearch={setSearchArchive}
					type="archive"
				/>
			)}
		</div>
	);
};
