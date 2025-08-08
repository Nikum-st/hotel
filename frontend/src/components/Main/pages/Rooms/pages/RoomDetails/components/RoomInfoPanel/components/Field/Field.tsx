import { forwardRef } from 'react';
import { Input } from '../../../../../../../../../components';
import styles from './Field.module.css';
import { useMatch } from 'react-router-dom';
import { FieldProps } from '../../types/PorpsTypes';

export const Field = forwardRef<HTMLInputElement, FieldProps>(
	({ label, value, placeholder }, ref) => {
		const isEditing = useMatch('/rooms/:name/edit');
		return (
			<div className={styles.field}>
				{label && <label htmlFor={label}>{label}</label>}
				{isEditing ? (
					<Input
						maxLength={120}
						ref={ref}
						placeholder={placeholder}
						defaultValue={value}
					/>
				) : (
					<span className={label === 'Priсe:$' ? styles.price : undefined}>
						{value}
					</span>
				)}
			</div>
		);
	},
);
