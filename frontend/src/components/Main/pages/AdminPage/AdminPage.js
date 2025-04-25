import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { loading } from '../../../../store';
import { ErrorMessage, Icon, Loader, Wrapper } from '../../../components';
import { useNavigate } from 'react-router-dom';
import styles from './AdminPage.module.css';
import { Bookings } from './components/Bookings/Bookings';
import { request } from '../../../../utils/request';

export const AdminPage = () => {
	const [errorFromServer, setErrorFromServer] = useState(null);
	const [error, setError] = useState(null);
	const [searchActive, setSearchActive] = useState('');
	const [searchArchive, setSearchArchive] = useState('');
	const [archiveListIsOpen, setArchiveListIsOpen] = useState(false);
	const [bookings, setBookings] = useState([]);
	const [archive, setArchive] = useState([]);
	const [loadingArchive, setLoadingArchive] = useState(false);

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const archiveRef = useRef(null);

	useEffect(() => {
		window.scrollTo(0, 0);

		dispatch(loading(true));

		const fetchBookings = async () => {
			try {
				const { error, data } = await request('/admin/bookings');
				if (error) {
					setError(error);
				} else {
					setBookings(data);
				}
			} catch (e) {
				setErrorFromServer(e);
			} finally {
				dispatch(loading(false));
			}
		};

		fetchBookings();
	}, [dispatch, navigate]);

	const handleArchiveList = async () => {
		const isOpening = !archiveListIsOpen;
		setArchiveListIsOpen(isOpening);

		if (!isOpening) return;

		try {
			setLoadingArchive(true);
			const { error, data } = await request('/admin/archive');

			if (error) {
				setError(error);
			} else {
				setArchive(data);
			}
		} catch (e) {
			setError(e.message);
		} finally {
			setLoadingArchive(false);
			setTimeout(() => {
				archiveRef.current?.scrollIntoView({ behavior: 'smooth' });
			}, 100);
		}
	};

	return (
		<Wrapper error={errorFromServer} adminPage={true}>
			<div className={styles.adminContent}>
				<h1>Admin panel</h1>
				<Bookings
					bookings={bookings}
					Icon={Icon}
					search={searchActive}
					setSearch={setSearchActive}
					setBookings={setBookings}
				/>
				{error && <ErrorMessage>{error}</ErrorMessage>}
				<div className={styles.archiveList} onClick={handleArchiveList}>
					Archive bookings
				</div>
				{archiveListIsOpen &&
					(loadingArchive ? (
						<Loader />
					) : (
						<Bookings
							ref={archiveRef}
							bookings={archive}
							styleHeader={{ background: '#3d3d3d', color: '#fff' }}
							styleBody={{ background: '#969696' }}
							search={searchArchive}
							setSearch={setSearchArchive}
							type="archive"
						/>
					))}
			</div>
		</Wrapper>
	);
};
