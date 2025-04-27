import { Link } from 'react-router-dom';
import { Button, ErrorMessage, Input, Loader } from '../../../components';
import styles from './Autgorization.module.css';

export const AuthLayout = ({
	isLoading,
	register,
	handleSubmit,
	errorMessage,
	onSubmit,
	setErrorServer,
}) =>
	isLoading === true ? (
		<Loader />
	) : (
		<div className={styles.autorization}>
			<h2>Authorization</h2>
			<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
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
					type="password"
					placeholder="Password..."
					{...register(`password`, {
						onChange: () => {
							setErrorServer(null);
						},
					})}
				/>
				<Button
					type="submit"
					width="100%"
					style={errorMessage && { cursor: 'auto' }}
					disabled={errorMessage}
				>
					Sign In
				</Button>
			</form>
			{errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
			<Link className={styles.linkStyled} to="/register">
				Sign Up
			</Link>
		</div>
	);
