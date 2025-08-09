import { archiveType } from '../../../../../../../types/archiveType';
import { bookingType } from '../../../../../../../types/bookingsType';
import { IconProps } from '../../../../../../components/types';

type BodyStyle = {
	background: string;
};

export type TBodyProps = {
	isIcon?: boolean;
	bookings: bookingType[] | archiveType[];
	archiveStyle: BodyStyle;
	deleteBooking: (id: string) => void;
};

export type THeadProps = { isIcon?: boolean; archiveStyle: BodyStyle };
