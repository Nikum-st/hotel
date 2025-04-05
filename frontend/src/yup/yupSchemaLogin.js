import * as yup from 'yup';

export const yupSchemaLogin = {
	authorization: yup.object().shape({
		login: yup
			.string()
			.required('Fill in your login')
			.min(3, 'Login must be at least 3 characters'),
		password: yup
			.string()
			.required('Fill in your password')
			.min(3, 'Password must be at least 3 characters'),
	}),
	registration: yup.object().shape({
		login: yup
			.string()
			.required('Fill in your login')
			.matches(
				/^[A-Za-z\d_@$!%*?&]*$/,
				'Invalid login. Allowed characters: letters, numbers, underscores and special characters: @$!%*?&',
			)
			.min(3, 'Login must be at least 3 characters')
			.max(20, 'Login must be no more than 20 characters'),
		email: yup.string().required('Enter your Email').email('Incorrect email'),
		password: yup
			.string()
			.required('Fill in the password')
			.min(3, 'Password must be at least 3 characters')
			.matches(
				/^\w*$/,
				'Invalid login. Valid characters: letters, numbers and underscores',
			),
		passcheck: yup
			.string()
			.required('Fill in the field')
			.oneOf([yup.ref('password')], 'Password must match'),
	}),
};
