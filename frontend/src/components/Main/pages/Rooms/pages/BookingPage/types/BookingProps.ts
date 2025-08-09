import {
	FieldErrors,
	UseFormHandleSubmit,
	UseFormRegister,
	UseFormSetValue,
} from 'react-hook-form';
import { BookingFormData } from './BookingsFormData';
import { bookingsUser } from '../../../../../../../types/bookingsUser';

export type BookingProps = {
	errorFromServer: string | null;
	handleSubmit: UseFormHandleSubmit<BookingFormData, undefined>;
	handleBookingSubmit: (bookingData: BookingFormData) => Promise<void>;
	errors: FieldErrors<BookingFormData>;
	register: UseFormRegister<BookingFormData>;
	startDate: Date | null;
	setValue: UseFormSetValue<BookingFormData>;
	endDate: Date | null;
	isDateDisabled: (date: Date) => boolean | undefined;
	errorsGeneral: string | null;
	name: string | undefined;
	booking: bookingsUser | null;
};
