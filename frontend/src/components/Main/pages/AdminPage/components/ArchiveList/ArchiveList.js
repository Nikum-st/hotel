import { useEffect, useRef, useState } from 'react';
import { Button, Wrapper } from '../../../../../components';
import { Bookings } from '../Bookings/Bookings';
import styles from './ArchiveList.module.css';
import { CLOSE_MODAL, openModal } from '../../../../../../store';
import { useDispatch } from 'react-redux';

export const ArchiveList = ({ sendRequest, error }) => {
	const [archive, setArchive] = useState([]);
	const [searchArchive, setSearchArchive] = useState('');
	const archiveRef = useRef(null);
	const dispatch = useDispatch();

	useEffect(() => {
		window.scrollTo(0, 0);

		const fetchArchive = async () => {
			const archive = await sendRequest('/admin/archive');

			setArchive(archive);
		};

		fetchArchive();
	}, [sendRequest]);

	const clearArchive = async () => {
		if (archive.length === 0) {
			return;
		}
		dispatch(
			openModal({
				text: 'clear the archive? It will be impossible to restore it.',
				onConfirmModal: async () => {
					try {
						const response = await fetch(`/admin/archive`, {
							method: 'DELETE',
						});
						const result = await response.json();

						if (result.error) {
							console.error(result.error);
						}
						setArchive([]);
					} catch ({ message }) {
						console.error(message);
					} finally {
						dispatch(CLOSE_MODAL);
					}
				},
			}),
		);
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
		<Wrapper error={error}>
			<div className={styles.archiveList}>
				<>
					<Button
						onClick={clearArchive}
						style={{ background: 'rgb(175, 3, 3)' }}
					>
						Clear archive
					</Button>
					<Bookings {...archiveProps} />
				</>
			</div>
		</Wrapper>
	);
};
