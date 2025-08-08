import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupSchemaLogin } from '../../../../yup/yupSchemaLogin';
import { logUser } from '../../../../store';
import { useDispatch, useSelector } from 'react-redux';
import { RegLayout } from './RegLayout';
import { Loader } from '../../../components';
import { useRequest } from '../../../../hooks/useRequest';
import { RootState } from '../../../../store/store';
import { SubmitNewUserFC } from './types/Register';

export const RegistrationPage = () => {
	const { sendRequest, error, setError } = useRequest();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const isLoading = useSelector((state: RootState) => state.app.loading);

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

	const submitNewUser: SubmitNewUserFC = async ({ login, password, email }) => {
		const user = await sendRequest('/register', 'POST', {
			login,
			password,
			email,
		});
		if (user) {
			dispatch(logUser(user));
			sessionStorage.setItem('userData', JSON.stringify(user));
			navigate('/');
		}
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
			handleSubmit={handleSubmit}
			submitNewUser={submitNewUser}
			register={register}
			{...(setError && { setErrorServer: setError })}
			errorMessage={errorMessage}
		/>
	);
};
