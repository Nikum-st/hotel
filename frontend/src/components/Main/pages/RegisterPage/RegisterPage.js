import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { yupSchemaLogin } from '../../../../yup/yupSchemaLogin';
import { loading, logUser, selectLoading } from '../../../../store';
import { useDispatch, useSelector } from 'react-redux';
import { RegLayout } from './RegLayout';
import { request } from '../../../../utils/request';
import { Loader } from '../../../components';

export const RegistrationPage = () => {
	const [errorServer, setErrorServer] = useState(null);

	const dispatch = useDispatch();
	const navigate = useNavigate();
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

	const submitNewUser = async ({ login, password, email }) => {
		dispatch(loading(true));
		try {
			const { error, data } = await request('/register', 'POST', {
				login,
				password,
				email,
			});

			if (error) {
				setErrorServer(error);
				return;
			}
			dispatch(logUser(data));
			sessionStorage.setItem('userData', JSON.stringify(data));
			navigate('/');
		} catch {
			setErrorServer('Registration failed. Please try again later.');
		} finally {
			dispatch(loading(false));
		}
	};

	const errorMessage =
		errors.login?.message ||
		errors.email?.message ||
		errors.password?.message ||
		errors.passcheck?.message ||
		errorServer;

	return isLoading ? (
		<Loader />
	) : (
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
