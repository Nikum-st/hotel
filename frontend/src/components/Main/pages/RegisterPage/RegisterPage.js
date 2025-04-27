import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupSchemaLogin } from '../../../../yup/yupSchemaLogin';
import { logUser, selectLoading } from '../../../../store';
import { useDispatch, useSelector } from 'react-redux';
import { RegLayout } from './RegLayout';
import { Loader } from '../../../components';
import { useRequest } from '../../../../hooks/useRequest';

export const RegistrationPage = () => {
	const { sendRequest, error } = useRequest();
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
		const user = await sendRequest('/register', 'POST', {
			login,
			password,
			email,
		});

		dispatch(logUser(user));
		sessionStorage.setItem('userData', JSON.stringify(user));
		navigate('/');
	};

	const errorMessage =
		errors.login?.message ||
		errors.email?.message ||
		errors.password?.message ||
		errors.passcheck?.message ||
		error;

	return isLoading ? (
		<Loader />
	) : (
		<RegLayout
			isLoading={isLoading}
			handleSubmit={handleSubmit}
			submitNewUser={submitNewUser}
			register={register}
			setErrorServer={error}
			errorMessage={errorMessage}
		/>
	);
};
