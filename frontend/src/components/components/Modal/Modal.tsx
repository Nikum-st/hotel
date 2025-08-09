import styles from './Modal.module.css';
import { Button } from '../Button/Button';

type ModalProps = {
	text: string;
	isOpen: boolean;
	onConfirm: (() => void) | null;
	onCancel: (() => void) | null;
};

export const Modal = ({ text, onConfirm, onCancel, isOpen }: ModalProps) => {
	if (!isOpen) {
		return null;
	}

	return (
		<div className={styles.modalContainer}>
			<div className={styles.overlay}></div>
			<div className={styles.box}>
				<h3>{text}</h3>
				<div className={styles.buttons}>
					<Button onClick={onConfirm || (() => {})} width="120px">
						Yes
					</Button>
					<Button onClick={onCancel || (() => {})} width="120px">
						Cancel
					</Button>
				</div>
			</div>
		</div>
	);
};
