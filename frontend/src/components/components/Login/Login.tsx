import { LoginProps } from '../typesProps';

export const Login = ({ children, size, weight, margin }: LoginProps) => (
	<div
		style={{
			fontSize: size,
			fontWeight: weight,
			margin: margin,
			userSelect: 'none',
		}}
	>
		{children}
	</div>
);
