import { useSelector } from 'react-redux';
import { selectLoading, selectRole } from '../../../store';
import { Loader } from '../Loader/Loader';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { Info } from '../Info/Info';
import { ROLE } from '../../../constants';

export const Wrapper = ({ children, error, adminAccess = false }) => {
	const role = useSelector(selectRole);
	const isLoading = useSelector(selectLoading);

	const accessError = adminAccess
		? role === ROLE.ADMIN
			? null
			: 'Access denied!'
		: null;

	return isLoading ? (
		<Loader />
	) : accessError ? (
		<Info style={{ fontSize: '25px', margin: 'auto' }}>{accessError}</Info>
	) : error ? (
		<ErrorMessage style={{ margin: 'auto', fontSize: '25px', padding: '30px' }}>
			{error}
		</ErrorMessage>
	) : (
		children
	);
};
