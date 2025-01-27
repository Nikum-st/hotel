import styles from './Register.module.css';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Button, ErrorMessage, Input } from '../../../components/';
import { Link, useNavigate } from 'react-router-dom';
import { yupSchema } from '../../../../yup/yup';
import { server } from '../../../../BFF/server';
import { setUser } from '../../../../store';
import { useDispatch } from 'react-redux';

export const Registration = () => {
	// const [errorServer, setErrorServer] = useState(null);

	// const dispatch = useDispatch();
	// const navigate = useNavigate();

	// const {
	// 	register,
	// 	reset,
	// 	handleSubmit,
	// 	formState: { errors },
	// } = useForm({
	// 	defaultValues: {
	// 		login: '',
	// 		password: '',
	// 	},
	// 	resolver: yupResolver(yupSchema.authorization),
	// });

	// useResetAuth(reset);

	// const onSubmit = ({ login, password }) => {
	// 	server.authorization(login, password).then(({ error, res }) => {
	// 		if (error) {
	// 			// setErrorServer(error);
	// 			return;
	// 		}
	// 		// dispatch(setUser(res));
	// 		// navigate('/');
	// 	});
	// };
	// const errorMessage = errors.login?.message || errors.password?.message || errorServer;

	return (
		<div className={styles.registration}>
			<h2>Регистрация</h2>
			<form className={styles.form}>
				<Input
					type="text"
					placeholder="Логин..."
					// {...register(`login`, {
					// 	onChange: () => {
					// 		setErrorServer(null);
					// 	},
					// })}
				/>
				<Input
					type="text"
					placeholder="Email..."
					// {...register(`password`, {
					// 	onChange: () => {
					// 		setErrorServer(null);
					// 	},
					// })}
				/>
				<Input
					type="text"
					placeholder="Пароль..."
					// {...register(`password`, {
					// 	onChange: () => {
					// 		setErrorServer(null);
					// 	},
					// })}
				/>
				<Input
					type="text"
					placeholder="Повторите пароль..."
					// {...register(`password`, {
					// 	onChange: () => {
					// 		setErrorServer(null);
					// 	},
					// })}
				/>
				<Button type="submit" width="100%">
					Зарегестрироваться
				</Button>
			</form>
			{/* {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>} */}
		</div>
	);
};
