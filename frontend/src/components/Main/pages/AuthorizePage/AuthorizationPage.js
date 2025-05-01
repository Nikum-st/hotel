import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupSchemaLogin } from '../../../../yup/yupSchemaLogin';
import { logUser, selectLoading } from '../../../../store';
import { useDispatch, useSelector } from 'react-redux';
import { AuthLayout } from './AuthLayout';
import { useRequest } from '../../../../hooks/useRequest';
import { useIsAuthorized } from '../../../../hooks/useIsAuthorized';

export const AuthorizationPage = () => {
	const isAuthorizedError = useIsAuthorized();
	const dispatch = useDispatch();
	const isLoading = useSelector(selectLoading);
	const navigate = useNavigate();
	const { sendRequest, error, setError } = useRequest();

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
		if (user) {
			dispatch(logUser(user));
			sessionStorage.setItem('userData', JSON.stringify(user));
			navigate(-1);
		}
	};

	const errorMessage =
		errors.login?.message || errors.password?.message || error || isAuthorizedError;

	return (
		<AuthLayout
			isLoading={isLoading}
			register={register}
			handleSubmit={handleSubmit}
			errorMessage={errorMessage}
			onSubmit={submitUserDates}
			setErrorServer={setError}
		/>
	);
};
