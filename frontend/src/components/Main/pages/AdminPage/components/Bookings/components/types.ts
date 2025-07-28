import { archiveType } from '../../../../../../../types/archiveType';
import { bookingType } from '../../../../../../../types/bookingsType';
import { IconProps } from '../../../../../../components/types';

type BodyStyle = {
	background: string;
};

export type TBodyProps = {
	Icon: React.FC<IconProps>;
	bookings: bookingType[] | archiveType[];
	archiveStyle: BodyStyle;
	deleteBooking: (id: string) => Promise<void>;
};

export type THeadProps = { Icon: React.FC<IconProps>; archiveStyle: BodyStyle };
