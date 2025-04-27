import { Button, ErrorMessage, Input } from '../../../components';
import styles from './Register.module.css';

export const RegLayout = ({
	handleSubmit,
	submitNewUser,
	register,
	setErrorServer,
	errorMessage,
}) => (
	<div className={styles.registration}>
		<h2>Registration</h2>
		<form onSubmit={handleSubmit(submitNewUser)} className={styles.form}>
			<Input
				type="login"
				placeholder="Login..."
				{...register(`login`, {
					onChange: () => {
						setErrorServer(null);
					},
				})}
			/>
			<Input
				type="email"
				placeholder="Email..."
				{...register(`email`, {
					onChange: () => {
						setErrorServer(null);
					},
				})}
			/>
			<Input
				type="password"
				placeholder="Password..."
				{...register(`password`, {
					onChange: () => {
						setErrorServer(null);
					},
				})}
			/>
			<Input
				type="passcheck"
				placeholder="Repeat password
..."
				{...register(`passcheck`, {
					onChange: () => {
						setErrorServer(null);
					},
				})}
			/>
			<Button
				style={errorMessage && { cursor: 'auto' }}
				disabled={errorMessage}
				type="submit"
				width="100%"
			>
				Sign Up
			</Button>
		</form>
		{errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
	</div>
);
