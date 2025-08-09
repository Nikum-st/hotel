import { useSelector } from 'react-redux';
import { Loader } from '../Loader/Loader';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { Info } from '../Info/Info';
import { ROLE } from '../../../constants';
import { WrapperProps } from '../types';
import { RootState } from '../../../store/store';
import { JSX } from 'react';

export const Wrapper = ({
	children,
	error,
	adminAccess = false,
}: WrapperProps): JSX.Element | null => {
	const role = useSelector((state: RootState) => state.user?.role);
	const isLoading = useSelector((state: RootState) => state.app.loading);

	const accessError =
		adminAccess && role !== ROLE.ADMIN ? (
			<Info style={{ fontSize: '25px', margin: 'auto' }}>Access denied!</Info>
		) : null;

	return isLoading ? (
		<Loader />
	) : accessError ? (
		accessError
	) : error ? (
		<ErrorMessage style={{ margin: 'auto', fontSize: '25px', padding: '30px' }}>
			{error}
		</ErrorMessage>
	) : (
		<>{children}</>
	);
};
