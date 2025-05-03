import styles from './Modal.module.css';
import { Button } from '../Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import {
	selectIsOpenModal,
	selectOnConfirmModal,
	selectTextModal,
	CLOSE_MODAL,
} from '../../../store';

export const Modal = () => {
	const text = useSelector(selectTextModal);
	const dispatch = useDispatch();
	const onConfirmModal = useSelector(selectOnConfirmModal);
	const isOpen = useSelector(selectIsOpenModal);

	if (!isOpen) {
		return;
	}

	return (
		<div className={styles.modalContainer}>
			<div className={styles.overlay}></div>
			<div className={styles.box}>
				<h3>{text}</h3>
				<div className={styles.buttons}>
					<Button onClick={onConfirmModal} width="120px">
						Yes
					</Button>
					<Button onClick={() => dispatch(CLOSE_MODAL)} width="120px">
						Cancel
					</Button>
				</div>
			</div>
		</div>
	);
};
