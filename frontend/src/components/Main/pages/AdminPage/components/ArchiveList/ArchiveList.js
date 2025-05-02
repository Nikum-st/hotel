import { useRef, useState } from 'react';
import { Button, Loader } from '../../../../../components';
import { Bookings } from '../Bookings/Bookings';
import styles from './ArchiveList.module.css';
import { handleOpenList } from '../services/hundleOpenList';

export const ArchiveList = () => {
	const [archiveListIsOpen, setArchiveListIsOpen] = useState(false);
	const [loadingArchive, setLoadingArchive] = useState(false);
	const [archive, setArchive] = useState([]);
	const [searchArchive, setSearchArchive] = useState('');
	const archiveRef = useRef(null);
	console.log(archive);

	const clearArchive = async () => {
		if (!archive) {
			return;
		}
		try {
			const response = await fetch(`/admin/archive`, { method: 'DELETE' });
			const result = await response.json();

			if (result.error) {
				console.error(result.error);
			}
			setArchive([]);
		} catch ({ message }) {
			console.error(message);
		}
	};

	const archiveProps = {
		bookings: archive,
		search: searchArchive,
		setSearch: setSearchArchive,
		clearArchive: clearArchive,
		ref: archiveRef,
		styleHeader: { background: '#3d3d3d', color: '#fff' },
		styleBody: { background: '#969696' },
		type: 'archive',
	};

	return (
		<div className={styles.archiveList}>
			<Button
				style={{ margin: '40px' }}
				onClick={() =>
					handleOpenList(
						archiveListIsOpen,
						setArchiveListIsOpen,
						setLoadingArchive,
						setArchive,
						archiveRef,
						'/admin/archive',
					)
				}
			>
				Archive bookings {archiveListIsOpen ? `close` : `open`}
			</Button>
			{archiveListIsOpen &&
				(loadingArchive ? (
					<Loader />
				) : (
					<>
						<Button
							onClick={clearArchive}
							style={{ background: 'rgb(175, 3, 3)' }}
						>
							Clear archive
						</Button>
						<Bookings {...archiveProps} />
					</>
				))}
		</div>
	);
};
