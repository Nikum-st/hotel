import { useEffect, useRef, useState } from 'react';
import { Button, Wrapper } from '../../../../../components';
import { Bookings } from '../Bookings/Bookings';
import styles from './ArchiveList.module.css';
import { closeModal, openModal } from '../../../../../../store';
import { useDispatch } from 'react-redux';
import { UseRequestReturn } from '../../../../../../hooks/types/UseRequesrTypes';
import { archiveType } from '../../../../../../types/archiveType';

export const ArchiveList = ({ sendRequest, error }: UseRequestReturn) => {
	const [archive, setArchive] = useState<archiveType[]>([]);
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
						const data = await sendRequest(`/admin/archive`, 'DELETE');
						if (data) {
							setArchive([]);
						}
					} catch (e) {
						if (e instanceof Error) {
							console.error(e.message);
						}
					} finally {
						dispatch(closeModal());
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
		archiveType: true,
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
