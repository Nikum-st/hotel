import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { yupSchemaLogin } from '../../../../yup/yupSchemaLogin';
import { loading, logUser, selectLoading } from '../../../../store';
import { useDispatch, useSelector } from 'react-redux';
import { useRequestServer } from '../../../../hooks';
import { RegLayout } from './RegLayout';

export const RegistrationPage = () => {
	const [errorServer, setErrorServer] = useState(null);

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const requestRegister = useRequestServer();
	const isLoading = useSelector(selectLoading);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			login: '',
			email: '',
			password: '',
		},
		resolver: yupResolver(yupSchemaLogin.registration),
	});

	const submitNewUser = ({ login, password, email }) => {
		dispatch(loading(true));
		requestRegister('registration', login, password, email)
			.then(({ error, res }) => {
				if (error) {
					setErrorServer(error);
					return;
				}
				dispatch(logUser(res));
				sessionStorage.setItem('userData', JSON.stringify(res));
				navigate('/');
			})
			.finally(dispatch(loading(false)));
	};
	const errorMessage =
		errors.login?.message ||
		errors.email?.message ||
		errors.password?.message ||
		errors.passcheck?.message ||
		errorServer;

	return (
		<RegLayout
			isLoading={isLoading}
			handleSubmit={handleSubmit}
			submitNewUser={submitNewUser}
			register={register}
			setErrorServer={setErrorServer}
			errorMessage={errorMessage}
		/>
	);
};
