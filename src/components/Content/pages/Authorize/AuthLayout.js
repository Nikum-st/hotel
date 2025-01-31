import { Link } from 'react-router-dom';
import { Button, ErrorMessage, Input, Loader } from '../../../components/';
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
			<h2>Авторизация</h2>
			<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
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
					type="password"
					placeholder="Пароль..."
					{...register(`password`, {
						onChange: () => {
							setErrorServer(null);
						},
					})}
				/>
				<Button type="submit" width="100%">
					Вход
				</Button>
			</form>
			{errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
			<Link className={styles.linkStyled} to="/register">
				Регистрация
			</Link>
		</div>
	);
