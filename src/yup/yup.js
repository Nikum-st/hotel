import * as yup from 'yup';

export const yupSchema = {
	authorization: yup.object().shape({
		login: yup
			.string()
			.required('Заполните логин')
			.min(3, 'Должно быть не меньше 3 символов'),
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
		email: yup.string().required('Введите свой Email').email('Некорректный email'),
		password: yup
			.string()
			.required('Заполните пароль')
			.min(3, 'Пароль должен быть не меньше 3 символов')
			.matches(
				/^\w*$/,
				'Неверный логин. Допустимые символы: буквы, цифры и нижнее подчёркивание',
			),
		passcheck: yup
			.string()
			.required('Заполните поле')
			.oneOf([yup.ref('password')], 'Пароль должен совпадать'),
	}),
};
