import { Button, ErrorMessage, Input } from '../../../components';
import { PasswordInput } from '../../../components/PasswordInput/PasswordInput';
import styles from './Register.module.css';
import { Register } from './types/Register';
import { TFormData } from './types/Register';

export const RegLayout = ({
	handleSubmit,
	submitNewUser,
	register,
	setErrorServer,
	errorMessage,
}: Register) => (
	<div className={styles.registration}>
		<h2>Registration</h2>
		<form onSubmit={handleSubmit(submitNewUser)} className={styles.form}>
			<Input
				type="login"
				placeholder="Login..."
				{...register(`login`, {
					onChange: () => {
						setErrorServer?.(null);
					},
				})}
			/>
			<Input
				type="email"
				placeholder="Email..."
				{...register(`email`, {
					onChange: () => {
						setErrorServer?.(null);
					},
				})}
			/>
			<PasswordInput
				register={register}
				{...(setErrorServer && { setErrorServer })}
			/>
			<Input
				type="passcheck"
				placeholder="Repeat password..."
				{...register(`passcheck`, {
					onChange: () => {
						setErrorServer?.(null);
					},
				})}
			/>
			<Button
				style={errorMessage ? { cursor: 'auto' } : undefined}
				disabled={!!errorMessage}
				type="submit"
				width="100%"
			>
				Sign Up
			</Button>
		</form>
		{errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
	</div>
);
