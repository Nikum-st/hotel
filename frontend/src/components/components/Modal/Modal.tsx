import styles from './Modal.module.css';
import { Button } from '../Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { closeModal } from '../../../store';

export const Modal = () => {
	const { text, isOpen, onConfirmModal } = useSelector(
		(state: RootState) => state.app.modal,
	);
	const dispatch = useDispatch();

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
					<Button onClick={() => dispatch(closeModal())} width="120px">
						Cancel
					</Button>
				</div>
			</div>
		</div>
	);
};
