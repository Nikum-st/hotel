import { useSelector } from 'react-redux';
import { selectLoading, selectRole } from '../../../store';
import { Loader } from '../Loader/Loader';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { Info } from '../Info/Info';

export const Wrapper = ({ children, error, adminPage = false, room }) => {
	const role = useSelector(selectRole);
	const isLoading = useSelector(selectLoading);

	const accessError = adminPage
		? role === 'admin'
			? null
			: 'Access denied!'
		: role
			? null
			: 'Sign in!';

	return isLoading ? (
		<Loader />
	) : !room ? (
		<Info>The selected room does not exist</Info>
	) : accessError ? (
		<Info style={{ fontSize: '25px', margin: 'auto' }}>{accessError}</Info>
	) : error ? (
		<ErrorMessage>{error}</ErrorMessage>
	) : (
		children
	);
};
