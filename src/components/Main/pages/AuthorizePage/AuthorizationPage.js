import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { yupSchemaLogin } from '../../../../yup/yupSchemaLogin';
import { fetchBookingsAsync, loading, logUser, selectLoading } from '../../../../store';
import { useDispatch, useSelector } from 'react-redux';
import { useRequestServer } from '../../../../hooks';
import { AuthLayout } from './AuthLayout';

export const AuthorizationPage = () => {
	const [errorServer, setErrorServer] = useState(null);

	const dispatch = useDispatch();
	const isLoading = useSelector(selectLoading);
	const navigate = useNavigate();
	const requestAuthoraize = useRequestServer();

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

	const submitUserDates = ({ login, password }) => {
		dispatch(loading(true));
		requestAuthoraize('authorization', login, password)
			.then(({ error, res }) => {
				if (error) {
					setErrorServer(error);
					return;
				}
				dispatch(logUser(res));
				sessionStorage.setItem('userData', JSON.stringify(res));
				dispatch(fetchBookingsAsync(requestAuthoraize, res.role));
				navigate('/');
			})
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
