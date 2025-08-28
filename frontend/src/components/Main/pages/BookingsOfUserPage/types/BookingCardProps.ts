import { bookingsUser } from '../../../../../types/bookingsUser';

export type BookingCardProps = {
	booking: bookingsUser;
	deleteBooking: DeleteBookingFC;
};

export type DeleteBookingFC = (
	id: string,
	roomName: string,
	checkIn: string,
) => Promise<void>;
