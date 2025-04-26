import { Button, Loader, Wrapper } from '../../../components';
import styles from './AdminPage.module.css';
import { Bookings } from './components/Bookings/Bookings';

export const AdminPageLayout = ({
	errorFromServer,
	bookingsProps,
	archiveProps,
	handleArchiveList,
	archiveListIsOpen,
	loadingArchive,
}) => (
	<Wrapper error={errorFromServer} adminPage={true}>
		<div className={styles.adminContent}>
			<h1>Admin panel</h1>

			<Bookings {...bookingsProps} />

			<div className={styles.archiveList} onClick={handleArchiveList}>
				Archive bookings
			</div>

			{archiveListIsOpen &&
				(loadingArchive ? (
					<Loader />
				) : (
					<>
						<Button
							onClick={archiveProps.clearArchive}
							style={{ background: 'rgb(175, 3, 3)' }}
						>
							Clear archive
						</Button>
						<Bookings {...archiveProps} />
					</>
				))}
		</div>
	</Wrapper>
);
