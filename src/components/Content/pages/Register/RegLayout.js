import { Button, ErrorMessage, Input, Loader } from '../../../components/';
import styles from './Register.module.css';

export const RegLayout = ({
	handleSubmit,
	submitNewUser,
	register,
	setErrorServer,
	errorMessage,
	isLoading,
}) =>
	isLoading ? (
		<Loader />
	) : (
		<div className={styles.registration}>
			<h2>Регистрация</h2>
			<form onSubmit={handleSubmit(submitNewUser)} className={styles.form}>
				<Input
					type="login"
					placeholder="Логин..."
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
					placeholder="Пароль..."
					{...register(`password`, {
						onChange: () => {
							setErrorServer(null);
						},
					})}
				/>
				<Input
					type="passcheck"
					placeholder="Повторите пароль..."
					{...register(`passcheck`, {
						onChange: () => {
							setErrorServer(null);
						},
					})}
				/>
				<Button type="submit" width="100%">
					Зарегестрироваться
				</Button>
			</form>
			{errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
		</div>
	);
