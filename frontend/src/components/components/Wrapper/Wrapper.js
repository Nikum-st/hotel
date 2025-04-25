import { useSelector } from 'react-redux';
import { selectLoading, selectRole } from '../../../store';
import { Loader } from '../Loader/Loader';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';

export const Wrapper = ({ children, error, adminPage = false }) => {
	const role = useSelector(selectRole);
	const isLoading = useSelector(selectLoading);
	const accessError = adminPage
		? role === 'admin'
			? null
			: 'Access denied'
		: role
			? null
			: 'Access denied';

	return isLoading ? (
		<Loader />
	) : accessError ? (
		<ErrorMessage>{accessError}</ErrorMessage>
	) : error ? (
		<ErrorMessage>{error}</ErrorMessage>
	) : (
		children
	);
};
