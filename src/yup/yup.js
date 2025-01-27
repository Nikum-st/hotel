import * as yup from 'yup';

export const yupSchema = {
	authorization: yup.object().shape({
		login: yup
			.string()
			.required('Заполните логин')
			.min(3, 'Неверный логин. Должно быть не меньше 3 символов')
			.max(20, 'Неверный логин. Должно быть не больше 20 символов'),
		password: yup
			.string()
			.required('Заполните пароль')
			.min(3, 'Пароль должен быть не меньше 3 символов'),
	}),
	registration: yup.object().shape({
		login: yup
			.string()
			.required('Заполните логин')
			.matches(
				/^[A-Za-z\d_@$!%*?&]*$/,
				'Неверный логин. Допустимые символы: буквы, цифры, подчеркивание и спецсимволы: @$!%*?&',
			)
			.min(3, 'Логин должен быть не меньше 3 символов')
			.max(20, 'Логин должен быть не больше 20 символов'),
		password: yup
			.string()
			.required('Заполните пароль')
			.min(3, 'Пароль должен быть не меньше 3 символов'),
		passcheck: yup
			.string()
			.required('Заполните поле')
			.oneOf([yup.ref('password')], 'Пароль должен совпадать'),
	}),
};
