import DatePicker from 'react-datepicker';
import {
	BookingInfo,
	Button,
	ErrorMessage,
	Icon,
	Input,
} from '../../../../../components';
import styles from './Booking.module.css';
import { Link } from 'react-router-dom';

export const BookingLayout = ({
	handleSubmit,
	handleBookingSubmit,
	errors,
	register,
	startDate,
	setValue,
	endDate,
	isDateDisabled,
	errorsGeneral,
	name,
	booking,
}) => (
	<div className={styles.content}>
		{booking ? (
			<div className={styles.bookInfo}>
				<Link to="/bookings">
					<Icon size={'100px'} id={'fa-check'} title="success" />
				</Link>
				<BookingInfo
					id={booking.id}
					startDate={booking.startDate}
					endDate={booking.endDate}
					price={booking.price}
					roomName={booking.roomName}
				/>
			</div>
		) : (
			<form
				onSubmit={handleSubmit(handleBookingSubmit)}
				className={styles.bookingForm}
			>
				{errorsGeneral && <ErrorMessage>{errorsGeneral}</ErrorMessage>}
				<label htmlFor="firstName">Enter your first name:</label>
				<Input
					type="text"
					name="firstName"
					placeholder="First name..."
					{...register('firstName')}
				/>
				{errors?.firstName && (
					<ErrorMessage>{errors.firstName.message}</ErrorMessage>
				)}
				<label htmlFor="lastName">Enter your last name:</label>
				<Input
					type="text"
					name="lastName"
					placeholder="Last name..."
					{...register('lastName')}
				/>
				{errors?.lastName && (
					<ErrorMessage>{errors.lastName.message}</ErrorMessage>
				)}
				<label htmlFor="phone">Enter your phone number:</label>
				<Input
					type="tel"
					name="phone"
					placeholder="Your phone..."
					{...register('phone')}
				/>
				{errors?.phone && <ErrorMessage>{errors.phone.message}</ErrorMessage>}
				<label htmlFor="startDay">Select check-in date:</label>
				<DatePicker
					name="startDay"
					className={styles.reactDatepicker}
					selected={startDate}
					onChange={(date) =>
						setValue('startDate', date, { shouldValidate: true })
					}
					minDate={new Date()}
					filterDate={(date) => !isDateDisabled(date)}
					selectsStart
					startDate={startDate}
					endDate={endDate}
					dateFormat="dd.MM.yyyy"
					placeholderText="Select your check-in date"
				/>

				{errors?.startDate && (
					<ErrorMessage>{errors.startDate.message}</ErrorMessage>
				)}
				<label htmlFor="endDay">Select check-out date:</label>
				<DatePicker
					className={styles.reactDatepicker}
					selected={endDate}
					onChange={(date) =>
						setValue('endDate', date, { shouldValidate: true })
					}
					minDate={startDate || new Date()}
					filterDate={(date) => !isDateDisabled(date)}
					selectsEnd
					startDate={startDate}
					endDate={endDate}
					dateFormat="dd.MM.yyyy"
					placeholderText="Select your check-out date"
				/>
				{errors?.endDate && <ErrorMessage>{errors.endDate.message}</ErrorMessage>}

				<div className={styles.bookingSection}>
					<Link to={`/rooms/${name}`}>
						<Button>Cancel</Button>
					</Link>
					<Button type="submit">Save</Button>
				</div>
			</form>
		)}
	</div>
);
