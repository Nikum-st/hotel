import { useSelector } from 'react-redux';
import { Loader } from '../Loader/Loader';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { Info } from '../Info/Info';
import { ROLE } from '../../../constants';
import { WrapperProps } from '../types';
import { RootState } from '../../../store/store';

export const Wrapper = ({ children, error, adminAccess = false }: WrapperProps) => {
	const role = useSelector((state: RootState) => state.user?.role);
	const isLoading = useSelector((state: RootState) => state.app.loading);

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
