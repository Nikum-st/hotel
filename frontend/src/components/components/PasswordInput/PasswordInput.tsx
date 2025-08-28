import { useState } from 'react';
import { Icon } from '../Icon/Icon';
import { Input } from '../Input/Input';
import styles from './PasswordInput.module.css';
import { PasswordInputProps } from '../types/PasswordInputProps';

export const PasswordInput = ({ register, setErrorServer }: PasswordInputProps) => {
	const [showPassword, setShowPassword] = useState(false);

	const handleShowPassword = () => {
		setShowPassword(!showPassword);
	};

	return (
		<div className={styles.passwordContainer}>
			<Input
				type={!showPassword ? 'password' : 'text'}
				placeholder="Password..."
				{...register(`password`, {
					onChange: () => {
						setErrorServer?.(null);
					},
				})}
			/>
			<Icon
				id={!showPassword ? 'fa-eye' : 'fa-eye-slash'}
				size="20px"
				color="black"
				onClick={handleShowPassword}
			/>
		</div>
	);
};
