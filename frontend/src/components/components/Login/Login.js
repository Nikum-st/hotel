export const Login = ({ children, size, weight, margin }) => (
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
