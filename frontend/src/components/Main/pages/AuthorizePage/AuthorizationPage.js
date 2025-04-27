import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupSchemaLogin } from '../../../../yup/yupSchemaLogin';
import { logUser, selectLoading } from '../../../../store';
import { useDispatch, useSelector } from 'react-redux';
import { AuthLayout } from './AuthLayout';
import { useRequest } from '../../../../hooks/useRequest';

export const AuthorizationPage = () => {
	const dispatch = useDispatch();
	const isLoading = useSelector(selectLoading);
	const navigate = useNavigate();
	const { sendRequest, error } = useRequest();

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
		login = login.trim();
		const user = await sendRequest('/authorize', 'POST', { login, password });
		dispatch(logUser(user));
		sessionStorage.setItem('userData', JSON.stringify(user));
		navigate(-1);
	};

	const errorMessage = errors.login?.message || errors.password?.message || error;

	return (
		<AuthLayout
			isLoading={isLoading}
			register={register}
			handleSubmit={handleSubmit}
			errorMessage={errorMessage}
			onSubmit={submitUserDates}
			setErrorServer={error}
		/>
	);
};
