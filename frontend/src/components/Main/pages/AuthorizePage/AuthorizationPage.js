import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { yupSchemaLogin } from '../../../../yup/yupSchemaLogin';
import { loading, logUser, selectLoading } from '../../../../store';
import { useDispatch, useSelector } from 'react-redux';
import { AuthLayout } from './AuthLayout';
import { request } from '../../../../utils/request';

export const AuthorizationPage = () => {
	const [errorServer, setErrorServer] = useState(null);

	const dispatch = useDispatch();
	const isLoading = useSelector(selectLoading);
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			login: '',
			password: '',
		},
		resolver: yupResolver(yupSchemaLogin.authorization),
	});

	const submitUserDates = async ({ login, password }) => {
		dispatch(loading(true));
		login = login.trim();
		await request('/authorize', 'POST', { login, password })
			.then(({ error, data }) => {
				if (error) {
					setErrorServer(error);
					return;
				}
				dispatch(logUser(data));
				sessionStorage.setItem('userData', JSON.stringify(data));
				navigate('/');
			})
			.catch((e) => setErrorServer(e.message))
			.finally(() => {
				dispatch(loading(false));
			});
	};

	const errorMessage = errors.login?.message || errors.password?.message || errorServer;

	return (
		<AuthLayout
			isLoading={isLoading}
			register={register}
			handleSubmit={handleSubmit}
			errorMessage={errorMessage}
			onSubmit={submitUserDates}
			setErrorServer={setErrorServer}
		/>
	);
};
