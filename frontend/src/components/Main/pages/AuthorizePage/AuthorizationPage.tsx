import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupSchemaLogin } from '../../../../yup/yupSchemaLogin';
import { logUser } from '../../../../store';
import { useDispatch, useSelector } from 'react-redux';
import { AuthLayout } from './AuthLayout';
import { useRequest } from '../../../../hooks/useRequest';
import { RootState } from '../../../../store/store';
import { SubmitUserDatesType } from './types/AuthProps';

export const AuthorizationPage = () => {
	const dispatch = useDispatch();
	const isLoading = useSelector((state: RootState) => state.app.loading);
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

	const submitUserDates: SubmitUserDatesType = async ({ login, password }) => {
		login = login.trim();
		const user = await sendRequest('/authorize', 'POST', { login, password });
		if (user) {
			dispatch(logUser(user));
			sessionStorage.setItem('userData', JSON.stringify(user));
			navigate(-1);
		}
	};

	const errorMessage = errors.login?.message || errors.password?.message || error;

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
