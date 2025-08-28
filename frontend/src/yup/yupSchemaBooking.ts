import * as yup from 'yup';

export const yupSchemaBooking = yup.object().shape({
	firstName: yup
		.string()
		.required(`Field "first name" is required`)
		.max(40, `The name must be a maximum of 40 characters`),
	lastName: yup
		.string()
		.required(`Field "last name" is required`)
		.max(40, `The name must be a maximum of 40 characters`),
	phone: yup
		.string()
		.required('A phone number is required')
		.matches(/^[0-9]+$/, 'Phone number must only contain digits')
		.min(6, 'Phone number must be at least 6 digits'),

	startDate: yup.date().required('Start date is required').nullable(),
	endDate: yup.date().required('End date is required').nullable(),
});
