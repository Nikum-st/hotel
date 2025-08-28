import { forwardRef } from 'react';
import { useMatch } from 'react-router-dom';
import styles from './Description.module.css';
import { roomType } from '../../../../../../../../../../types/roomType';

export const Description = forwardRef<HTMLDivElement, { room: roomType }>(
	({ room }, ref) => {
		const isEditing = useMatch('/rooms/:name/edit');

		return isEditing ? (
			<div
				ref={ref}
				suppressContentEditableWarning={true}
				contentEditable={true}
				className={styles.descriptionEdit}
			>
				{room.description}
			</div>
		) : (
			<div className={styles.description}>{room.description}</div>
		);
	},
);
